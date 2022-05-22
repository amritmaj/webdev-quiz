from distutils.log import debug
import re
from flask import Flask,render_template,request

app = Flask(__name__)

@app.route('/')
def Main():
    return render_template("index.html")

@app.route('/play', methods=['GET', 'POST'])
def Play():
    if request.method=="GET":
        return render_template("play.html")
    else:
        return render_template("play.html")

if __name__ == "__main__":
    app.run(debug=True)