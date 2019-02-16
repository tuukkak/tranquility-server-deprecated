// Abstraction layer for redis

import * as redis from 'redis';

export const createClient = (config: object) => {
    const client = redis.createClient(config);
    return {
        get: (key: string, callback: Function) => client.get(key, (err, reply) => callback(err, JSON.parse(reply))),
        set: (key: string, data: object) => client.set(key, JSON.stringify(data))
    };
};
