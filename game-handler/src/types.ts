export type Login = {
    address: string;
    name: string;
}

export type Join = {
    playerId: number;
};

export type Player = {
    id: number;
    name: string;
    team: number;
    address: string;
};
