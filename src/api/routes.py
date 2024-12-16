from flask import Flask, request, jsonify, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, decode_token
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
            photo= "https://i.pinimg.com/736x/c7/7c/6b/c77c6b5677ce4f32cb651b32c0c4363c.jpg",
            is_active=True,
            type_user = data['role']
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

    # Determinar los roles (si es estudiante, profesor o ambos)
    roles = []
    additional_claims = {}
    if user.student:  # Si existe la relación con Student
        roles.append('student')
        additional_claims["student_id"] = user.student.id  # Añadir student_id a los claims
    if user.teacher:  # Si existe la relación con Teacher
        roles.append('teacher')
        additional_claims["teacher_id"] = user.teacher.id  # Añadir teacher_id a los claims

    # Si no hay roles, significa que hay un problema con los datos del usuario.
    if not roles:
        return jsonify({"message": "No roles assigned to the user"}), 400

    # Agregar roles a los claims adicionales
    additional_claims["roles"] = roles

    # Crear el token JWT con los claims adicionales
    access_token = create_access_token(
        identity=str(user.id),  # Usamos el user_id como identity
        expires_delta=timedelta(hours=5),
        additional_claims=additional_claims  # Añadimos los claims
    )

    # Devuelves el token y la información del usuario
    return jsonify({
        "message": "Login successful",
        "access_token": access_token,
        "user": user.serialize()  # Información del usuario
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


@api.route('/user/<int:user_id>/teacher', methods=['GET'])
def get_user_teacher(user_id):
    try:
        # Buscar el usuario por ID
        user = User.query.get(user_id)
        if not user:
            return jsonify({"message": "User not found"}), 404

        # Verificar si el usuario es un docente
        if user.teacher:
            teacher_id = user.teacher.id  # Obtener el ID del teacher
            return jsonify({"teacher_id": teacher_id}), 200
        else:
            return jsonify({"message": "User is not a teacher"}), 400

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


@api.route('/teacher/<int:teacher_id>/reviews', methods=['GET'])
def get_teacher_reviews(teacher_id):
    try:
        teacher = Teacher.query.get(teacher_id)
        if not teacher:
            return jsonify({"message": "Teacher not found"}), 404

        reviews = Review.query.filter_by(teacher_id=teacher_id).all()

        # Calcular el promedio de las calificaciones
        if reviews:
            average_rating = sum([review.rating for review in reviews]) / len(reviews)
        else:
            average_rating = 0

        return jsonify({
            "reviews": [review.serialize() for review in reviews],
            "average_rating": average_rating
        }), 200
    except Exception as err:
        return jsonify({"message": f"An error occurred: {str(err)}"}), 500



@api.route('/users', methods=['GET'])
def get_users():
    try:
        user = User.query.all()

        print ("users", len(user))

        return jsonify(user[0].id), 200

    except Exception as err:
        return jsonify({"message": f"An error occurred: {str(err.args)}"}), 500
    

@api.route('/update_price', methods=['POST'])
def update_price():
    try:
        data = request.get_json()  # Obtiene los datos enviados en la solicitud
        teacher_id = data.get('teacher_id')
        new_price = data.get('price')

        # Validación de los datos
        if not teacher_id or not new_price:
            return jsonify({"message": "Faltan datos obligatorios."}), 400

        if not isinstance(new_price, (int, float)) or float(new_price) <= 0:
            return jsonify({"message": "El precio debe ser un número positivo."}), 400

        # Buscar el profesor en la base de datos
        teacher = Teacher.query.get(teacher_id)
        if not teacher:
            return jsonify({"message": "El profesor no existe."}), 404

        # Actualizar el precio
        teacher.price = new_price
        db.session.commit()

        return jsonify({"message": "Precio actualizado exitosamente."}), 200

    except Exception as err:
        return jsonify({"message": f"Se produjo un error: {str(err)}"}), 500

@api.route('/verify_token', methods=['POST'])
def verify_token():
    """
    Endpoint para verificar la validez de un idToken.
    """
    token = request.headers.get('Authorization', None)

    if not token:
        return jsonify({"message": "Token missing"}), 400

    token = token.replace("Bearer ", "")  # Elimina el prefijo 'Bearer ' si está presente

    try:
        # Decodificar el token
        decoded_token = decode_token(token)

        # Obtener el 'sub' (ID del usuario) y 'roles' (rol del usuario)
        user_id = decoded_token.get('sub')  # El ID del usuario está en 'sub'
        roles = decoded_token.get('roles')  # Los roles del usuario están en 'roles'

        # Validar 'teacher_id' basado en el rol
        teacher_id = decoded_token.get('teacher_id', None) if 'teacher' in roles else None

        student_id = decoded_token.get('student_id', None) if 'student' in roles else None

        # Verificar si 'user_id' y 'roles' están presentes en el token
        if not user_id or not roles:
            return jsonify({"message": "Invalid token"}), 401

        # Devolver 'user_id', 'roles' y opcionalmente 'teacher_id'
        return jsonify({
            "user_id": user_id,
            "roles": roles,
            "teacher_id": teacher_id,
            "student_id": student_id
        }), 200

    except Exception as e:
        return jsonify({"message": f"Invalid token: {str(e)}"}), 401

@api.route('/update_description', methods=['POST'])
def update_description():
    try:
        data = request.get_json()  # Obtiene los datos enviados en la solicitud
        teacher_id = data.get('teacher_id')
        new_description = data.get('description')

        # Validación de los datos
        if not teacher_id or not new_description:
            return jsonify({"message": "Faltan datos obligatorios."}), 400

               # Buscar el profesor en la base de datos
        teacher = Teacher.query.get(teacher_id)
        if not teacher:
            return jsonify({"message": "El profesor no existe."}), 404

        # Actualizar la descripcion
        teacher.description = new_description
        db.session.commit()

        return jsonify({"message": "Descripción actualizada exitosamente."}), 200

    except Exception as err:
        return jsonify({"message": f"Se produjo un error: {str(err)}"}), 500

@api.route('/teacher_id', methods=['GET'])
@jwt_required()
def getTeacher_ById():
    try:
        # Buscar el profesor por ID
        teacher_id = get_jwt_identity()
        teacher = Teacher.query.get(teacher_id)
        if not teacher:
            return jsonify({"message": "Teacher not found"}), 404

        # Devolver toda la información del profesor
        return jsonify(teacher.serialize()), 200

    except Exception as err:
        return jsonify({"message": f"An error occurred: {str(err)}"}), 500
