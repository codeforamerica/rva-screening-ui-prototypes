from flask import render_template
from app import app

templates = {
        'text_fields': 'Different ideas for simple text fields',
        'mockup_justsearch': 'A page with ONLY search on it.',
        'mockup_viewpatients': 'A page with ONLY view patients',
        'mockup_searchandpatients': 'Mockup of a page with search and view patients',
        'patient_details': 'A direct HTML copy of patient details from rva-screening',
        'search_noresults': 'An example of an expanded search without any results',
        'search_results': 'An example of expanded search with some results',
        'search_results2': 'Expanded search with add a patient on the right-hand side.',
        'search_searching': 'An example of expanded search performing a search',
        'landing': 'A working version of the landing page after a user logs into the app',
        'mockup_checkbox': 'Different examples of checkboxes'
        }

@app.route("/", methods=["GET"])
def index():
    return render_template("index.html", templates=templates)

@app.route("/<template_slug>", methods=["GET"])
def template(template_slug):
    return render_template(template_slug + ".html", slug=template_slug)

