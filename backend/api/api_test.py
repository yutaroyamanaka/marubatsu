import unittest
import api
import sys
import json
import random
sys.path.append("/marubatsu/backend/")


class TestGetAPIClient(unittest.TestCase):

    def setUp(self):
        self.app = api.app.test_client()

    def test_start(self):
        res = self.app.get("/api/start")
        data = json.loads(res.data)
        assert res.status_code == 200
        assert data["finish"] is False
        assert data["player1-win"] is False
        assert data["player2-win"] is False

    def test_reset(self):
        res = self.app.get("/api/reset")
        data = json.loads(res.data)
        assert res.status_code == 200
        self.assertNotIn('X', data["board"])
        self.assertNotIn('O', data["board"])


class TestPlayAPI(unittest.TestCase):

    def setUp(self):
        self.app = api.app.test_client()
        self.app.get("/api/reset")
        self.app.get("/api/start")

    def test_play_same_moves(self):
        board = json.loads((self.app.get("/api/board/info")).data)["board"]
        choice = random.choice([i+1 for i in range(len(board)) if board[i] == ' '])
        res = self.app.post("/api/play", data=json.dumps(dict(
            idx=str(choice)
        )), content_type='application/json')
        data = json.loads(res.data)
        assert res.status_code == 200
        assert data["board"][choice-1] == 'X'

        res = self.app.post("/api/play", data=json.dumps(dict(
            idx=str(choice)
        )), content_type='application/json')
        assert res.status_code == 500


if __name__ == '__main__':
    unittest.main()