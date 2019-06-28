import * as React from 'react';
import Square from './square';

interface Props {
    status: boolean
    board: Array<string>
}

export default class Board extends React.Component<Props, {}> {
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
            </div>

        )
    }
}