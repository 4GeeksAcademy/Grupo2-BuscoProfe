from flask_sqlalchemy import SQLAlchemy
import bcrypt
import enum

db = SQLAlchemy()

# Enum para el nivel académico del estudiante
class StudentLevel(enum.Enum):
    StudentLevel_Bachillerato = "Bachillerato"
    StudentLevel_Universitario = "Universitario"

# Enum para el nivel académico del profesor
class TeacherLevel(enum.Enum):
    TeacherLevel_TecnicoTerciario = "Técnico terciario"
    TeacherLevel_Licenciatura = "Licenciatura"
    TeacherLevel_Maestria = "Maestría"
    TeacherLevel_Doctorado = "Doctorado"

# Tabla principal de usuarios
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    fullName = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    is_active = db.Column(db.Boolean(), default=True)
    type_user = db.Column(db.String(7), nullable=False)
    photo = db.Column(db.String(1000))

    student = db.relationship('Student', backref='user', uselist=False)
    teacher = db.relationship('Teacher', backref='user', uselist=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.fullName,
            "email": self.email,
            "isActive": self.is_active,
            "typeUser": self.type_user,
            "photo": self.photo
        }

    def set_password(self, password):
        self.password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))

# Tabla pivot para la relación entre Teacher y Subject
teacher_subject = db.Table('teacher_subject',
    db.Column('teacher_id', db.Integer, db.ForeignKey('teachers.id'), primary_key=True),
    db.Column('subject_id', db.Integer, db.ForeignKey('subjects.id'), primary_key=True)
)

# Tabla pivot para la relación entre Student y Subject (Intereses)
student_interest = db.Table('student_interest',
    db.Column('student_id', db.Integer, db.ForeignKey('students.id'), primary_key=True),
    db.Column('subject_id', db.Integer, db.ForeignKey('subjects.id'), primary_key=True)
)

# Tabla para los estudiantes
class Student(db.Model):
    __tablename__ = 'students'
    id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    level = db.Column(db.Enum(StudentLevel), nullable=False)
    subjects = db.relationship(
        'Subject',
        secondary=student_interest,
        backref='students', 
        lazy='dynamic'
    )
    time_preferences = db.Column(db.JSON)

    def __init__(self, *args, **kwargs,):
        super(Student, self).__init__(*args, **kwargs)
        self.subjects = kwargs.pop('subjects', [])
        self.time_preferences = kwargs.pop('time_preferences', [])
        self.level = kwargs.pop('level', None)

    def __repr__(self):
        return f'<Student {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "level": self.level.value,
            "subjects": self.subjects,
            "time_preferences": self.time_preferences,
        }

# Tabla para los profesores
class Teacher(db.Model):
    __tablename__ = 'teachers'
    id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    level = db.Column(db.Enum(TeacherLevel), nullable=False)
    subjects = db.relationship(
        'Subject',
        secondary=teacher_subject,
        backref='teachers', 
        lazy='dynamic'
    )
    time_preferences = db.Column(db.JSON)
    price = db.Column(db.Integer)
    description = db.Column (db.String(1000))
    
    def __init__(self, *args, **kwargs,):
        super(Teacher, self).__init__(*args, **kwargs)
        self.subjects = kwargs.pop('subjects', [])
        self.time_preferences = kwargs.pop('time_preferences', [])
        self.level = kwargs.pop('level', None)
        self.price = kwargs.pop('price', None)
        self.description = kwargs.pop('description', None)

    def __repr__(self):
        return f'<Teacher {self.id}>'

    def serialize(self):
        return {   
            "id": self.id,
            "name": self.user.fullName,
            "level": self.level.value,
            "subjects": [subject.serialize() for subject in self.subjects] if self.subjects else [],
            "time_preferences": self.time_preferences or [],  # Mantener JSON como está
            "price": self.price,
            "image": self.user.photo,
            "email": self.user.email, 
            "description": self.description
        }

# Tabla para las materias
class Subject(db.Model):
    __tablename__ = 'subjects'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=True)
    

    def __repr__(self):
        return f'<Subject {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            }
    
class Review(db.Model):
    __tablename__= 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comments = db.Column(db.Text, nullable=True)

    def __repr__(self):
        return f'<Review {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "student_id": self.student_id,
            "rating": self.rating,
            "teacher_id": self.teacher_id,
            "comments": self.comments,
            }


class AvailableDate(db.Model):
    __tablename__ = 'available_dates'
    id = db.Column(db.Integer, primary_key=True)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    start = db.Column(db.Time, nullable=False)
    end = db.Column(db.Time, nullable=False)

    teacher = db.relationship('Teacher', backref='available_dates')

    def __repr__(self):
        return f'<AvailableDate {self.date} - {self.teacher_id}>'

    def serialize(self):
        return {
            "id": self.id,
            "teacher_id": self.teacher_id,
            "date": self.date.isoformat(),
            "start": self.start.isoformat(),
            "end": self.end.isoformat(),
        }

class Session(db.Model):
    __tablename__ = 'sessions'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    start = db.Column(db.Time, nullable=False)
    end = db.Column(db.Time, nullable=False)
    subject = db.Column(db.String(120), nullable=False)
    comments = db.Column(db.Text, nullable=True)
    state = db.Column(db.String(50), nullable=False)

    student = db.relationship('Student', backref='sessions')
    teacher = db.relationship('Teacher', backref='sessions')

    def __repr__(self):
        return f'<Session {self.date} {self.start} - {self.end}>'

    def serialize(self):
        return {
            "id": self.id,
            "student_id": self.student_id,
            "teacher_id": self.teacher_id,
            "date": self.date.isoformat(),
            "start": self.start.isoformat(),
            "end": self.end.isoformat(),
            "subject": self.subject,
            "comments": self.comments,
            "state": self.state,
        }

