from flask import Flask, request, jsonify
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from rl.qlearn import TicTacToe, QLearningPlayer, Player
import pickle
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
player1 = Player()
player2 = QLearningPlayer(epsilon=0)


with open(os.environ["PICKLE_PATH"], "rb") as f:
    dic = pickle.load(f)
    player2.set_q(dic)
ttt = TicTacToe(player1, player2)


@app.route("/api/start", methods=["GET"])
def start():
    try:
        if not ttt.playerX_turn:
            ttt.play_game(-1, True)
        res = {
            "board": ttt.board,
            "finish": ttt.status,
            "player1-win": player1.win,
            "player2-win": player2.win,
        }
        return jsonify(res), 200

    except Exception as e:
        result = error_handler(e)
        return result


@app.route("/api/play", methods=["POST"])
def play():
    try:
        json = request.get_json()
        idx = int(json["idx"])
        if idx in player1.available_moves(ttt.board):
            ttt.play_game(idx, False)
            res = {
                "board": ttt.board,
                "finish": ttt.status,
                "player1-win": player1.win,
                "player2-win": player2.win,
            }
            return jsonify(res), 200

        else:
            res = {
                "board": ttt.board,
                "error": {
                    "message": "You can't set point in {}".format(idx)
                }
            }
            return jsonify(res), 500

    except Exception as e:
        result = error_handler(e)
        return result


@app.route("/api/reset", methods=["GET"])
def reset():
    try:
        ttt.reset(player1, player2)
        player1.win = False
        player2.win = False
        res = {
            "board": ttt.board,
            "turn":  ttt.playerX_turn,
        }
        return jsonify(res), 200
    except Exception as e:
        result = error_handler(e)
        return result


@app.route("/api/board/info", methods=["GET"])
def board_info():
    return jsonify({"board": ttt.board}), 200


@app.route("/api/player/info/<user_id>", methods=["GET"])
def player_info(user_id):
    try:
        if int(user_id) == 1:
            res = {
                "breed": player1.breed,
                "q_size": 0,
            }
            return jsonify(res), 200
        elif int(user_id) == 2:
            res = {
                "breed": player2.breed,
                "q_size": len(player2.q),
            }
            return jsonify(res), 200
        else:
            res = {
                "error": "No user such as {}".format(user_id)
            }
            return jsonify(res), 404
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
    app.run()