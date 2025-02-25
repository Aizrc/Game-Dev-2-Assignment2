from flask import Flask, request, jsonify

app = Flask(__name__)

users = []
tasks = []

@app.route('/users', methods=['GET'])
def get_users():
    return jsonify(users), 200

@app.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = next((user for user in users if user['id'] == id), None)
    if user is None:
        return jsonify({'error': 'User not found'}), 404
    return jsonify(user), 200

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    user = {
        'id': len(users) + 1,
        'name': data['name']
    }
    users.append(user)
    return jsonify(user), 201

@app.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    data = request.get_json()
    user = next((user for user in users if user['id'] == id), None)
    if user is None:
        return jsonify({'error': 'User not found'}), 404
    user['name'] = data['name']
    return jsonify(user), 200

@app.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    global users
    users = [user for user in users if user['id'] != id]
    return '', 204

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks), 200

@app.route('/tasks/<int:id>', methods=['GET'])
def get_task(id):
    task = next((task for task in tasks if task['id'] == id), None)
    if task is None:
        return jsonify({'error': 'Task not found'}), 404
    return jsonify(task), 200

@app.route('/tasks', methods=['POST'])
def create_task():
    data = request.get_json()
    task = {
        'id': len(tasks) + 1,
        'title': data['title'],
        'description': data.get('description', ''),
        'completed': False
    }
    tasks.append(task)
    return jsonify(task), 201

@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    data = request.get_json()
    task = next((task for task in tasks if task['id'] == id), None)
    if task is None:
        return jsonify({'error': 'Task not found'}), 404
    task['title'] = data['title']
    task['description'] = data.get('description', task['description'])
    task['completed'] = data.get('completed', task['completed'])
    return jsonify(task), 200

@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    global tasks
    tasks = [task for task in tasks if task['id'] != id]
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)