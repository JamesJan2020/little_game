import React, { Component } from 'react';
import style from './Game.module.css'

const toSymbols = elm => {
    switch (elm) {
        case 0: return '';
        case 1: return 'O';
        default: return 'X';
    }
}

const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

class Game extends Component {
    state = {
        grids: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        player: 1,
        winner: 0,
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.grids !== this.state.grids) {
            this.setState({
                winner: this.getWinner(),
            })
        }
    }

    handleClick = index => {

        // console.log(index);
        if (this.state.winner !== 0) return;//有winner就不能再繼續

        const grids = [...this.state.grids];//copy一份


        if (grids[index] !== 0) return;//避免重新點同一格會變

        grids[index] = this.state.player;//判斷現在所點選位置

        this.setState({
            grids,
            player: -this.state.player,
        })
    }

    reset = () => {
        this.setState({
            grids: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            player: 1,
        });
    }

    getWinner = () => {
        const { grids } = this.state
        for (const line of lines) {

            const [i, j, k] = line;
            if (grids[i] === grids[j] && grids[j] === grids[k] && grids[i] !== 0) {

                return grids[i]

            }
        }
        return 0;
    }


    render() {
        const { grids, player, winner } = this.state
        return (
            <div>
                <div className={style.board}>
                    {grids.map((elm, index) => (
                        <div className={style.grid}
                            key={index}
                            onClick={() => this.handleClick(index)}>
                            {toSymbols(elm)}</div>
                    ))}
                </div>
                <div className={style.bottom}>
                    <h3>起手玩家:{toSymbols(player)}</h3>
                    <h3>勝利玩家:{toSymbols(winner)}</h3>
                    <button onClick={this.reset}>Replay</button>
                </div>
            </div>
        );
    }
}

export default Game;