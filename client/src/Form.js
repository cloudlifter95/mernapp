import React from 'react';
import TextField from '@mui/material/TextField';

export default class Form extends React.Component {
    state = {
        text: ""
    };
    handleChange = (e) => {
        const newText = e.target.value;
        this.setState({
            text: newText
        });
    }

    handleKeyDown = (e) => {
        console.log(e.key)
        if (e.key === 'Enter') {
            this.props.submit(this.state.text);
            this.setState({text: ""})
        }
    };

    render() {
        const { text } = this.state;
        return (
            <TextField
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                id="outlined-required"
                label="todo"
                value={text}
                fullWidth
            />
        )
    }
}