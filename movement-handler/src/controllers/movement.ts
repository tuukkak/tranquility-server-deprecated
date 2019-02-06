import * as Bluebird from 'bluebird';

export type Movement = {
    playerID: Number;
    cordX: Number;
    cordZ: Number;
    rotation: Number;
    inputX: Number;
    inputZ: Number;
};

const movementController = (publish: (msg: string) => boolean) => ({
    new: (movement: Movement) => {
        publish('asd');
    }
});

export default movementController;
