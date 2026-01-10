import base64
import json
import requests

# Read ZIP file
with open('modx-bootstrap-site.zip', 'rb') as f:
    zip_data = f.read()

print(f"ZIP file size: {len(zip_data) / 1024 / 1024:.2f} MB")

# Encode to base64
b64_data = base64.b64encode(zip_data).decode('utf-8')
print(f"Base64 encoded, uploading...")

# Send to backend
response = requests.post(
    'https://functions.poehali.dev/e1b575eb-5eb9-47dc-aff5-b2b926ca35b9',
    json={
        'fileData': b64_data,
        'filename': 'modx-bootstrap-site.zip'
    },
    timeout=300
)

result = response.json()
print(f"\nDownload URL: {result['url']}")
if 'size' in result:
    print(f"File size: {result['size']} bytes")
