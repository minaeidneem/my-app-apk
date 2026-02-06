from flask import Flask, jsonify
from flask_cors import CORS
import threading
import time

app = Flask(__name__)
CORS(app)  # لكي يسمح للموبايل بالاتصال بالسيرفر

# متغير وهمي لمحاكاة حالة التعرف على الوجه
status_data = {"status": "Scanning", "user": "None"}

def recognition_logic():
    """هذا الجزء يحاكي عمل الذكاء الاصطناعي في الخلفية"""
    global status_data
    while True:
        # هنا يمكنك وضع كود التعرف على الوجه الحقيقي لاحقاً
        time.sleep(5)
        status_data = {"status": "Recognized", "user": "Mina Eid"}
        time.sleep(5)
        status_data = {"status": "Scanning", "user": "None"}

@app.route('/get_status', methods=['GET'])
def get_status():
    return jsonify(status_data)

if __name__ == '__main__':
    # تشغيل منطق التعرف في خيط منفصل (Background Thread)
    threading.Thread(target=recognition_logic, daemon=True).start()
    # تشغيل السيرفر على كل عناوين الشبكة وبورت 5000
    app.run(host='0.0.0.0', port=5000)