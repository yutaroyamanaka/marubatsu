import * as React from 'react';

const style : React.CSSProperties =  {
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "center",
};

interface Props {
    message: string
}

interface State {
    message: string
}

export default class Message extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            message: ""
        }
    }

    componentDidUpdate(): void {
        if(this.state.message !== this.props.message) {
            this.setState({
                message: this.props.message
            })
        }
    }

    render() {
        return(
            <p style={style}>
                {this.state.message}
            </p>
        )
    }
}
