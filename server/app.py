from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration
import tempfile
import torch

app = Flask(__name__)
CORS(app, origins=["https://img-caption-generator-vercel.vercel.app/"])  # Restrict in production

# Load BLIP processor and model once at startup
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base", use_fast=False)
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

@app.route('/api/caption', methods=['POST'])
def caption():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    image_file = request.files['image']
    with tempfile.NamedTemporaryFile(delete=True, suffix=".png") as tmp:
        image_file.save(tmp.name)
        image = Image.open(tmp.name).convert("RGB")

        # Preprocess and generate caption
        inputs = processor(images=image, return_tensors="pt")
        with torch.no_grad():
            output = model.generate(**inputs)
        caption = processor.decode(output[0], skip_special_tokens=True)

        return jsonify({"caption": caption})

# Do NOT use app.run() in production; use gunicorn or another WSGI server
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
