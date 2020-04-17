import React, {Component } from 'react';
import axios from 'axios';

class ZenQuote extends Component {
    constructor(props) {
        super(props);
        this.state = { quote : "" };
    }

    componentDidMount() {
        //loads the data
        axios.get("https://api.github.com/zen").then(response => {
            this.setState({ quote: response.data });
        });
    }
    componentDidUpdate() {
        console.log("inside component did update");
    }
    render() {
        return (
            <div>
                <h1>ALways Remember...</h1>
                <p>{this.state.quote}</p>
            </div>
        );
    }
}
export default ZenQuote;
