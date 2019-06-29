import rabbitmq from './rabbitmq';
import spellHandler from './spellHandler';
import { SpellCast, Movement } from './types';

const app = async () => {
    const { publisher, listener } = await rabbitmq('amqp://rabbitmq');
    const spell = spellHandler(await publisher('outward'));

    listener('spell', (msg: SpellCast) => {
        spell.cast(msg);
    });

    listener('movement', (msg: Movement) => {
        spell.move(msg);
    });
}

app();
