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
        long = float(request.args.get('long', None))
        lat = float(request.args.get('lat', None))

        storelist = ctl.search(text, long, lat)
        return jsonify(storelist)
    
    @app.route('/user')
    def user():
        user_id = request.args.get('user_id', None)
        long = float(request.args.get('long', None))
        lat = float(request.args.get('lat', None))
        return jsonify(ctl.user(user_id,long,lat))

    # Add route in here
    
    # app.run()
    app.run(host='0.0.0.0', port=80)