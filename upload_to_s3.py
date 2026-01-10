#!/usr/bin/env python3
"""
Upload ZIP archive to S3 storage
"""
import os
import sys
import boto3
from botocore.exceptions import ClientError, NoCredentialsError

def upload_to_s3():
    # Get AWS credentials from environment
    aws_access_key_id = os.environ.get('AWS_ACCESS_KEY_ID')
    aws_secret_access_key = os.environ.get('AWS_SECRET_ACCESS_KEY')
    
    if not aws_access_key_id or not aws_secret_access_key:
        print("Error: AWS credentials not found in environment variables")
        print("Please set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY")
        sys.exit(1)
    
    # Configuration
    file_path = 'modx-bootstrap-site.zip'
    bucket_name = 'files'
    s3_key = 'archives/modx-bootstrap-site.zip'
    endpoint_url = 'https://bucket.poehali.dev'
    content_type = 'application/zip'
    
    # Check if file exists
    if not os.path.exists(file_path):
        print(f"Error: File '{file_path}' not found")
        sys.exit(1)
    
    print(f"Uploading {file_path} to S3...")
    print(f"Bucket: {bucket_name}")
    print(f"Key: {s3_key}")
    print(f"Endpoint: {endpoint_url}")
    
    try:
        # Create S3 client with custom endpoint
        s3_client = boto3.client(
            's3',
            endpoint_url=endpoint_url,
            aws_access_key_id=aws_access_key_id,
            aws_secret_access_key=aws_secret_access_key
        )
        
        # Upload file
        s3_client.upload_file(
            file_path,
            bucket_name,
            s3_key,
            ExtraArgs={
                'ContentType': content_type
            }
        )
        
        print("Upload successful!")
        
        # Generate CDN URL
        cdn_url = f"https://cdn.poehali.dev/projects/{aws_access_key_id}/bucket/{s3_key}"
        print(f"\nDownload URL:")
        print(cdn_url)
        
        return cdn_url
        
    except NoCredentialsError:
        print("Error: AWS credentials are invalid")
        sys.exit(1)
    except ClientError as e:
        print(f"Error uploading to S3: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"Unexpected error: {e}")
        sys.exit(1)

if __name__ == '__main__':
    upload_to_s3()
