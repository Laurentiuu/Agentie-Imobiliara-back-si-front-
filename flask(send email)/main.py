import ssl
from flask import Flask, request, jsonify
import smtplib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

gmail_user = 'proiect.python.1@gmail.com'
gmail_password = 'proiectpython'


@app.route('/sendEmail', methods=['POST'])
def send_email():

    email = request.json['email']

    sent_from = gmail_user
    to = email
    subject = 'Firma aia blana'
    body = 'Va contactam imediat!!!!'

    email_text = """\
    From: %s
    To: %s
    Subject: %s

    %s
    """ % (subject, sent_from, to, body)

    try:
        smtp_server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        smtp_server.ehlo()
        smtp_server.login(gmail_user, gmail_password)
        smtp_server.sendmail(sent_from, to, email_text)
        smtp_server.close()
        print("Email sent successfully!")
    except Exception as ex:
        print("Something went wrong….", ex)

    return "S-a trimis la " + request.json['email']


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    app.run(debug=True, port=5000)

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
