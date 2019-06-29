## marubatsu

強化学習のQ-learningによって学習したエージェントと戦う三目並べゲーム。
いずれは、n目並べなどの複雑な状況にもしていく

今はこんな感じ

<img src="pics/tictactoe.gif"/>

### ローカルで動かす

using docker-compose

```
$ docker-compose up --build
```

### アーキテクチャ

現在は、dockerで動かしている。
将来的には、Appコンテナの前に、プロキシサーバーのコンテナを置くのが良いのだろうか？

<img src="./pics/arch-local.jpeg"/>


### Q学習

<img src="./pics/q-learning.png"/>
