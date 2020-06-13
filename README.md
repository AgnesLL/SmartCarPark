# Smart Car Park System
## Features
### Object detection
- detects whether the car park is occupied, obstructed or unoccupied
### Website
- automatically shows the current status of the car park
- displays live stream of parking area
### Mobile app
- display status of the car park 
- sorting feature for helping drivers find the most suitable car park
### Desktop app
- monitor display inside car park to show drivers which section of the car park is available

## Get started
### web server and object detection
- install node.js 
- navigate to the directory web_3slot or web_6slot, depending on how many slot the car park has
- start the server using the commands
    ```
    node index.js
    take_photo.exe
    ```
- now the livestream web is on ```http://localhost:5000```
### Mobile app:
- open ```ClientApp\ClientApp.sln``` using visual studio
- Go to ```MainPage.xaml.cs```
- Right click ```ClientApp.Android```, click ```properties``` and go to ```android options```
- Uncheck ```Use Shared Runtime```
- Select ```Sdk Assemblies Only under Linking```
- Save and right click ```ClientApp.Android```, select ```Archive``` and click ```distribute```
- Follow instructions on https://docs.microsoft.com/zh-tw/xamarin/android/deploy-test/signing/?tabs=windows
to get the .apk file

### Desktop app:
- open ```ParkingLotMon\ParkingLotMon.sln``` 
- Go to ```MainWindow.xaml.cs```
- Run the application


## Object detection

### Training
A convolution neural network is trained to detect cars or obstructions inside the parking space. The model is trained using keras, a high-level neural network API, and TensorFlow backend. 

### Dataset
The dataset consist of images of 3 classes: cars, hands and nothing, which corresponds to the 3 classes of detection results, occupied, obstructed and unoccupied.
The “car” set consists of images of toy cars inside the parking space of our setup. The “hand” set consists of images of hands in the parking spaces of our setup. It is to simulate non-car objects like people in the parking spaces. The “nothing” set consists of image of the parking space without anything on it.  
Black and white images are used because color is not an important factor in the identification of cars. This helps eliminate the error caused due to the different colors of cars in training and usage.  

### Model Architecture
4 convolution layers was used, with max pooling layer after every 1 convolution layer. 
A flatten layer was used to reduce the dimension to 1.
A dropout layer was added to prevent overfitting.
2 dense layer was added at the end.