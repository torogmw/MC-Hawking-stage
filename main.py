import sys

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect
)

from interface import send_lyrics, receive_lyrics, stash_lyrics

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
    send_lyrics(message)
    return jsonify(status="success")


@app.route('/api/stash', methods=['POST'])
def api_stashmessage():
    """
    save message to queue for visualize
    """
    msg = request.form['message']
    stash_lyrics(msg)
    return jsonify(status="success")


@app.route('/api/visualize')
def api_getmessage():
    """
    recieve OSC message from rap server
    """
    message = receive_lyrics()
    if message != "":
        return jsonify(ready=True, msg=message)
    else:
        return jsonify(ready=False)


if __name__ == "__main__":
    app.run(port=6789, host='0.0.0.0', debug='--debug' in sys.argv)
