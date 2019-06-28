import * as React from 'react';
import Square from './square';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

interface buttonProps {
    handleOnClick():void;
}

function SubmitButton(Props: buttonProps) {
    const classes = useStyles();

    return(
        <Button variant="contained" color="secondary" className={classes.button} onClick={() => Props.handleOnClick()}>
        Start !
      </Button>
    )
}

interface Props {}

interface State {
    board: Array<string>,
    finish: boolean,
    player1Win: boolean,
    player2Win: boolean,
}

export default class Board extends React.Component<Props, State> {

    constructor(props: any){
        super(props);
        this.state = {
            board: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
            finish: false,
            player1Win: false,
            player2Win: false,
        };
        this.handleOnClick = this.handleOnClick.bind(this);
        this.judgeAvailability = this.judgeAvailability.bind(this);
    }

    handleOnClick() {
        fetch('http://localhost:8888/api/reset', {
            mode: 'cors',
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
            });


        fetch('http://localhost:8888/api/start', {
            mode: 'cors',
        })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    board: response["board"],
                    finish: response["finish"],
                    player1Win: response["player1-win"],
                    player2Win: response["player2-win"]
                });
            });

        console.log(this.state)
    }

    judgeAvailability(rock: string) {
        if(rock === " ") return true;
        return false;
    }


    render() {
        let board = this.state.board;
        console.log(this.state);
        return(
            <div>
                <div className="board-row">
                <Square rock={board[0]} available={this.judgeAvailability(board[0])}/>
                <Square rock={board[1]} available={this.judgeAvailability(board[1])}/>
                <Square rock={board[2]} available={this.judgeAvailability(board[2])}/>
                </div>
                <div className="board-row">
                <Square rock={board[3]} available={this.judgeAvailability(board[3])}/>
                <Square rock={board[4]} available={this.judgeAvailability(board[4])}/>
                <Square rock={board[5]} available={this.judgeAvailability(board[5])}/>
                </div>
                <div className="board-row">
                <Square rock={board[6]} available={this.judgeAvailability(board[6])}/>
                <Square rock={board[7]} available={this.judgeAvailability(board[7])}/>
                <Square rock={board[8]} available={this.judgeAvailability(board[8])}/>
                </div>
                <SubmitButton handleOnClick={() => this.handleOnClick()}/>
            </div>

        )
    }
}