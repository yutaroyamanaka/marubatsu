from flask import Flask, request, jsonify
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from rl.stateless import Game
import pickle
from flask_cors import CORS

app = Flask(__name__)
# Cross-origin enabled
CORS(app)

with open(os.environ["PICKLE_PATH"], "rb") as f:
    q = pickle.load(f)

game = Game(q)

@app.route("/api/play", methods=["POST"])
def play():
    try:
        json = request.get_json()
        board = json["board"]
        char = json["char"]
        board, result = game.play(board, char)

        res = {
            "board": board,
            "result": result
        }
        return jsonify(res), 200
    except Exception as e:
        result = error_handler(e)
        return result

def error_handler(error):
    response = jsonify({
                          "error": {
                          "message": str(error)
                          }
                      })
    return response, 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
