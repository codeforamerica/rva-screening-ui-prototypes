import os
from flask import Flask
from .config import Config
from flask.ext.babel import Babel


app = Flask(__name__, static_url_path='')

app.config.from_object(Config)
app.secret_key = app.config['SECRET_KEY']
app.debug = True

babel = Babel(app)


@app.context_processor
def inject_template_constants():
    """Adds variables to template context.
    """
    from app import data
    return dict(
        DATA=data,
    )

from app import views

