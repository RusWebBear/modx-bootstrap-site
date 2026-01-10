#!/usr/bin/env python3
"""
Create ZIP archive of MODX project and upload to S3
"""
import os
import sys
import base64
import json
import subprocess
import requests

def create_zip():
    """Create ZIP archive excluding unnecessary files"""
    print("Creating ZIP archive...")
    
    # Remove old ZIP if exists
    if os.path.exists('modx-bootstrap-site.zip'):
        os.remove('modx-bootstrap-site.zip')
    
    # Files and directories to exclude
    excludes = [
        "node_modules/*",
        ".git/*",
        "*.env*",
        "dist/*",
        "dist-ssr/*",
        "builds/*",
        "*.log",
        ".vscode/*",
        ".idea/*",
        "*.DS_Store",
        "create_and_upload.sh",
        "create_zip_and_upload.py",
        "upload.py",
        "upload_to_s3.py",
        "upload_via_backend.py",
        "*.local"
    ]
    
    # Build zip command
    cmd = ['zip', '-r', 'modx-bootstrap-site.zip', '.']
    for exclude in excludes:
        cmd.extend(['-x', exclude])
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode != 0:
            print(f"Error creating ZIP: {result.stderr}")
            sys.exit(1)
        
        if not os.path.exists('modx-bootstrap-site.zip'):
            print("Error: ZIP file was not created")
            sys.exit(1)
        
        file_size = os.path.getsize('modx-bootstrap-site.zip')
        print(f"✓ ZIP archive created: {file_size / 1024 / 1024:.2f} MB")
        return True
        
    except Exception as e:
        print(f"Error creating ZIP: {e}")
        sys.exit(1)

def upload_to_backend():
    """Upload ZIP file to S3 via backend function"""
    zip_file_path = 'modx-bootstrap-site.zip'
    backend_url = 'https://functions.poehali.dev/e1b575eb-5eb9-47dc-aff5-b2b926ca35b9'
    
    if not os.path.exists(zip_file_path):
        print(f"Error: ZIP file '{zip_file_path}' not found")
        sys.exit(1)
    
    print(f"\nReading ZIP file...")
    file_size = os.path.getsize(zip_file_path)
    print(f"File size: {file_size / 1024 / 1024:.2f} MB")
    
    try:
        # Read and encode the ZIP file to base64
        with open(zip_file_path, 'rb') as f:
            file_data = f.read()
            base64_data = base64.b64encode(file_data).decode('utf-8')
        
        print(f"Base64 encoded size: {len(base64_data)} characters")
        
        # Prepare the request payload
        payload = {
            "fileData": base64_data,
            "filename": "modx-bootstrap-site.zip"
        }
        
        print(f"\nUploading to backend...")
        
        # Send POST request to backend
        response = requests.post(
            backend_url,
            json=payload,
            headers={'Content-Type': 'application/json'},
            timeout=300
        )
        
        # Check response status
        if response.status_code == 200:
            result = response.json()
            
            # Extract download URL
            if 'url' in result:
                download_url = result['url']
                print(f"\n✓ Upload successful!")
                print(f"\nDownload URL:")
                print(download_url)
                return download_url
            else:
                print("Error: No 'url' field in response")
                print(f"Response: {json.dumps(result, indent=2)}")
                sys.exit(1)
        else:
            print(f"Error: Upload failed with status code {response.status_code}")
            print(f"Response: {response.text}")
            sys.exit(1)
            
    except requests.exceptions.RequestException as e:
        print(f"Error making request to backend: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"Unexpected error: {e}")
        sys.exit(1)

if __name__ == '__main__':
    create_zip()
    url = upload_to_backend()
    
    # Clean output - just print the URL one more time
    print(f"\n{'='*80}")
    print("FINAL DOWNLOAD URL:")
    print(url)
    print(f"{'='*80}")
