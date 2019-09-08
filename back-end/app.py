from Controller import index_cotroller as ctl
from flask import Flask, request, jsonify

if __name__ == "__main__":
    app = Flask(__name__, static_folder='static')

    @app.route('/')
    def index():
        return ctl.index()

    @app.route('/merchants')
    def merchants():
        return ctl.merchants()
    
    # Add route in here
    
    app.run()