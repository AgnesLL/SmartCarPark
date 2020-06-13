#make sure model.h5 is in the same directory as this file
import os
import numpy as np
from keras.preprocessing.image import img_to_array
from keras.models import load_model
from keras.preprocessing.image import ImageDataGenerator
from keras.preprocessing import image
from PIL import Image as ig
import json
import h5py
import socketio
from time import sleep
sio = socketio.Client()
sio.connect('http://localhost:5000')
def detect(sio, prediction):
    # cap = cv2.VideoCapture(0)
    # change path to the path of this file
    path = os.getcwd()
    classifier = load_model(str(path + "\\model.h5"))
    area1 = (40, 95, 200, 455)
    area2 = (240, 95, 400, 455)
    area3 = (450, 95, 610, 455)
    #confirm image.jpg is grayscale
    for i in range(0,3):
        sleep(1)
        imgPath = 'clinet\\image'+str(i+1)+'.jpg'
        img = ig.open(imgPath)
        img = np.asarray(img)
        img = ig.fromarray(img)

        img = np.expand_dims(img, axis=0)
        img = np.expand_dims(img, axis=3)

        result = classifier.predict(img)
        if result[0][0] > result[0][1] and result[0][0] > result[0][2] and prediction[i] != 'Occupied':
            output = str('string'+str(int(i+1))+': ' 'Occupied')
            sio.emit('changed', output)
            print(output)
            prediction[i] = 'Occupied'
        elif result[0][1] > result[0][0] and result[0][1] > result[0][2] and prediction[i] != 'Obstructed':
            output = str('string'+str(int(i+1))+': ' 'Obstructed')
            sio.emit('changed', output)
            print(output)
            prediction[i] = 'Obstructed'
        elif result[0][2] > result[0][0] and result[0][2] > result[0][1] and prediction[i] != 'Unoccupied':
            output = str('string'+str(int(i+1))+': ' 'Unoccupied')
            sio.emit('changed', output)
            print(output)
            prediction[i] = 'Unoccupied'