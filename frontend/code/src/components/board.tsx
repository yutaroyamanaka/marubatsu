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

interface Props {
    status: boolean
    board: Array<string>
}

export default class Board extends React.Component<Props, {}> {

    constructor(props: any){
        super(props);
    }

    async handleOnClick() {
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
                console.log(response)
            });
    }

    render() {
        let board = this.props.board;
        return(
            <div>
                <div className="board-row">
                <Square rock={board[0]} available={true}/>
                <Square rock={board[1]} available={true}/>
                <Square rock={board[2]} available={true}/>
                </div>
                <div className="board-row">
                <Square rock={board[3]} available={true}/>
                <Square rock={board[4]} available={true}/>
                <Square rock={board[5]} available={true}/>
                </div>
                <div className="board-row">
                <Square rock={board[6]} available={true}/>
                <Square rock={board[7]} available={true}/>
                <Square rock={board[8]} available={true}/>
                </div>
                <SubmitButton handleOnClick={() => this.handleOnClick()}/>
            </div>

        )
    }
}