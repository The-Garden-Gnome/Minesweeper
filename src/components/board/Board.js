import React from 'react';
import PropTypes from 'prop-types';
import Cell from '../cell/Cell'

export default class Board extends React.Component {
    state = {
        boardData: this.initBoardData(this.props.height, this.props.width, this.props.mines),
        gameStatus: false,
        mineCount: this.props.mines
    };

    getMines(data) {
        let mineArray = [];

        data.map(datarow => {
            datarow.map((dataitem) => {
                if (dataitem.isMine) {
                    mineArray.push(dataitem);
                }
            });
        });

        return mineArray;
    }

    getFlags(data) {
        let mineArray = [];

        data.map(datarow => {
            datarow.map((dataitem) => {
                if (dataitem.isFlagged) {
                    mineArray.push(dataitem);
                }
            });
        });

        return mineArray;
    }

    initBoardData(height, width, mines) {
        let data = this.createEmptyArray(height, width);
        // data = this.plantMines(data, height, width, mines);
        // data = this.getNeighbors(data, height, width);
        return data;
    }

    createEmptyArray(height, width) {
        let data = [];

        for (let i = 0; i < height; i++) {
            data.push([]);
            for (let i2 = 0; i2 < width; i2++) {
                data[i][i2] = {
                    x: i,
                    y: i2,
                    isMine: false,
                    neighbor: 0,
                    isRevealed: false,
                    isEmpty: false,
                    isFlagged: false,
                };
            }
        }
        return data;
    }

    renderBoard(data) {
        return data.map((datarow) => {
            return datarow.map((dataitem) => {
                return (
                    <div key={dataitem.x * datarow.length + dataitem.y}>
                        <Cell
                            onClick={() => this.handleCellClick(dataitem.x, dataitem.y)}
                            cMenu={(e) => this.handleContextMenu(e, dataitem.x, dataitem.y)}
                            value={dataitem}
                        />
                        {(datarow[datarow.length - 1] === dataitem) ? <div className="clear" /> : ""}
                    </div>);
            })
        });

    }

    render() {
        return (
            <div className="board">
                <div className="game-info">
                    <span className="info">
                        mines: {this.state.mineCount}
                    </span>
                    <br />
                    <span className="info">
                        {this.state.gameStatus}
                    </span>
                </div>
                { this.renderBoard(this.state.boardData)}
            </div>
        );
    }
}
// Type checking With PropTypes
Board.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    mines: PropTypes.number,
}