import * as redis from '../redis';
import { Login, Join, Player } from '../types';

let playerId: number = 1;
let gameId: number = 1;
let playerQue: Array<Player> = [];
let team: number = 0;

const resetValues = () => {
    playerQue = [];
    team = 0;
};

const state = redis.createClient({ host: 'redis' });

const gameHandler = (publish: Function) => {
    const newGame = () => {
        state.set(`game:${gameId++}:players`, playerQue);
        const message = {
            to: playerQue.map(p => p.id),
            message: { length: playerQue.length, players: playerQue }
        };
        resetValues();
        // Delay before starting the game
        setTimeout(() => {
            publish(message);
        }, 3000);
    };

    const join = (msg: Join) => {
        playerQue.push({ id: msg.id, team: team++ % 2 });
        if (playerQue.length == 2) {
            newGame();
        }
    };

    const login = (msg: Login) => {
        const player = { id: playerId++, name: msg.name, address: msg.address };
        state.set(`player:${player.id}`, player);
        publish({ to: player.id, message: { id: player.id } });
    };

    return {
        login,
        join
    };
};

export default gameHandler;
