import cv2
import os
from time import sleep
import socketio 
import base64
import numpy as np
from PIL import Image
from io import BytesIO
from livestream_3class_from_file import detect
sio = socketio.Client()
area1 = (40, 95, 200, 455)
area2 = (240, 95, 400, 455)
area3 = (450, 95, 610, 455)
try:
    sio.connect("http://localhost:5000")
except socketio.exceptions.ConnectionError:
    print('cannot connect to server')
    pass
cap = cv2.VideoCapture(0)
path = os.getcwd()
prediction = [None, None, None]
while True:
    sleep(0.5)
    ret, frame = cap.read()
    
    img_rgb = cv2.resize(frame, (640, 480))
    #colored img
    ret, img_rgb = cv2.imencode('.jpg', img_rgb)
    #change to base64
    cv2.imwrite(path+'\\color_img.jpg', img_rgb)
    img_rgb = base64.b64encode(img_rgb)
    img_rgb = img_rgb.decode()
    sio.emit('photo', img_rgb)
    print(img_rgb)
    #grayscale img
    img_bw = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    img_bw = cv2.resize(img_bw, (640, 480))
    img_bw = Image.fromarray(img_bw)
    new1 = img_bw.crop(area1)
    new2 = img_bw.crop(area2)
    new3 = img_bw.crop(area3)
    img_list = [new1, new2, new3]
    for i in range(0,3):
        img_list[i].save(path+'\\clinet\\image'+str(i+1)+'.jpg')
    #cv2.imwrite(path+'\\clinet\\image.jpg', img_bw)
    detect(sio, prediction)