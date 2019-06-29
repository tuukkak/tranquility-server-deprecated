import * as state from './state';
import { SpellCast, Movement } from './types';
import spells from './spells';

const castTimers: NodeJS.Timeout[] = [];

const spellHandler = (publish: Function) => {
    const relaySpellCast = (spellCast: SpellCast) => {
        const { playerId } = spellCast;
        state
            .getPlayerGame(playerId)
            .then(gameId => state.getGamePlayers(gameId))
            .then(players => {
                publish({
                    type: 4,
                    to: players.filter(p => p.id !== playerId).map(p => p.address),
                    content: spellCast
                });
            });
    };

    const cancelSpellCast = (spellCast: SpellCast) => {
        const { playerId } = spellCast;
        clearTimeout(castTimers[playerId]);
        // Remove cast from state
        state.clearSpellCast(playerId);
        // Send cancel info to other players
        relaySpellCast({ ...spellCast, state: 2 });
    }

    return {
        cast: (spellCast: SpellCast) => {
            console.log('Spell cast starting');
            const { playerId } = spellCast;
            // Validate spell
            const spell = spells.find(s => s.id === spellCast.spellId);
            if (!spell) return;
            // Save spell cast to state
            state.setSpellCast(playerId, spellCast);
            // Send spell cast info to other players
            relaySpellCast(spellCast);
            // Start cast timer
            castTimers[playerId] = setTimeout(() => {
                relaySpellCast({ ...spellCast, state: 3 })
                state.clearSpellCast(playerId);
            }, spell.castTime);
        },
        move: (movement: Movement) => {
            console.log('Movement received');
            const { playerId } = movement;
            state.getPlayerSpellCast(playerId).then(spellCast => {
                if (spellCast) cancelSpellCast(spellCast);
            });
        }
    };
};

export default spellHandler;
