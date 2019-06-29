import rabbitmq from './rabbitmq';
import spellHandler from './spellHandler';
import { SpellCast, Movement } from './types';

const app = async () => {
    const { publisher, listener } = await rabbitmq('amqp://rabbitmq');
    const spell = spellHandler(publisher);

    listener('spell', (msg: SpellCast) => {
        spell.cast(msg);
    });
}

app();
