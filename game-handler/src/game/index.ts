import * as redis from '../redis';
import { Login, Join, Player } from '../types';

let playerId: number = 1;
let gameId: number = 1;
let playerQue: Array<Player> = [];
let team: number = 0;

const gamePlayerSize: number = 2;

const resetValues = () => {
    playerQue = [];
    team = 0;
};

const state = redis.createClient({ host: 'redis' });

const gameHandler = (publish: Function) => {
    const newGame = () => {
        state.set(`game:${gameId++}:players`, playerQue);
        const message = {
            type: 2,
            to: playerQue.map(p => p.address),
            content: { length: playerQue.length, players: playerQue.map(p => ({ id: p.id, team: p.team })) }
        };
        resetValues();
        // Delay before starting the game
        setTimeout(() => {
            publish(message);
        }, 3000);
    };

    const join = (msg: Join) => {
        state.get(`player:${msg.playerId}`, (err: Error | null, reply: Player) => {
            playerQue.push({ id: msg.playerId, team: team++ % 2, address: reply.address });
            if (playerQue.length == gamePlayerSize) {
                newGame();
            }
        });
    };

    const login = (msg: Login) => {
        const player = { id: playerId++, name: msg.name, address: msg.address };
        state.set(`player:${player.id}`, player);
        publish({ type: 1, to: [msg.address], content: { id: player.id } });
    };

    return {
        login,
        join
    };
};

export default gameHandler;
