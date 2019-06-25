## marubatsu

強化学習のQ-learningによって学習したエージェントと戦う三目並べゲーム。
いずれは、n目並べなどの複雑な状況にもしていく

### set up

backend

```
# from backend direcotry
$ docker build -t marubatsu-backend -f ./Dockerfile .
$ docker run -it -p 8888:8888 marubatsu-backend 
```
