import os
import openai
from flask import Flask
from constants import OPENAI_API_KEY

#openai.organization = "YOUR_ORG_ID"
openai.api_key = OPENAI_API_KEY
openai.Model.list()

sentences = "I was just wondering if this works? I'm not sure, but I think my idea works better. Thank you! Sorry for bothering you. Have a nice day."

# response = openai.ChatCompletion.create(
# model="gpt-3.5-turbo",
# messages=[
#             {"role": "system", "content": "Which of the following sentences lack confidence? Replace ONLY them inline with a rephrase that is more professional and confident, retaining as much meaning and original wording as possible, leaving all other sentences unchanged."},
#             {"role": "user", "content": sentences},
#         ]
#     )
# result = response['choices'][0]['message']['content']
# print(response)

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/suggestions')
def retrieve_suggestions():
    response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
            {"role": "system", "content": "Can you rephrase each of the following sentences where appropriate to sound more confident and professional, retaining as much meaning and original wording as possible? Do not rephrase or change sentences that do not sound unconfident."},
            {"role": "user", "content": sentences},
        ]
    )
    result = response['choices'][0]['message']['content']
    print(response)
    return result