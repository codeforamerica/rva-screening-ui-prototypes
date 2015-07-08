# RVA Screener UI Prototypes

This repository is used to prototype user interface ideas for **[rva-screening](https://github.com/codeforamerica/rva-screening)**. We use it to mock up multiple versions of some aspect of the user interface so that we can compare and decide on the appropriate implementation.

## What

This is a minimal Flask app with a constantly growing set of sass, css, and html files. The Flask app has an index page, at `/`, which uses the `app/templates/index.html` template and if you navigate to any other URL, it simply tries to render a corresponding template. For example, `/mytemplate` should render and return `app/templates/mytemplate.html`.

Static data for prototyping can be placed into `app/data.py`

## Why

To have a place to make multiple versions of UI components without cluttering the actual `rva-screening`

## Installation

The installation commands assume that you are using a UNIX-based command line, as found in the Terminal appplication on Mac and Linux operating systems.

0. Install [git](https://help.github.com/articles/set-up-git/) and create a [Github account](https://github.com).
1. Prepare [a programming environment for working on python web applications, including a python virtual environment](https://github.com/codeforamerica/howto/blob/master/Python-Virtualenv.md).
2. Install [node.js](https://github.com/codeforamerica/howto/blob/master/Node.js.md) and use `npm` to install `gulp` globally:

    ```
    sudo npm install --global gulp
    ```
3. Clone the repo

    ```
    git clone https://github.com/codeforamerica/rva-screening-ui-prototypes.git
    ```

4. `cd` into the project folder, activate the virtual environment, and install the dependencies

    ```
    cd rva-screening-ui-prototypes/
    source .venv/bin/activate # this assumes that you've set up a virtualenv
    make install
    ```
5. run the application

    ```
    make run
    ```

## Contributing

Keep in mind that this repo is only for UI ideas. If you'd like to contribute to the [RVA screening app](https://github.com/codeforamerica/rva-screening) directly, you should go there instead.

Once you have the code installed and running, edit or create templates and css or sass files. Use git and github to commit your work to a fork of the project, and create a pull request. Feel free to [email us](mailto:richmond@codeforamerica.org) if you'd like more guidance on how to contribute.

To add a new template:

1. make an template file in `app/templates/`, for example `app/templates/mynewtemplate.html`
2. list the slug with a description in `app/views.py`, for example:

    ```python
    # in app/views.py
    templates = [
                {
                    'slug': 'text_fields',
                    'description': 'Different ideas for simple text fields',
                },
                {
                    'slug': 'mynewtemplate',
                    'description': '3 proposals for a thing in the UI'
                }
            ]

    ```
