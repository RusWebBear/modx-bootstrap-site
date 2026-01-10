#!/usr/bin/env python3
"""
Upload ZIP archive to S3 via backend function
"""
import os
import sys
import base64
import json
import requests

def upload_to_backend():
    # Configuration
    zip_file_path = 'modx-bootstrap-site.zip'
    backend_url = 'https://functions.poehali.dev/e1b575eb-5eb9-47dc-aff5-b2b926ca35b9'
    
    # Check if ZIP file exists
    if not os.path.exists(zip_file_path):
        print(f"Error: ZIP file '{zip_file_path}' not found in current directory")
        print("Please create the ZIP file first")
        sys.exit(1)
    
    print(f"Reading ZIP file: {zip_file_path}")
    file_size = os.path.getsize(zip_file_path)
    print(f"File size: {file_size / 1024 / 1024:.2f} MB")
    
    # Read and encode the ZIP file to base64
    try:
        with open(zip_file_path, 'rb') as f:
            file_data = f.read()
            base64_data = base64.b64encode(file_data).decode('utf-8')
        
        print(f"Base64 encoded size: {len(base64_data)} characters")
        
        # Prepare the request payload
        payload = {
            "fileData": base64_data,
            "filename": "modx-bootstrap-site.zip"
        }
        
        print(f"\nUploading to backend: {backend_url}")
        
        # Send POST request to backend
        response = requests.post(
            backend_url,
            json=payload,
            headers={'Content-Type': 'application/json'},
            timeout=300  # 5 minutes timeout for large files
        )
        
        # Check response status
        if response.status_code == 200:
            result = response.json()
            print("\nUpload successful!")
            print(f"Response: {json.dumps(result, indent=2)}")
            
            # Extract download URL
            if 'url' in result:
                download_url = result['url']
                print(f"\n{'='*60}")
                print(f"Download URL:")
                print(download_url)
                print(f"{'='*60}")
                return download_url
            else:
                print("Warning: No 'url' field in response")
                return None
        else:
            print(f"Error: Upload failed with status code {response.status_code}")
            print(f"Response: {response.text}")
            sys.exit(1)
            
    except FileNotFoundError:
        print(f"Error: File '{zip_file_path}' not found")
        sys.exit(1)
    except requests.exceptions.RequestException as e:
        print(f"Error making request to backend: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"Unexpected error: {e}")
        sys.exit(1)

if __name__ == '__main__':
    upload_to_backend()
