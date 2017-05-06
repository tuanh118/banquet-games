import React, { Component } from 'react';
import classname from 'classnames';

export default class Cell extends Component {
    _onClick = () => {
        const { onClick, categoryId, id } = this.props;

        onClick(categoryId, id);
    }

    render() {
        const { clicked, score } = this.props;

        const className = classname(['cell btn btn-default'], { clicked })

        return (
            <button
                onClick={this._onClick}
                className={className}
                style={{
                    marginLeft: '8px',
                    marginRight: '8px'
                }}
            >
                {score}
            </button>
        )
    }
}
