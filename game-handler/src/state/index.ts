// Abstraction layer for redis

import * as redis from 'redis';
import { Player } from '../types';

const client = redis.createClient({ host: 'redis' });
const get = (key: string, callback: Function) => client.get(key, (err, reply) => callback(err, JSON.parse(reply)));
const set = (key: string, data: object | number) => client.set(key, JSON.stringify(data));

export const getPlayer = (playerId: number, callback: (a: Player) => void) =>
    get(`player:${playerId}`, (err: Error | null, player: Player) => {
        if (err) throw err;
        callback(player);
    });

export const setGame = (gameId: number, players: Player[]) => set(`game:${gameId}:players`, players);
export const setPlayer = (playerId: number, player: Player) => set(`player:${playerId}`, player);
export const setPlayerGame = (playerId: number, gameId: number) => set(`player:${playerId}:game`, gameId);
