## まるばつAI

強化学習の手法の一つQ-learningによって学習したエージェントと戦う三目並べゲーム。
いずれは、ユーザーが盤面の大きさや、何個並べれば勝ちなのかなどのルールを動的に決めさせるゲームにする。

今はこんな感じ

<img src="./pics/abstract.png"/>


実際のプレイ画面
<img src="pics/tictactoe.gif"/>

### 動かす

using docker-compose

```
# top directory of thie repository
$ docker network create my_network
$ docker-compose -f ./docker-compose-production.yml up --build
```

### アーキテクチャ

現在は、dockerで動かしている。
将来的には、Appコンテナの前に、プロキシサーバーのコンテナを置くのが良いのだろうか？

<img src="./pics/product.jpeg"/>


### Q学習

<img src="./pics/q-learning.png"/>
