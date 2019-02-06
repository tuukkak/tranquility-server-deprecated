import { Movement } from './type';

const movementController = (publish: (msg: string) => boolean) => ({
    new: (movement: Movement) => {
        publish('asd');
    }
});

export default movementController;
export type Movement = Movement;
