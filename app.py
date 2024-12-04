from flask import Flask, render_template, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# Load the Hugging Face text generation model
generator = pipeline("text-generation", model="gpt2")  # You can replace "gpt2" with other models


@app.route('/')
def index():
    """
    Render the main page of the app.
    """
    return render_template('index.html')


@app.route('/budget')
def budget():
    """
    Render the budget page.
    """
    return render_template('budget.html')


@app.route('/goals')
def goals():
    """
    Render the goals page.
    """
    return render_template('goals.html')

@app.route('/home-planning')
def home_planning():
    return render_template('home_planning.html')

@app.route("/car-planning")
def car_planning():
    return render_template("car_planning.html")

@app.route("/debt-management")
def debt_management():
    return render_template("debt_management.html")

@app.route("/retirement-planning")
def retirement_planning():
    return render_template("retirement_planning.html")

@app.route("/finance-trivia")
def finance_trivia():
    return render_template("finance_trivia.html")


@app.route('/ai-help')
def ai_help():
    """
    Render the AI help page.
    """
    return render_template('ai_help.html')

@app.route('/generate-content', methods=['POST'])
def generate_content():
    """
    Generate text content based on the user's prompt using Hugging Face's Transformers.
    """
    data = request.get_json()  # Capture the JSON request body
    prompt = data.get('prompt')

    if not prompt:
        return jsonify({'error': 'No prompt provided'}), 400

    try:
        # Use the Hugging Face pipeline to generate text
        result = generator(prompt, max_length=50, num_return_sequences=1)
        generated_text = result[0]['generated_text']
        return jsonify({'suggestions': generated_text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
