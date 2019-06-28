import * as React from 'react';
import {string} from "prop-types";


interface Props {
    rock : string
    available: boolean
}

interface State {
    rock?: string
}

const style : React.CSSProperties =  {
    background: '#fff',
    border: "1px solid #999",
    float: "left",
    fontSize: "48px",
    fontWeight: "bold",
    lineHeight: "34px",
    height: "100px",
    marginRight: "-1px",
    marginTop: "-1px",
    padding: 0,
    textAlign: "center",
    width: "100px",
};

export default class Square extends React.Component<Props, State>{

    constructor(props : any) {
        super(props);
        this.state = {
            rock:this.props.rock
        }
    }

    setRock() {
        this.setState({
            rock: "X"
        })
    }

    render() {

        return(
            <button style={style} onClick={() => this.setRock()}>
                {this.state.rock}
            </button>
        )
    }
}