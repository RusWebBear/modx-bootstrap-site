#!/usr/bin/env python3
import os
import sys
import base64
import json
import subprocess

def main():
    # Step 1: Create ZIP
    print("Step 1: Creating ZIP archive...", file=sys.stderr)
    
    if os.path.exists('modx-bootstrap-site.zip'):
        os.remove('modx-bootstrap-site.zip')
    
    excludes = [
        "node_modules/*", ".git/*", "*.env*", "dist/*", "dist-ssr/*",
        "builds/*", "*.log", ".vscode/*", ".idea/*", "*.DS_Store",
        "*.local", "*.py", "*.sh", "modx-bootstrap-site.zip"
    ]
    
    cmd = ['zip', '-r', '-q', 'modx-bootstrap-site.zip', '.']
    for ex in excludes:
        cmd.extend(['-x', ex])
    
    subprocess.run(cmd, check=True)
    
    size_mb = os.path.getsize('modx-bootstrap-site.zip') / 1024 / 1024
    print(f"ZIP created: {size_mb:.2f} MB", file=sys.stderr)
    
    # Step 2: Read and encode
    print("Step 2: Reading and encoding...", file=sys.stderr)
    with open('modx-bootstrap-site.zip', 'rb') as f:
        b64 = base64.b64encode(f.read()).decode('utf-8')
    
    print(f"Encoded: {len(b64)} chars", file=sys.stderr)
    
    # Step 3: Upload
    print("Step 3: Uploading to S3...", file=sys.stderr)
    
    import requests
    resp = requests.post(
        'https://functions.poehali.dev/e1b575eb-5eb9-47dc-aff5-b2b926ca35b9',
        json={'fileData': b64, 'filename': 'modx-bootstrap-site.zip'},
        timeout=300
    )
    
    if resp.status_code != 200:
        print(f"Error: {resp.status_code} - {resp.text}", file=sys.stderr)
        sys.exit(1)
    
    result = resp.json()
    
    if 'url' not in result:
        print(f"Error: No URL in response: {result}", file=sys.stderr)
        sys.exit(1)
    
    # Output ONLY the URL
    print(result['url'])

if __name__ == '__main__':
    main()
