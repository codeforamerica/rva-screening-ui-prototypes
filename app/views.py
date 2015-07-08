from flask import render_template
from app import app

templates = [
            {
                'slug': '',
                'description': '',
            }
        ]

@app.route("/", methods=["GET"])
def index():
    return render_template("index.html", templates=templates)

@app.route("/<template_slug>", methods=["GET"])
def template(template_slug):
    return render_template(template_slug + ".html")

