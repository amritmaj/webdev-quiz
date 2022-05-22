from distutils.log import debug
import re
from flask import Flask,render_template,request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/how_to_play')
def how_to_play():
    return render_template("how_to_play.html")

@app.route('/play')
def play():
    return render_template("play.html")


# @app.route('/html/', methods=['GET', 'POST'])
# def Play():
#     if request.method=="GET":
#         return render_template("play.html")
#     else:
#         return render_template("play.html")

if __name__ == "__main__":
    app.run(debug=True)