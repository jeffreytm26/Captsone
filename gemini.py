from flask import Flask, render_template, request, jsonify
import google.generativeai as genai

app = Flask(__name__)  # Initialize the Flask application

# Set up the Gemini API key
GEMINI_KEY = 'AIzaSyD65xAbqi1kaKfZ6sPuNAQ650iZIIEavD8'  # Replace with your actual API key
genai.configure(api_key=GEMINI_KEY)
model = genai.GenerativeModel('gemini-pro')  # Initialize the generative model

@app.route('/', methods=['GET', 'POST'])  # Define the route for the index page
def index():
    if request.method == 'POST':  # If the request method is POST
        user_input = request.form['user_input']  # Get user input from the form

        # Generate a response using the model
        response = model.generate_content(user_input)  # Adjust this as necessary based on your API

        # Render the result template with the generated content
        return render_template('result.html', response=response.text)
    else:
        # Render the index template for GET requests
        return render_template('index.html')

if __name__ == '__main__':  # Run the app if this file is executed directly
    app.run(debug=True)  # Run the Flask app in debug mode
