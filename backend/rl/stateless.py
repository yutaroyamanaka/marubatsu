import random


class Game(object):

    def __init__(self, q):
        self.q = q

    # ボード, 勝敗ついたかどうか、エージェントの勝ち負けを返す
    def play(self, board, com):
        other = "O" if com == "X" else "X"
        if self.player_wins(board, other):
            # エージェントの負け
            return board, True, False
        else:
            actions = self.available_moves(board)
            qs = [self.getQ(tuple(board), a) for a in actions]
            
            maxQ = max(qs)

            if qs.count(maxQ) > 1:
                best_options = [i for i in range(len(actions)) if qs[i] == maxQ]
                i = random.choice(best_options)
            else:
                i = qs.index(maxQ)
            board[actions[i] - 1] = other

            if self.player_wins(board, other):
                # エージェントの勝ち
                return board, True, True
            return board, False, False

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
