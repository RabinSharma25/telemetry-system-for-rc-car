import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
import joblib
import onnx
from skl2onnx import convert_sklearn 
from skl2onnx.common.data_types import FloatTensorType

#declaring global variables 
X_train, X_test, y_train, y_test = None, None, None, None


def train_test_predict(csv_path, test_size=0.2, random_state=42):
    # Read CSV file into a DataFrame
    global X_train, X_test, y_train, y_test
    df = pd.read_csv(csv_path)

    # Define features (X) and target variable (y)
    X = df.drop('result', axis=1)  # Features
    y = df['result']  # Target variable

    # Split the dataset into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_size, random_state=random_state)

    # Initialize the logistic regression model
    model = LogisticRegression(random_state=random_state)

    # Train the model on the training set
    model.fit(X_train, y_train)

    # Predictions on the testing set
    y_pred = model.predict(X_test)

    # Evaluate the model
    accuracy = accuracy_score(y_test, y_pred)
    conf_matrix = confusion_matrix(y_test, y_pred)
    classification_rep = classification_report(y_test, y_pred)

    # Print the evaluation metrics
    print("Accuracy:", accuracy)
    print("\nConfusion Matrix:\n", conf_matrix)
    print("\nClassification Report:\n", classification_rep)

    return model

def save_model(model, save_model_path):
    # Save the model
    joblib.dump(model, save_model_path)
    print("Model saved successfully at:", save_model_path)

    # # Return the saved model
    # return joblib.load(save_model_path)


def save_model_to_onnx(joblib_model_path, onnx_model_path, X_train):
    # Load the scikit-learn model using joblib
    loaded_model = joblib.load(joblib_model_path)

    # Specify the input type (you may need to adjust this based on your model's input type)
    initial_type = [('float_input', FloatTensorType([None, X_train.shape[1]]))]
    options = {'zipmap': False}# enables getting probabilities in Node.
    # Convert the model to ONNX format
    onnx_model = convert_sklearn(loaded_model, initial_types=initial_type, options=options)

    # Save the ONNX model to a file
    onnx.save_model(onnx_model, onnx_model_path)

    print(f"Model saved successfully in ONNX format at: {onnx_model_path}")

# Example usage:
result_csv_path = './Receiver/backend/src/ML-Model/result.csv'
saved_model_path = './Receiver/backend/src/ML-Model/model.joblib'
onnx_model_path = './Receiver/backend/src/ML-Model/onnx_model.onnx'


# Train, test, and predict
trained_model = train_test_predict(result_csv_path)

# Save the model and get the saved model
save_model(trained_model, saved_model_path)

save_model_to_onnx(saved_model_path , onnx_model_path, X_train)