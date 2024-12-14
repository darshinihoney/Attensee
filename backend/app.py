from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
from ultralytics import YOLO
import cv2

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

UPLOAD_FOLDER = 'uploads'
PROCESSED_FOLDER = 'processed'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Load YOLO model (replace 'best.pt' with your model file)
try:
    model = YOLO('best.pt')  # Ensure this is your trained YOLO model path
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

# Endpoint for prediction
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'Empty file name'}), 400

    # Save the uploaded file
    image_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(image_path)

    # Process image for predictions
    try:
        results = model(image_path)  # Run YOLO model
        image = cv2.imread(image_path)  # Load image using OpenCV

        # Annotate image with bounding boxes
        annotated_image_path = os.path.join(PROCESSED_FOLDER, f'processed_{file.filename}')
        for result in results:
            for box in result.boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0])  # Box coordinates
                confidence = float(box.conf[0])  # Confidence score
                class_id = int(box.cls[0])  # Class ID
                
                # Classification logic: assign red/green based on confidence or custom logic
                color = (0, 255, 0) if confidence > 0.6 else (0, 0, 255)  # Green if confident, red otherwise

                # Draw bounding box without label text
                cv2.rectangle(image, (x1, y1), (x2, y2), color, 2)

        # Save annotated image
        cv2.imwrite(annotated_image_path, image)

        # Return annotated image
        return send_file(annotated_image_path, mimetype='image/jpeg')

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
