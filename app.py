from flask import Flask, request, jsonify, render_template
import redis

app = Flask(__name__)

r = redis.Redis(host='localhost', port=6379, db=0)

@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.json
    user = data.get('user', 'anonymous')
    message = data.get('message', '')
    
    if message:
        r.rpush('chat_messages', f'{user}: {message}')
        return jsonify({"status": "Message sent!"}), 201
    else:
        return jsonify({"status": "Empty message!"}), 400

@app.route('/get_messages', methods=['GET'])
def get_messages():
    messages = r.lrange('chat_messages', 0, -1)
    
    decoded_messages = [msg.decode('utf-8') for msg in messages]
    
    return jsonify(decoded_messages), 200

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
