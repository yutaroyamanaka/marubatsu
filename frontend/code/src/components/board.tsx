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
    handleOnClick(cmd : string):void;
}

function StartButton(Props: buttonProps) {
    const classes = useStyles();

    return(
        <Button variant="contained" color="secondary" className={classes.button} onClick={() => Props.handleOnClick("start")}>
        Start !
      </Button>
    )
}


function ResetButton(Props: buttonProps) {
    const classes = useStyles();

    return (
        <Button variant="contained" color="primary" className={classes.button} onClick={() => Props.handleOnClick("reset")}>
        Reset !
      </Button>
    )
}



interface Props {}

interface State {
    board: Array<string>,
    finish: boolean,
    player1Win: boolean,
    player2Win: boolean,
    start: boolean,
    reset: boolean,
    message: string
}

export default class Board extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            board: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
            finish: false,
            player1Win: false,
            player2Win: false,
            start: false,
            reset: true,
            message: "",
        };
        this.handleOnClick = this.handleOnClick.bind(this);
        this.judgeAvailability = this.judgeAvailability.bind(this);
        this.setRock = this.setRock.bind(this);
    }

    handleOnClick(cmd: string) : void {
        if (cmd === "start" && this.state.reset){
            fetch('/api/start', {
                mode: 'cors',
            })
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        board: res["board"],
                        finish: res["finish"],
                        player1Win: res["player1-win"],
                        player2Win: res["player2-win"],
                        start: true,
                        reset: false,
                    })
                })
        } else if(cmd === "reset"){
            fetch('/api/reset', {
                mode: 'cors',
            })
                .then(res => res.json())
                .then(res => {
                    let message = "";
                    if (res["turn"]) message = "あなたは先攻!";
                    else message = "あなたは後攻！";
                    this.setState({
                        message: message,
                        board: res["board"],
                        start: false,
                        reset: true
                    })
                });
        }


    }


    setRock(index: number): void {
        let board = this.state.board;
        if (this.state.start && !this.state.finish) {
            if (board[index-1] !== " ") {
                alert("そこには置けません！")
            } else{
                board[index-1] = 'X';
                this.setState({
                    board: board,
                });

                fetch('/api/play', {
                    method: "POST",
                    mode: 'cors',
                    body: JSON.stringify({"idx": index}),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                .then( res => {
                    if(res["finish"]) this.setState({
                        start: false
                    });

                    this.setState({
                        board: res["board"],
                        finish: res["finish"],
                        player1Win: res["player1-win"],
                        player2Win: res["player2-win"]
                    });

                    if(res["finish"] && res["player1-win"]) {
                        this.setState({
                            message: "あなたの勝ち!"
                        })
                    } else if(res["finish"] && res["player2-win"]){
                        this.setState({
                            message: "あなたの負け!"
                        })
                    } else if(res["finish"]){
                        this.setState({
                            message: "引き分け!"
                        })
                    }
                })
            }
        }

    }

    judgeAvailability(rock: string) : boolean {
        if(rock === " ") return true;
        else return false;
    }


    render() {
        return(
            <div>
                <Message message={this.state.message}/>
                <div className="board-row">
                <Square index={1} rock={this.state.board[0]} available={this.judgeAvailability(this.state.board[0])} setRock={() => this.setRock(1)}/>
                <Square index={2} rock={this.state.board[1]} available={this.judgeAvailability(this.state.board[1])} setRock={() => this.setRock(2)}/>
                <Square index={3} rock={this.state.board[2]} available={this.judgeAvailability(this.state.board[2])} setRock={() => this.setRock(3)}/>
                </div>
                <div className="board-row">
                <Square index={4} rock={this.state.board[3]} available={this.judgeAvailability(this.state.board[3])} setRock={() => this.setRock(4)}/>
                <Square index={5} rock={this.state.board[4]} available={this.judgeAvailability(this.state.board[4])} setRock={() => this.setRock(5)}/>
                <Square index={6} rock={this.state.board[5]} available={this.judgeAvailability(this.state.board[5])} setRock={() => this.setRock(6)}/>
                </div>
                <div className="board-row">
                <Square index={7} rock={this.state.board[6]} available={this.judgeAvailability(this.state.board[6])} setRock={() => this.setRock(7)}/>
                <Square index={8} rock={this.state.board[7]} available={this.judgeAvailability(this.state.board[7])} setRock={() => this.setRock(8)}/>
                <Square index={9} rock={this.state.board[8]} available={this.judgeAvailability(this.state.board[8])} setRock={() => this.setRock(9)}/>
                </div>
                <StartButton handleOnClick={() => this.handleOnClick("start")}/>
                <ResetButton handleOnClick={() => this.handleOnClick("reset")}/>
            </div>

        )
    }
}