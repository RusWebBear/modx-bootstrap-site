import json
import os
import boto3
import base64


def handler(event: dict, context) -> dict:
    """Загружает ZIP архив в S3 и возвращает ссылку для скачивания"""
    
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    # Получаем данные из запроса
    body = json.loads(event.get('body', '{}'))
    file_data = body.get('fileData')  # base64
    filename = body.get('filename', 'archive.zip')
    
    if not file_data:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'No file data provided'})
        }
    
    # Декодируем base64
    file_bytes = base64.b64decode(file_data)
    
    # Настраиваем S3 клиент
    s3 = boto3.client('s3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
    )
    
    # Загружаем файл
    key = f'archives/{filename}'
    s3.put_object(
        Bucket='files',
        Key=key,
        Body=file_bytes,
        ContentType='application/zip'
    )
    
    # Формируем CDN URL
    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'success': True,
            'url': cdn_url,
            'filename': filename,
            'size': len(file_bytes)
        })
    }
