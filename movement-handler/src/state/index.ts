// Abstraction layer for redis

import * as redis from 'redis';
import { Movement, Player } from '../types';

const client = redis.createClient({ host: 'redis' });
const get = (key: string, callback: Function) => client.get(key, (err, reply) => callback(err, JSON.parse(reply)));
const set = (key: string, data: object | number) => client.set(key, JSON.stringify(data));

export const getPlayerGame = (playerId: number, callback: (a: number) => void) =>
    get(`player:${playerId}:game`, (err: Error | null, gameId: number) => {
        if (err) throw err;
        callback(gameId);
    });

export const getGamePlayers = (gameId: number, callback: (a: Player[]) => void) =>
    get(`game:${gameId}:players`, (err: Error | null, players: Player[]) => {
        if (err) throw err;
        callback(players);
    });

export const setPlayerMovement = (playerId: number, movement: Movement) => set(`player:${playerId}:movement`, movement);
