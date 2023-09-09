import sys
import pickle
import numpy as np
from PIL import Image
import io
import os
import filetype

# Load the pre-trained model from the .pkl file
with open('{}/routes/model/model.pkl'.format(os.getcwd()), 'rb') as f:
    model = pickle.load(f)

disease_mapping = {
    0: 'healthy',
    1: 'Pepper bell Bacterial spot',
    2: 'Pepper bell healthy',
    3:'Potato Early blight',
    4: 'Potato healthy',
    5:'Potato Late blight',
    6:'Tomato Target Spot',
    7: 'Tomato Tomato mosaic virus',
    8:'Tomato YellowLeaf Curl Virus',
    
}

# Define a function to preprocess the input image
def preprocess_image(image):
    # Resize the image to the input size of the model (e.g. 224 x 224)
    image = image.resize((256, 256))
    # Convert the image to a numpy array and scale the pixel values to [0, 1]
    image_array = np.array(image) / 255.0
    # Add an extra dimension to the array to represent a batch of size 1
    batch = np.expand_dims(image_array, axis=0)
    # Return the preprocessed batch
    return batch

# Read the image data from standard input and preprocess it
image_data = sys.stdin.read()

# file_type = filetype.guess(image_data)

# Check if the file type is JPEG or PNG

    # Wrap the image data in a BytesIO object and open it as a PIL Image object
# dataBytesIO = io.BytesIO(image_data)
image= Image.open(('{}/uploads/{}'.format(os.getcwd(),image_data)).replace('\n',""))
    # Handle the case when the image data is not in a recognized format


    
image_batch = preprocess_image(image)



# Use the model to predict the disease
predictions = model.predict(image_batch,verbose=0)
disease = np.argmax(predictions)

# Print the predicted disease index (e.g. 0 for 'healthy' or 1 for 'diseased')
predicted_disease_name = disease_mapping[disease]
print(predicted_disease_name)
