#!/usr/bin/env python3
"""
Complete solution: Create ZIP and upload to S3, output only the download URL
"""
import os
import sys
import base64
import subprocess

# Step 1: Create ZIP archive
print("Creating ZIP archive...", file=sys.stderr)

if os.path.exists('modx-bootstrap-site.zip'):
    os.remove('modx-bootstrap-site.zip')

excludes = [
    "node_modules/*", ".git/*", "*.env*", "dist/*", "dist-ssr/*",
    "builds/*", "*.log", ".vscode/*", ".idea/*", "*.DS_Store",
    "*.local", "create_and_upload.sh", "create_zip_and_upload.py",
    "upload.py", "upload_to_s3.py", "upload_via_backend.py",
    "final_upload.py", "run_upload.py", "modx-bootstrap-site.zip"
]

cmd = ['zip', '-r', '-q', 'modx-bootstrap-site.zip', '.']
for ex in excludes:
    cmd.extend(['-x', ex])

try:
    subprocess.run(cmd, check=True, capture_output=True)
except subprocess.CalledProcessError as e:
    print(f"Error creating ZIP: {e}", file=sys.stderr)
    sys.exit(1)

if not os.path.exists('modx-bootstrap-site.zip'):
    print("Error: ZIP file not created", file=sys.stderr)
    sys.exit(1)

size_mb = os.path.getsize('modx-bootstrap-site.zip') / 1024 / 1024
print(f"ZIP created successfully: {size_mb:.2f} MB", file=sys.stderr)

# Step 2: Read and encode to base64
print("Encoding file to base64...", file=sys.stderr)

try:
    with open('modx-bootstrap-site.zip', 'rb') as f:
        file_data = f.read()
        b64_data = base64.b64encode(file_data).decode('utf-8')
except Exception as e:
    print(f"Error reading/encoding file: {e}", file=sys.stderr)
    sys.exit(1)

print(f"Encoded size: {len(b64_data)} characters", file=sys.stderr)

# Step 3: Upload to S3 via backend
print("Uploading to S3...", file=sys.stderr)

try:
    import requests
    
    response = requests.post(
        'https://functions.poehali.dev/e1b575eb-5eb9-47dc-aff5-b2b926ca35b9',
        json={
            'fileData': b64_data,
            'filename': 'modx-bootstrap-site.zip'
        },
        headers={'Content-Type': 'application/json'},
        timeout=300
    )
    
    if response.status_code != 200:
        print(f"Upload failed: HTTP {response.status_code}", file=sys.stderr)
        print(f"Response: {response.text}", file=sys.stderr)
        sys.exit(1)
    
    result = response.json()
    
    if 'url' not in result:
        print(f"Error: No URL in response", file=sys.stderr)
        print(f"Response: {result}", file=sys.stderr)
        sys.exit(1)
    
    print("Upload successful!", file=sys.stderr)
    print("")  # Empty line for separation
    
    # Output ONLY the download URL to stdout
    print(result['url'])
    
except ImportError:
    print("Error: 'requests' library not found. Install with: pip3 install requests", file=sys.stderr)
    sys.exit(1)
except Exception as e:
    print(f"Upload error: {e}", file=sys.stderr)
    sys.exit(1)
