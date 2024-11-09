from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
import os

app = Flask(__name__)

# Set the API key in the environment (this can be done using os.environ, or directly)
GEMINI_KEY = 'AIzaSyD65xAbqi1kaKfZ6sPuNAQ650iZIIEavD8'
os.environ["GOOGLE_API_KEY"] = GEMINI_KEY  # Alternatively, you can use this to set the key
genai.configure(api_key=GEMINI_KEY)

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

# AI Content Generation Route
@app.route('/generate-content', methods=['POST'])
def generate_content():
    data = request.get_json()  # Capture the JSON request body
    prompt = data.get('prompt')

    if not prompt:
        return jsonify({'error': 'No prompt provided'}), 400

    try:
        # Call Google Generative AI to generate text based on the prompt
        response = genai.generate_text(prompt=prompt)
        return jsonify({'suggestions': response.result})  # Return the generated text
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Running the app
if __name__ == '__main__':
    app.run(debug=True)
