from Controller import index_cotroller as ctl
from flask import Flask, request, jsonify

if __name__ == "__main__":
    app = Flask(__name__, static_folder='static')

    @app.route('/')
    def index():
        return ctl.index()

    @app.route('/predict')
    def merchants():
        page = int(request.args.get('page', None))
        long = float(request.args.get('long', None))
        lat = float(request.args.get('lat', None))
        storelist = sorted(ctl.cate(long,lat,page), key= lambda d: d['km'])
        return jsonify(storelist[0:50])

    @app.route('/search')
    def search():
        text = request.args.get('text', None)
        page = request.args.get('page', None)
        long = float(request.args.get('long', None))
        lat = float(request.args.get('lat', None))

        storelist = ctl.search(text, long, lat,page)
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