import * as state from '../state';
import { Login, Join, Player } from '../types';

let playerId: number = 1;
let gameId: number = 1;
let playerQue: Player[] = [];
let team: number = 0;

const gamePlayerSize: number = 2;

const resetValues = () => {
    playerQue = [];
    team = 0;
};

const gameHandler = (publish: Function) => {
    const newGame = () => {
        const newGameId = gameId++;
        state.setGame(newGameId, playerQue);
        playerQue.forEach(p => state.setPlayerGame(p.id, newGameId));
        const message = {
            type: 2,
            to: playerQue.map(p => p.address),
            content: {
                length: playerQue.length,
                players: playerQue.map(p => ({ id: p.id, name: p.name, team: p.team }))
            }
        };
        resetValues();
        // Delay before starting the game
        setTimeout(() => {
            publish(message);
        }, 3000);
    };

    const join = (msg: Join) => {
        state.getPlayer(msg.playerId, player => {
            playerQue.push({ id: msg.playerId, name: player.name, team: team++ % 2, address: player.address });
            if (playerQue.length == gamePlayerSize) {
                newGame();
            }
        });
    };

    const login = (msg: Login) => {
        const player: Player = { id: playerId++, name: msg.name, address: msg.address };
        state.setPlayer(player.id, player);
        publish({ type: 1, to: [msg.address], content: { id: player.id } });
    };

    return {
        login,
        join
    };
};

export default gameHandler;
