import random
import copy

class Game(object):

    def __init__(self, q):
        self.q = q

    # ボード, 勝敗ついたかどうか、エージェントの勝ち負けを返す
    def play(self, board, human):
        agent = "O" if human == "X" else "X"
        if self.player_wins(board, human):
            # エージェントの負け
            result = {"agent_wins": False, "end": True, "draw": False}
            return board, result
        else:
            actions = self.available_moves(board)
            processed = board[:]

            if len(actions) == 0:
                result = {"agent_wins": False, "end": True, "draw": True}
                return board, result

            # 順序対策
            if agent == 'X':
                for i in range(len(board)):
                    if board[i] == 'O':
                        board[i] = 'X'
                        continue
                    elif board[i] == 'X':
                        board[i] = 'O'
                        continue

            qs = [self.getQ(tuple(board), a) for a in actions]
            maxQ = max(qs)

            if qs.count(maxQ) > 1:
                best_options = [i for i in range(len(actions)) if qs[i] == maxQ]
                i = random.choice(best_options)
            else:
                i = qs.index(maxQ)
            processed[actions[i] - 1] = agent

            if self.player_wins(processed, agent):
                # エージェントの勝ち
                result = {"agent_wins": True, "end": True, "draw": False}
                return processed, result

            result = {"agent_wins": False, "end": False, "draw": False}
            return processed, result

    @staticmethod
    def available_moves(board):
        return [i+1 for i in range(9) if board[i] == ' ']

    def getQ(self, state, action):
        if not (state, action) in self.q:
            self.q[(state, action)] = 1.0
        return self.q.get((state, action))

    @staticmethod
    def player_wins(board, char):
        for a, b, c in [(0, 1, 2), (3, 4, 5), (6, 7, 8),
                        (0, 3, 6), (1, 4, 7), (2, 5, 8),
                        (0, 4, 8), (2, 4, 6)]:
            if char == board[a] == board[b] == board[c]:
                return True
        return False
