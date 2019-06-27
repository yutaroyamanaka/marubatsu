from qlearn import TicTacToe, QLearningPlayer
import pickle

if __name__ == '__main__':
    p1 = QLearningPlayer()
    p2 = QLearningPlayer()

    for i in range(100000):
        t = TicTacToe(p1, p2)
        t.train()

    # pickle Q-learning parameter
    with open("./q-param.pickle", "wb") as f:
        pickle.dump(p2.q, f)
