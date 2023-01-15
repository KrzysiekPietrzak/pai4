from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.engine.url import URL
from flask_cors import CORS, cross_origin

app = Flask(__name__)
 
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost/db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost/db'
db = SQLAlchemy(app)
CORS(app)

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
        'user_id': self.user_id,
        'login': self.login,
        'password': self.password
    }


class Post(db.Model):
    post_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    author = db.Column(db.Text)
    title = db.Column(db.Text)
    body = db.Column(db.Text)

    def to_dict(self):
        likes_cnt = len(db.session.query(PostLike).filter(PostLike.post_id==self.post_id).all())
        return {
        'post_id': self.post_id,
        'user_id': self.user_id,
        'author': self.author,
        'title': self.title,
        'body': self.body,
        'likes': likes_cnt
        }


class PostLike(db.Model):
    post_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, primary_key=True)

class Comment(db.Model):
    comment_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    post_id = db.Column(db.Integer)
    author = db.Column(db.Text)
    body = db.Column(db.Text)

    def to_dict(self):
        return {
        'comment_id': self.comment_id,
        'post_id': self.post_id,
        'user_id': self.user_id,
        'author': self.author,
        'body': self.body
    }


@app.route('/login', methods=['POST']) 
def login():
    # dane rozpakowujemy
    data = request.get_json()
    login = data['login']
    password = data['password']

    # sprawdzamy czy uzytkownik o loginie i hasle istnieje
    user = User.query.filter_by(login=login, password=password).first()

    if user is not None:
        # zwracamy jego ID
        return jsonify({'msg': 'OK','wiadomosc': 'Zalogowany sukcesywnie', 'user_id': user.user_id, 'username': login})
    else:
        return jsonify({'msg': 'NOT','wiadomosc': 'Nie istnieje taki uzytkownik'})



@app.route('/users', methods=['GET', 'POST'])
def users():
    if request.method == 'POST':
        # bierzemy dane z reuesta
        data = request.get_json()
        login = data['login']
        password = data['password']

        # sprawdzamy czy login juz istnieje
        user = User.query.filter_by(login=login).first()

        if user is not None:
            # jesli login juz istnieje to
            return jsonify({"msg": 'Taken', "status": 201})
        else:
            # jesli nie istnieje taki uzytkownik to go utworz
            new_user = User(login=login, password=password)
            db.session.add(new_user)
            db.session.commit()
            return jsonify({"msg": 'Dodano użytkownika', "status": 201})

    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@app.route('/posts', methods=['GET', 'POST'])
def posts():
    if request.method == 'POST':
        data = request.get_json()
        userr = User.query.get(data['user_id'])
        print(userr)
        new_post = Post(user_id=data['user_id'], author=userr.login, title=data['title'], body=data['body'])
        db.session.add(new_post)
        db.session.commit()
        return {'msg': 'Dodano post', 'status': 201}
    posts = Post.query.all()

    # for post in posts:
    #     print(post.to_dict())
    return jsonify([post.to_dict() for post in posts])

@app.route('/posts/<int:post_id>', methods=['GET', 'DELETE'])
def post(post_id):
    post = Post.query.get(post_id)
    if not post:
        return {'msg':'Nie znaleziono postu', 'status':404}
    if request.method == 'DELETE':
        db.session.delete(post)
        db.session.commit()
        return {'msg':'OK', 'status':200}
    return jsonify(post.to_dict())

@app.route('/post_likes', methods=['POST'])
def post_likes():
    data = request.get_json()
    post_id = data['post_id']
    user_id = data['user_id']

    # sprawdzamy czy login juz istnieje
    like = PostLike.query.filter_by(post_id=post_id, user_id=user_id).first()

    if like is not None:
        # jesli like istnieje to
        # post_like = PostLike.query.get(post_id=post_id, user_id=user_id)  
        db.session.delete(like)
        db.session.commit()
        return {'msg': -1, 'status': 201}
    else:
        # jesli nie istnieje taki uzytkownik to go utworz
        new_like = PostLike(post_id=data['post_id'], user_id=data['user_id'])
        db.session.add(new_like)
        db.session.commit()
        return {'msg': 1, 'status': 201}
 
    # posts_likes = PostLike.query.all()
    # return jsonify([post.serialize() for post in posts_likes])


# @app.route('/post_likes', methods=['GET','POST'])
# def post_likes():
#     if request.method == 'POST':
#         data = request.get_json()
#         new_like = PostLike(post_id=data['post_id'], user_id=data['user_id'])
#         db.session.add(new_like)
#         db.session.commit()
#         return {'msg':'Dodano polubienie', 'status': 201}
#     posts_likes = PostLike.query.all()
#     return jsonify([post.serialize() for post in posts_likes])

# @app.route('/post_likes/<int:post_id>', methods=['GET', 'DELETE'])
# def post_like(post_id):
#     post_like = PostLike.query.get(post_id)
#     if not post_like:
#         return 'Nie znaleziono polubienia', 404
#     if request.method == 'DELETE':
#         db.session.delete(post_like)
#         db.session.commit()
#         return 'Usunięto polubienie', 200
#     return jsonify(post_like.serialize())

@app.route('/comments', methods=['GET', 'POST'])
def comments():
    if request.method == 'POST':
        data = request.get_json()
        new_comment = Comment(user_id=data['user_id'], author=data['author'], post_id=data['post_id'], body=data['body'])
        db.session.add(new_comment)
        db.session.commit()
        return jsonify({'msg':'Dodano komentarz', 'status':201})
    comments = Comment.query.all()
    return jsonify([comment.serialize() for comment in comments])

@app.route('/post_comments/<int:post_id>', methods=['GET'])
def post_comments(post_id):
    comments = db.session.query(Comment).filter(Comment.post_id==post_id).all()
    return jsonify([comment.to_dict() for comment in comments])

@app.route('/comments/<int:comment_id>', methods=['GET', 'DELETE'])
def comment(comment_id):
    comment = Comment.query.get(comment_id)
    if not comment:
        return {'msg':'Nie znaleziono komentarza', 'status':404}
    if request.method == 'DELETE':
        db.session.delete(comment)
        db.session.commit()
        return {'msg':'OK', 'status':200}
    return jsonify(comment.serialize())

# sprawdzamy czy tabele istnieją w DB
def tables_exist(tables):
    for table in tables: 
        if table not in db.metadata.tables:
            return False
    return True

def create_missing_tables():
    # sprawdzenie, czy wszystkie tabele istnieją w bazie danych
    if tables_exist(['user', 'post', 'post_like', 'comment']):
        # jeśli przynajmniej jedna tabela nie istnieje, tworzymy wszystkie tabele zdefiniowane w kodzie
        db.create_all()
        print('Utworzono brakujące tabele')

if __name__ == '__main__':
    with app.app_context():
# przykład użycia funkcji
        create_missing_tables()
    CORS(app)
    app.run(host='https://pai4.vercel.app', port=5000, debug=True)
