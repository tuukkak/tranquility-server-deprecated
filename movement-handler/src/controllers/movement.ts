export type Movement = {
    playerID: Number;
    cordX: Number;
    cordZ: Number;
    rotation: Number;
    inputX: Number;
    inputZ: Number;
};

const movementController = (publisher: (msg: string) => void) => {
    return {
        create: (movement: Movement) => {
            publisher('asd');
        }
    }
}

export default movementController;
