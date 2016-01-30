import sys

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect
)

app = Flask(__name__)
app.config.from_pyfile('settings/development_settings.cfg')


@app.route("/", methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/rapper')
def render_rapper():
    return render_template('rapper.html')


@app.route('/stage')
def render_stage():
    return render_template('stage.html')


@app.route('/api/send')
def api_sendessage():
    """
    send OSC message to rap server
    """
    message = request.args.get('message')
    print "I hear you say %s" % message
    return jsonify(status="success")


if __name__ == "__main__":
    app.run(port=6789, host='0.0.0.0', debug='--debug' in sys.argv)
