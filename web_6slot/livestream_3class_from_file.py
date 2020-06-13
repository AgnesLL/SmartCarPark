#make sure model.h5 is in the same directory as this file
import os
import numpy as np
from keras.preprocessing.image import img_to_array
from keras.models import load_model
from keras.preprocessing.image import ImageDataGenerator
from keras.preprocessing import image
from PIL import Image
import json
import h5py
import socketio
sio = socketio.Client()
sio.connect('http://localhost:5000')
def detect(sio, prediction):
    # cap = cv2.VideoCapture(0)
    # change path to the path of this file
    path = os.getcwd()
    area1 = (40, 95, 200, 455)
    area2 = (240, 95, 400, 455)
    area3 = (450, 95, 610, 455)
    classifier = load_model(str(path + "\\model.h5"))
    for j in range(0,6):
        imgPath = 'clinet\\image'+str(j+1)+'.jpg'
        #confirm image.jpg is grayscale
        img = Image.open(imgPath)
        img = np.asarray(img) 
        img = Image.fromarray(img)

        img = np.expand_dims(img, axis=0)
        img = np.expand_dims(img, axis=3)

        result = classifier.predict(img)
        if result[0][0] > result[0][1] and result[0][0] > result[0][2] and prediction[j] != 'Occupied':
            output = str('string'+str(int(j+1))+': ' 'Occupied')
            sio.emit('changed', output)
            print(output)
            prediction[j] = 'Occupied'
        elif result[0][1] > result[0][0] and result[0][1] > result[0][2] and prediction[j] != 'Obstructed':
            output = str('string'+str(int(j+1))+': ' 'Obstructed')
            sio.emit('changed', output)
            print(output)
            prediction[j] = 'Obstructed'
        elif result[0][2] > result[0][0] and result[0][2] > result[0][1] and prediction[j] != 'Unoccupied':
            output = str('string'+str(int(j+1))+': ' 'Unoccupied')
            sio.emit('changed', output)
            print(output)
            prediction[j] = 'Unoccupied'