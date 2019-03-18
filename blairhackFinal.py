from keras.models import Sequential
from keras.layers import Dense
from keras.layers import LSTM
from keras.models import Model
from keras.layers import Input,Flatten, Dropout
from sklearn.model_selection import train_test_split
import numpy
from random import randint
import librosa
import os
os.environ['KMP_DUPLICATE_LIB_OK']='True'
# fix random seed for reproducibility
numpy.random.seed(7)
# load pima indians dataset

x1, sanlowct = librosa.load('data/gunshot_1.mp3')

x2, sanlowct = librosa.load('data/gunshot_2.mp3')
x3, sanlowct = librosa.load('data/gunshot_3.mp3')
x4, sanlowct = librosa.load('data/gunshot_4.mp3')
x5, sanlowct = librosa.load('data/gunshot_5.mp3')
x6, sanlowct = librosa.load('data/gunshot_6.mp3')
x7, sanlowct = librosa.load('data/gunshot_7.mp3')
x8, temp = librosa.load('data/alligatorHiss.mp3')
x9, temp = librosa.load('data/batschatter.mp3')
x10, temp = librosa.load('data/beargrwl.mp3')
x11, temp = librosa.load('data/elephantcub.mp3')
x12, temp = librosa.load('data/dog_drinking.mp3')
x13, temp = librosa.load('data/rmonkeycolobus.mp3')
x14, temp = librosa.load('data/snakehiss2.mp3')
print(x14)
X = [x1,x2,x3,x4,x5,x6,x7,x8,x9,x10,x11,x12,x13,x14]

#X_sar, sarlowct = processRaw('sarah_data.csv', sanlowct)



for x in range(14):
    print(len(X[x]))
    X[x] = X[x][0:21561]

X = numpy.asarray(X)
Y=[]
for num in range(14):

    if num <7:
        Y.append(numpy.array([1,0]))
    else:
        Y.append(numpy.array([0,1]))

Y=numpy.asarray(Y)
print(X.shape)
#X = X.reshape(1204,32,4
X= X.reshape(14,21561,1)
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.1, random_state=42)
# split into input (X) and output (Y) variables

# create model
model = Sequential()
model.add(LSTM(12, activation='sigmoid',input_shape=(21561,1)))

#model.add(LSTM(32, activation = 'relu'))

model.add(Dense(12, activation='relu'))

model.add(Dense(8, activation='relu'))
model.add(Dense(2, activation='sigmoid'))
# Compile model
model.compile(loss='binary_crossentropy', optimizer='sgd', metrics=['accuracy'])
# Fit the model
model.summary()
model.fit(X_train, Y_train, epochs=2, batch_size=5, validation_data=(X_test,Y_test))
# evaluate the model
print(X_test.shape)
results = model.predict(X_test)

for arr in results:
    idxLarge = 0
    curval = 0
    for val in range(len(arr)):
        if arr[val] >curval:
            idxLarge = val
            curval = arr[val]
    print("The predicted number is: " + str(idxLarge+1) )
scores = model.evaluate(X_test, Y_test)
model.save('model.h5')
print("\n%s: %.2f%%" % (model.metrics_names[1], scores[1]*100))
