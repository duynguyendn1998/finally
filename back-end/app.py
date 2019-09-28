from Controller import index_cotroller as ctl
from flask import Flask, request, jsonify

if __name__ == "__main__":
    app = Flask(__name__, static_folder='static')

    @app.route('/')
    def index():
        return ctl.index()

    @app.route('/predict')
    def merchants():
        storelist = sorted(ctl.cate(), key= lambda d: ctl.distance(float(d["longitude"]), float(d["latitude"]), 103.5, 1.2))
        return jsonify(storelist[0:10])

    @app.route('/search')
    def search():
        text = request.args.get('text', None)
        assert text is not None
        storelist = sorted(ctl.search(text), key= lambda d: ctl.distance(float(d["longitude"]), float(d["latitude"]), 103.5, 1.2))
        return jsonify(storelist[0:5])
    
    # Add route in here
    
    app.run()