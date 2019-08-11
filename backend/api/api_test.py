import unittest
import api
import sys
import json
import random


class TestGetAPIClient(unittest.TestCase):

    def setUp(self):
        self.app = api.app.test_client()

    def test_best_action(self):
        res = self.app.post("/api/play", data=json.dumps(dict(
            board=["X", "X", "O", " ", "O", " ", " ", " ", " "],
            char="X"
        )), content_type="application/json")

        data = json.loads(res.data)
        assert res.status_code == 200
        assert data["result"]["agent_wins"] is True
        assert data["result"]["end"] is True
        assert data["result"]["draw"] is False

    def test_agent_win(self):
        res = self.app.post("/api/play", data=json.dumps(dict(
            board=["X", "X", " ", " ", "O", " ", "O", "O", " "],
            char="O"
        )), content_type="application/json")
        data = json.loads(res.data)
        assert res.status_code == 200
        assert data["result"]["agent_wins"] is True
        assert data["result"]["end"] is True
        assert data["result"]["draw"] is False

    def test_draw(self):
        res = self.app.post("/api/play", data=json.dumps(dict(
            board=["X", "O", "O", "O", "O", "X", "X", "X", "O"],
            char="X"
        )), content_type="application/json")

        data = json.loads(res.data)
        assert res.status_code == 200
        assert data["result"]["agent_wins"] is False
        assert data["result"]["end"] is True
        assert data["result"]["draw"] is True

    def test_game_over(self):
        res = self.app.post("/api/play", data=json.dumps(dict(
            board=["X", "O", "O", "X", "O", " ", "X", " ", " "],
            char="X"
        )), content_type='application/json')

        data = json.loads(res.data)
        assert res.status_code == 200
        assert data["result"]["agent_wins"] is False
        assert data["result"]["end"] is True
        assert data["result"]["draw"] is False

if __name__ == '__main__':
    unittest.main()
