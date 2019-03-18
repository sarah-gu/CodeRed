#from utils import generate_random_start, generate_from_seed
from keras.models import load_model
import tensorflow as tf
from flask import Flask, render_template, request, flash, redirect, send_from_directory
from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired

import os
os.environ['KMP_DUPLICATE_LIB_OK']='True'
# Create app
UPLOAD_FOLDER = '/uploads'
ALLOWED_EXTENSIONS = set(['mp3'])
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def load_keras_model():
    """Load in the pre-trained model"""
    global model
    # model = load_model('../models/train-embeddings-rnn.h5')
    # Required for model to work
    global graph
    graph = tf.get_default_graph()
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'],filename)
@app.route("/", methods=['POST'])
def upload_file():
    print("HI")
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return redirect(url_for('uploaded_file',
                                    filename=filename))
    return ''
# Home page


if __name__ == "__main__":
    print(("* Loading Keras model and Flask starting server..."
           "please wait until server has fully started"))
           # load_keras_model()
           # Run app
    app.run(host="0.0.0.0", port=80)


