import os
import openai
from flask import Flask, jsonify, request
from flask_cors import CORS
from constants import OPENAI_API_KEY

#openai.organization = "YOUR_ORG_ID"
openai.api_key = OPENAI_API_KEY
openai.Model.list()

sentences = "I was just wondering if this works? I'm not sure, but I think my idea works better. Thank you! Sorry for bothering you. Have a nice day."

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/suggestions', methods=['POST'])
def retrieve_suggestions():
    sentences = request.json['sentences']
    response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
                {"role": "system", "content": "Can you rephrase each of the following sentences where appropriate to sound more confident and professional, retaining as much meaning and original wording as possible? Do not rephrase or change sentences that already sound confident."},
                {"role": "user", "content": sentences},
            ],
    temperature=0,
    )
    result = response['choices'][0]['message']['content']
    return jsonify(result)