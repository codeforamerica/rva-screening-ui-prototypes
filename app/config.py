import os

class Config(object):
    SECRET_KEY = 'some-secret'
    PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))

    AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
    S3_FILE_UPLOAD_DIR = 'uploads'
    S3_BUCKET_NAME = os.environ.get('S3_BUCKET_NAME', 'rva-screener-ui')
    S3_ONLY_MODIFIED = False
