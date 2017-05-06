import React, { Component } from 'react';

import Cell from './Cell';

export default class Category extends Component {
    state = {
        scores: [25, 50, 75, 100, 125, 150]
    }

    render() {
        const { id, label, questions, onCellClick, clicked } = this.props;
        const { scores } = this.state;

        return (
            <div className="col-xs-12" style={{ marginBottom: '3px'}}>
                <div
                    className="label col-xs-4"
                    style={{
                        textAlign: 'right',
                        fontSize: 'medium'
                    }}
                >
                    {label}
                </div>
                <div className="col-xs-8">
                    {questions.map((question, i) => (
                        <Cell
                            key={question}
                            id={i}
                            categoryId={id}
                            onClick={onCellClick}
                            clicked={clicked.get(i)}
                            score={scores[i]}
                        />
                    ))}
                </div>
            </div>
        )
    }
}
