export interface SpellCast {
    id: number;
    playerId: number;
    spellId: number;
    targetId: number;
    state: 1 | 2 | 3; // 1 = START, 2 = CANCEL, 3 = FINISH
}

export interface Spell {
    id: number;
    name: string;
    castTime: number;
}

export type Movement = {
    playerId: number;
    cordX: number;
    cordZ: number;
    rotation: number;
    inputX: number;
    inputZ: number;
};

export type Player = {
    id: number;
    address: string;
}
