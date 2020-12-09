import * as React from 'react';
import Square from './square';
import Button from '@material-ui/core/Button';
import { makeStyles} from '@material-ui/core/styles';
import Message from './message';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

interface buttonProps {
    initializeGame(): void
}

function InitButton(Props: buttonProps) {
    const classes = useStyles();

    return(
        <Button variant="contained" color="secondary" className={classes.button} onClick={() => Props.initializeGame()}>
        Start !
      </Button>
    )
}

interface Props {}

interface State {
    board: Array<string>,
    start: boolean,
    message: string,
    turn: boolean,
    lock: boolean,
    mark: string,
}

export default class Board extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            board: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
            start: false,
            message: "",
            turn: Math.random() > 0.5,
            lock: true,
            mark: "",
        };

        this.initializeGame = this.initializeGame.bind(this);
        this.setRock = this.setRock.bind(this);
    }


    async initializeGame() {
        this.setState({
            board: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
            turn: Math.random() > 0.5,
        });

        if (this.state.turn) {
            /* 人間が最初にプレーする。 */
            this.setState({
                message: "You are a first player",
                lock: false,
                mark: "O",
                start: true,
            })
        } else {

            let res = await fetch(process.env.REACT_APP_API_URL + '/api/play', {
                    mode: 'cors',
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        board: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
                        char: 'X',
                    })
                });

            let result = await res.json();
            this.setState({
                message: "You are a second player",
                board: result["board"],
                lock: false,
                mark: "X",
                start: true,
            })

        }
    }


    async setRock(index: number) {
        if(!this.state.lock && this.state.start) {
            if(this.state.board[index-1] === " ") {
                let board = this.state.board;
                let mark = this.state.mark;

                board[index-1] = mark;

                this.setState({
                    board: board,
                    /* 他の面が押せないようにロック */
                    lock: true,
                    message: "",
                });


                let res = await fetch(process.env.REACT_APP_API_URL + '/api/play', {
                    mode: 'cors',
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        board: board,
                        char: mark,
                    })
                });

                let data = await res.json();
                console.log(data);

                if (data["result"]["end"]) {
                    /* ゲーム終了 */
                    if(data["result"]["draw"]) {
                        this.setState({
                            board: data["board"],
                            message: "Draw",
                            lock: true,
                        });
                    } else if(data["result"]["agent_wins"]) {
                        this.setState({
                            board: data["board"],
                            message: "You lose!",
                            lock: true,
                        })
                    } else {
                        this.setState({
                            board: data["board"],
                            message: "You win!",
                            lock: true,
                        })
                    }
                } else{
                    if(this.isAvailable(data["board"])){
                        this.setState({
                        board: data["board"],
                            /* ロックを解除する */
                        lock: false,
                        })
                    } else {
                        this.setState({
                        board: data["board"],
                            /* ロックを解除する */
                        message: "引き分けです！",
                        lock: true,
                        })
                    }
                }
            }
        }
    }

    isAvailable(board: Array<string>): boolean {
        return board.includes(" ")
    }


    render() {
        return(
            <div>
                <Message message={this.state.message}/>
                <div className="board-row">
                <Square index={1} rock={this.state.board[0]} setRock={() => this.setRock(1)}/>
                <Square index={2} rock={this.state.board[1]} setRock={() => this.setRock(2)}/>
                <Square index={3} rock={this.state.board[2]} setRock={() => this.setRock(3)}/>
                </div>
                <div className="board-row">
                <Square index={4} rock={this.state.board[3]} setRock={() => this.setRock(4)}/>
                <Square index={5} rock={this.state.board[4]} setRock={() => this.setRock(5)}/>
                <Square index={6} rock={this.state.board[5]} setRock={() => this.setRock(6)}/>
                </div>
                <div className="board-row">
                <Square index={7} rock={this.state.board[6]} setRock={() => this.setRock(7)}/>
                <Square index={8} rock={this.state.board[7]} setRock={() => this.setRock(8)}/>
                <Square index={9} rock={this.state.board[8]} setRock={() => this.setRock(9)}/>
                </div>
                <InitButton initializeGame={() => this.initializeGame()}/>
            </div>

        )
    }
}
