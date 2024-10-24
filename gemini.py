from flask import Flask, render_template, request, jsonify
import google.generativeai as genai

app = Flask(__name__)

GEMINI_KEY = 'AIzaSyD65xAbqi1kaKfZ6sPuNAQ650iZIIEavD8'
genai.configure(api_key=GEMINI_KEY)
model = genai.GenerativeModel('gemini-pro')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/budget')
def budget():
    return render_template('budget.html')

@app.route('/goals')
def goals():
    return render_template('goals.html')

@app.route('/ai-help')
def ai_help():
    return render_template('ai_help.html')

@app.route('/generate-content', methods=['POST'])
def generate_content():
    data = request.get_json()
    prompt = data.get('prompt')
    response = model.generate_content(prompt)
    return jsonify({'suggestions': response.text})

if __name__ == '__main__':
    app.run(debug=True)