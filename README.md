# Marubatsu AI

Marubatsu AI is a tic-tac-toe game with the agent trained by reinforcement learning.

# Demo

You can play the game with the AI opponent as follows.

<img src="./pics/demo.gif"/>

# Requirement

* docker and docker-compose

# Usage

Currently, you can play the game on the localhost only.

```bash
$ echo "REACT_APP_API_URL=http://localhost:5000" > frontend/code/.env # you need to execute this command at first time.
$ docker-compose up --build
```
Check http://localhost:3000

# Note

I used simple Q-learning for training (See the following equation and [python file](backend/rl/qlearn.py)).

<img src="./pics/q-learning.png">

# Licence

Marubatsu AI is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).