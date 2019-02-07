import { Movement } from './type';

const movementHandler = (publish: (msg: string) => boolean) => ({
    new: (movement: Movement) => {
        publish('asd');
    }
});

export default movementHandler;
export type Movement = Movement;
