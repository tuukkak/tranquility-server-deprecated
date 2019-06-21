import rabbitmq from './rabbitmq';
import spellHandler from './spellHandler';
import { SpellCast, Movement } from './types';

rabbitmq('amqp://rabbitmq', async (publisher, listener) => {
    const publish = await publisher('outward');
    const spell = spellHandler(publish);
    listener('spell', (msg: SpellCast) => {
        spell.cast(msg);
    });
});
