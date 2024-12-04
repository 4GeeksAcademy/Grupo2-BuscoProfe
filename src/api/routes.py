from flask import Flask, request, jsonify, Blueprint
from flask_jwt_extended import create_access_token
from api.models import db, User, Student, Teacher
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

        # Create Student record
        new_student = Student(
            user=new_user,
            level=data['level'],
            subjects=data['subjects'],
            time_preferences=data.get('timePreferences', [])
        )
        
        # Add user and student to the session
        db.session.add(new_user)
        db.session.add(new_student)

    elif data['role'] == 'teacher':
        if 'level' not in data or 'subjects' not in data:
            return jsonify({"message": "Missing fields for teacher (level, subjects)"}), 400
        
        # Create Professor record
        new_teacher = Teacher(
            user=new_user,
            level=data['level'],
            subjects=data['subjects'],
            time_preferences=data.get('timePreferences', [])
        )

        # Add user and professor to the session
        db.session.add(new_user)
        db.session.add(new_teacher)

    else:
        return jsonify({"message": "Invalid role, must be either 'student' or 'professor'"}), 400

    try:
        # Commit the transaction to save the user and their corresponding record
        db.session.commit()
        
        # Respond with a success message
        return jsonify({"message": "User registered successfully"}), 201

    except Exception as e:
        # In case of an error, roll back the transaction
        db.session.rollback()
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500


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