#!/bin/bash

# Create ZIP archive of MODX project files
echo "Creating ZIP archive..."

# Remove old ZIP if exists
rm -f modx-bootstrap-site.zip

# Create ZIP with exclusions
zip -r modx-bootstrap-site.zip . \
  -x "node_modules/*" \
  -x ".git/*" \
  -x "*.env*" \
  -x "dist/*" \
  -x "dist-ssr/*" \
  -x "builds/*" \
  -x "*.log" \
  -x ".vscode/*" \
  -x ".idea/*" \
  -x "*.DS_Store" \
  -x "create_and_upload.sh" \
  -x "upload.py" \
  -x "upload_to_s3.py" \
  -x "*.local"

if [ ! -f modx-bootstrap-site.zip ]; then
    echo "Error: Failed to create ZIP file"
    exit 1
fi

echo "ZIP archive created successfully"
ls -lh modx-bootstrap-site.zip

# Upload using Python script
echo ""
echo "Uploading to S3..."
python3 upload_via_backend.py
