import random


class TicTacToe(object):

    def __init__(self, playerX, playerO):
        self.board = [' ']*9
        self.playerX, self.playerO = playerX, playerO
        self.playerX_turn = random.choice([True, False])
        self.status = False

    def train(self):
        self.playerX.start_game('X')
        self.playerO.start_game('O')
        while True:
            if self.playerX_turn:
                player, char, other_player = self.playerX, 'X', self.playerO
            else:
                player, char, other_player = self.playerO, 'O', self.playerX
            if player.breed == 'human':
                self.display_board()
            space = player.move(self.board, -1)
            if self.board[space - 1] != ' ':
                player.reward(-99, self.board)
                break
            self.board[space - 1] = char
            if self.player_wins(char):
                player.reward(1, self.board)
                other_player.reward(-1, self.board)
                break
            if self.board_full():
                player.reward(0.5, self.board)
                other_player.reward(0.5, self.board)
                break
            other_player.reward(0, self.board)
            self.playerX_turn = not self.playerX_turn

    def play_game(self, idx, first):

        if first:
            player, char, other_player = self.playerO, 'O', self.playerX
            space = player.move(self.board, -1)
            self.board[space-1] = char
            self.playerX_turn = not self.playerX_turn
        else:
            cnt = 0
            while True:
                cnt += 1
                if self.playerX_turn:
                    player, char, other_player = self.playerX, 'X', self.playerO
                else:
                    player, char, other_player = self.playerO, 'O', self.playerX

                space = player.move(self.board, idx)
                if self.board[space-1] != ' ':
                    player.win = False
                    other_player.win = True
                    self.status = True
                    break
                self.board[space - 1] = char
                if self.player_wins(char):
                    player.win = True
                    other_player.win = False
                    self.status = True

                if self.board_full():
                    self.status = True
                    break

                self.playerX_turn = not self.playerX_turn

                if cnt == 2:
                    break

    def player_wins(self, char):
        for a, b, c in [(0, 1, 2), (3, 4, 5), (6, 7, 8),
                        (0, 3, 6), (1, 4, 7), (2, 5, 8),
                        (0, 4, 8), (2, 4, 6)]:
            if char == self.board[a] == self.board[b] == self.board[c]:
                return True
        return False

    def board_full(self):
        return not any([space == ' ' for space in self.board])

    def display_board(self):
        row = " {} | {} | {}"
        hr = "\n------------\n"
        print(row.format(self.board[0], self.board[1], self.board[2]) + hr +
              row.format(self.board[3], self.board[4], self.board[5]) + hr +
              row.format(self.board[6], self.board[7], self.board[8]) + hr)

    def reset(self, playerX, playerO):
        self.board = [' '] * 9
        self.playerX, self.playerO = playerX, playerO
        self.playerX_turn = random.choice([True, False])
        self.status = False


class Player(object):

    def __init__(self):
        self.breed = "human"
        self.win = False

    def start_game(self, char):
        pass

    def move(self, board, idx):
        return idx

    def reward(self, value, board):
        pass

    def available_moves(self, board):
        return [i+1 for i in range(9) if board[i] == ' ']


class QLearningPlayer(Player):

    def __init__(self, epsilon=0.2, alpha=0.3, gamma=0.9):
        self.breed = "Qlearner"
        self.harm_humans_ = False
        self.q = {}
        self.epsilon = epsilon
        self.alpha = alpha
        self.gamma = gamma
        self.last_board = None
        self.last_move = None
        self.win = False

    def set_q(self, q):
        self.q = q

    def start_game(self, char):
        self.last_board = (' ',)*9
        self.last_move = None

    def getQ(self, state, action):
        if not (state, action) in self.q:
            self.q[(state, action)] = 1.0
        return self.q.get((state, action))

    def move(self, board, idx):
        self.last_board = tuple(board)
        actions = self.available_moves(board)

        if random.random() < self.epsilon:
            self.last_move = random.choice(actions)
            return self.last_move
        qs = [self.getQ(self.last_board, a) for a in actions]
        maxQ = max(qs)

        if qs.count(maxQ) > 1:
            best_options = [i for i in range(len(actions)) if qs[i] == maxQ]
            i = random.choice(best_options)
        else:
            i = qs.index(maxQ)

        self.last_move = actions[i]
        return actions[i]

    def reward(self, value, board):
        if self.last_move:
            self.learn(self.last_board, self.last_move, value, tuple(board))

    def learn(self, state, action, reward, result_state):
        prev = self.getQ(state, action)
        qlist = [self.getQ(result_state, a) for a in self.available_moves(result_state)]
        if len(qlist) > 0:
            maxqnew = max(qlist)
        else:
            maxqnew = 0
        self.q[(state, action)] = prev + self.alpha * ((reward + self.gamma*maxqnew) - prev)
