import * as redis from 'redis';
import { Player, SpellCast, Movement } from './types';

const client = redis.createClient({ host: 'redis' });
const get = (key: string, callback: Function) => client.get(key, (err, reply) => callback(err, JSON.parse(reply)));
const set = (key: string, data: object | number) => client.set(key, JSON.stringify(data));
const del = (key: string) => client.del(key);

export const setSpellCast = (playerId: number, spellCast: SpellCast) => set(`player:${playerId}:spellCast`, spellCast);
export const clearSpellCast = (playerId: number) => del(`player:${playerId}:spellCast`);

export const getPlayerSpellCast = async (playerId: number): Promise<SpellCast> =>
    new Promise((resolve, reject) => {
        get(`player:${playerId}:spellCast`, (err: Error | null, spellCast: SpellCast) => {
            err ? reject(err) : resolve(spellCast);
        });
    });

export const getPlayerMovement = async (playerId: number): Promise<Movement> =>
    new Promise((resolve, reject) => {
        get(`player:${playerId}:movement`, (err: Error | null, movement: Movement) => {
            err ? reject(err) : resolve(movement);
        });
    });

export const getPlayerGame = async (playerId: number): Promise<number> =>
    new Promise((resolve, reject) => {
        get(`player:${playerId}:game`, (err: Error | null, gameId: number) => {
            err ? reject(err) : resolve(gameId);
        });
    });

export const getGamePlayers = async (gameId: number): Promise<Player[]> =>
    new Promise((resolve, reject) => {
        get(`game:${gameId}:players`, (err: Error | null, players: Player[]) => {
            err ? reject(err) : resolve(players);
        });
    });
