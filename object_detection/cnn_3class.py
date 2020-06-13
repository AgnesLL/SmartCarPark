from keras.models import Sequential
from keras.models import load_model
from keras.layers import Conv2D
from keras.layers import MaxPooling2D
from keras.layers import Flatten
from keras.layers import Dense
from keras.layers import Dropout
from keras.preprocessing.image import ImageDataGenerator
from keras.callbacks import TensorBoard, EarlyStopping, ModelCheckpoint
model_check_point = ModelCheckpoint('09.h5', save_best_only=True)
early_stopper = EarlyStopping(patience=5)
tensorboard = TensorBoard(log_dir='./logs')

#classifier = load_model('new_models/06.h5')
classifier = Sequential()

classifier.add(Conv2D(32, (3, 3), input_shape = (360, 180, 1), activation = 'relu'))
classifier.add(MaxPooling2D(pool_size = (2, 2)))

classifier.add(Conv2D(64, (3, 3), activation = 'relu'))
classifier.add(MaxPooling2D(pool_size = (2, 2)))

classifier.add(Conv2D(128, (3, 3), activation = 'relu'))
classifier.add(MaxPooling2D(pool_size = (2, 2)))

classifier.add(Conv2D(128, (3, 3), activation = 'relu'))
classifier.add(MaxPooling2D(pool_size = (2, 2)))

classifier.add(Flatten())
classifier.add(Dropout(0.3))
classifier.add(Dense(units = 512, activation = 'relu'))
classifier.add(Dense(units = 3, activation = 'softmax'))

classifier.compile(optimizer = 'adam', loss = 'categorical_crossentropy', metrics = ['accuracy'])

train_datagen = ImageDataGenerator(rescale = 1./255, shear_range = 0.2, zoom_range = 0.2, horizontal_flip = True)
val_datagen = ImageDataGenerator(rescale = 1./225)
training_set = train_datagen.flow_from_directory('dataset/training_set', target_size = (360, 180), batch_size = 4, class_mode = 'categorical', color_mode='grayscale')
val_set = val_datagen.flow_from_directory('dataset/validation_set', target_size = (360,180), batch_size = 4, class_mode = 'categorical', color_mode='grayscale')
print(training_set.class_indices)
#change steps_per_epoch to no. of photos/batch_size
#validation steps equal to the number of samples of your validation dataset divided by the batch size
#add initital epoch if trained resume training
#if acc much higher than val_acc, model is overfit
classifier.fit_generator(training_set, steps_per_epoch = 70, epochs = 5, validation_data = val_set, validation_steps = 18, workers = 1, callbacks=[tensorboard, early_stopper, model_check_point])

classifier.save("10.h5", overwrite=False, include_optimizer=True)
# to start tensorboard
#tensorboard --logdir ./logs