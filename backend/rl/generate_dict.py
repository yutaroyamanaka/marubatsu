from qlearn import TicTacToe, QLearningPlayer
import pickle

if __name__ == '__main__':
    p1 = QLearningPlayer()
    p2 = QLearningPlayer()

    for i in range(10000):
        t = TicTacToe(p1, p2)
        t.play_game()

    # pickle Q-learning parameter
    with open("./q-param.pickle", "wb") as f:
        pickle.dump(p1.q, f)
