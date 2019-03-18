from flask import Flask, render_template, request
from werkzeug import secure_filename
from keras.models import load_model
import librosa
import numpy as np
import tensorflow as tf
import os
os.environ['KMP_DUPLICATE_LIB_OK']='True'
UPLOAD_FOLDER = '/Users/sarahgu/Documents/Misc/BlairHack/realSite/uploads'
ALLOWED_EXTENSIONS = set(['mp3'])
app = Flask(__name__,static_url_path = "/templates", static_folder = "templates")
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
def load_keras_model():
    global model
    model = load_model('../models/model.h5')
    model._make_predict_function()
    # Required for model to work
    global graph
    graph = tf.get_default_graph()
renderDict = {'results':[], 'counter': 0, 'total': 0}
@app.route('/upload', methods = ['GET', 'POST'])

def upload_file1():
    if request.method == 'POST':
        renderDict['total'] += 1 
        f = request.files['file']
        f.save(os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(f.filename)))
        x1, temp = librosa.load('uploads/'+f.filename)
        x1 = x1[0:21561]
        print(x1.shape)
        x1 = x1.reshape(1,21561,1)
        preds = model.predict(x1)
        print(preds)
        if preds[0][0] > .4523288:
            renderDict['results'].append(f.filename + ":" + "This video is safe to post.")
        else:
            renderDict['counter'] += 1
            renderDict['results'].append(f.filename + ":" + "This video has been FLAGGED for review")
    return render_template('upload.html', **renderDict)

if __name__ == '__main__':
    load_keras_model()
    app.run(host="0.0.0.0", port=80)

