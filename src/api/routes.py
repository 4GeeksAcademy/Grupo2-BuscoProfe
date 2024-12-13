from flask import Flask, request, jsonify, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.models import db, User, Student, Teacher, Subject, teacher_subject, Review
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import timedelta

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/register', methods=['POST'])
def register_user():
    """
    Endpoint to register a new user. Receives user data from the frontend, validates it, 
    and stores it in the database, including the user details and role-specific data (Student or Professor).
    """

    try:
        # Obtenemos información del request
        data = request.get_json()

        # Comprobamos que los campos obligatorios están completos.
        required_fields = ['fullName', 'email', 'password', 'role']
        for field in required_fields:
            if field not in data:
                return jsonify({"message": f"Missing field: {field}"}), 400

        # Creamos el nuevo usuario
        new_user = User(
            fullName=data['fullName'],  # Asignamos fullName al nuevo usuario
            email=data['email'],
            password_hash='',  # This will be set after hashing the password
            is_active=True  
        )

        # Encriptamos la contraseña
        new_user.set_password(data['password'])

        # Chequeamos el rol y creamos el registro si es estudiante o profesor
        if data['role'] == 'student':
            if 'level' not in data or 'subjects' not in data:
                return jsonify({"message": "Missing fields for student (level, subjects)"}), 400

            subjects = []
            for subject in data['subjects']:
                subject = Subject.query.filter_by(id=subject).first()
                subjects.append(subject)

            if new_user is None:
                return jsonify({"message": "Invalid subject ID"}), 400
            
            if len(subjects) == 0:
                return jsonify({"message": "At least one subject is required"}), 400

            # Create Student record
            new_student = Student(
                user=new_user,
                level=data['level'],
                subjects=subjects,
                time_preferences=data.get('timePreferences', [])
            )
            
            # Add user and student to the session
            db.session.add(new_user)
            db.session.add(new_student)

            db.session.commit()

        elif data['role'] == 'teacher':
            if 'level' not in data or 'subjects' not in data:
                return jsonify({"message": "Missing fields for teacher (level, subjects)"}), 400
            
            subjects = []
            for subject in data['subjects']:
                subject = Subject.query.filter_by(id=subject).first()
                subjects.append(subject)

            if new_user is None:
                return jsonify({"message": "Invalid subject ID"}), 400

            if len(subjects) == 0:
                return jsonify({"message": "At least one subject is required"}), 400

            # Create Professor record
            new_teacher = Teacher(
                user=new_user,
                level=data['level'],
                subjects=subjects,
                time_preferences=data.get('timePreferences', [])
            )

            # Add user and professor to the session
            db.session.add(new_user)
            db.session.add(new_teacher)
            
            db.session.commit()

        else:
            return jsonify({"message": "Invalid role, must be either 'student' or 'professor'"}), 400

            # Respond with a success message
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as err:
        print("error register: ", str(err))
        return jsonify({"message": f"{str(err)}"}), 500


@api.route('/login', methods=['POST'])
def login():
        """
        Endpoint to log in a user. Receives email and password, validates them,
        and returns a JWT token if the credentials are correct.
        """
        data = request.get_json()

        # Comprobamos que los campos obligatorios están completos.
        required_fields = ['email', 'password']
        for field in required_fields:
            if field not in data:
                return jsonify({"message": f"Missing field: {field}"}), 400

        # Buscar el usuario por email
        user = User.query.filter_by(email=data['email']).first()
        if user is None or not user.check_password(data['password']):
            return jsonify({"message": "Invalid email or password"}), 401

        # Crear un token de acceso que expira en 5 horas
        access_token = create_access_token(identity=user.id, expires_delta=timedelta(hours=5))

        return jsonify({
            "message": "Login successful",
            "access_token": access_token,
            "user": user.serialize()
        }), 200


@api.route('/subjects', methods=['GET'])
def get_all_subjects():
    try:
        subjects = Subject.query.all()
        return jsonify([subject.serialize() for subject in subjects]), 200
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

@api.route('/teachers_subjects', methods=['GET'])
def get_teachers_and_subjects():
    try:
        searchQuery= request.args.get('search', '').lower()

                # Obtenemos la lista de profesores y sus materias utilizando una consulta explícita
        teacher_subjects = db.session.query(Teacher, Subject).join(
            teacher_subject, Teacher.id == teacher_subject.c.teacher_id
        ).join(
            Subject, Subject.id == teacher_subject.c.subject_id
        ).filter(
            Subject.name.ilike(f"%{searchQuery}%")
        ).all()

        # Diccionario para almacenar la información de los profesores y sus materias
        teachers_dict = {}

        for teacher, subject in teacher_subjects:
            if teacher.id not in teachers_dict:
                teachers_dict[teacher.id] = {
                    "teacher_id": teacher.id,
                    "teacher_name": teacher.user.fullName,
                    "profession": teacher.level.value,
                    "price": teacher.price,
                    "image": teacher.user.photo,
                    "subjects": []
                }
            teachers_dict[teacher.id]["subjects"].append(subject.serialize())

        # Convertir el diccionario en una lista
        result = list(teachers_dict.values())

        return jsonify(result), 200
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

@api.route('/user/<int:user_id>/interests', methods=['GET'])
def get_user_interests(user_id):
    try:
        # Buscar el usuario por ID
        user = User.query.get(user_id)
        if not user:
            return jsonify({"message": "User not found"}), 404

        # Verificar si el usuario es un estudiante y obtener sus intereses
        if user.student:
            interests = user.student.subjects
            return jsonify([subject.serialize() for subject in interests]), 200
        else:
            return jsonify({"message": "User is not a student"}), 400

    except Exception as err:
        return jsonify({"message": f"An error occurred: {str(err)}"}), 500


@api.route('/teacher/<int:teacher_id>', methods=['GET'])
def getTeacher_Info(teacher_id):
    try:
        # Buscar el profesor por ID
        teacher = Teacher.query.get(teacher_id)
        if not teacher:
            return jsonify({"message": "Teacher not found"}), 404

        # Devolver toda la información del profesor
        return jsonify(teacher.serialize()), 200

    except Exception as err:
        return jsonify({"message": f"An error occurred: {str(err)}"}), 500

@api.route('/review', methods=['POST'])
#@jwt_required()
def add_review():
    try:
        data = request.get_json()
        review = Review()
        review.teacher_id = data.get('teacher_id')
        review.rating = data.get('rating')
        review.comments = data.get('comments')
        review.student_id = data.get("student_id")
        
        db.session.add(review)
        db.session.commit()    

        return jsonify({"message": f"Review registered succesfully"}), 201
    
    except Exception as err:
        return jsonify({"message": f"An error occurred: {str(err.args)}"}), 500


@api.route('/users', methods=['GET'])
def get_users():
    try:
        user = User.query.all()

        print ("users", len(user))

        return jsonify(user[0].id), 200

    except Exception as err:
        return jsonify({"message": f"An error occurred: {str(err.args)}"}), 500