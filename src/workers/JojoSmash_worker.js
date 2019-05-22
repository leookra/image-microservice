const { parentPort, isMainThread } = require('worker_threads');
const Jimp = require('jimp');
const gf = require('../helpers/GeneralizedFunctions.js');

// check that the sorter was called as a worker thread
if (!isMainThread) {
    const x = 400;
    const y = 673;

    let image;
    (async () => {
        image = await Jimp.read('./assets/images/jojo_smash.png');
    })();

    parentPort.on('message', async (message) => {

        let buffer;
        try {
            buffer = await gf.modifyImageOverImage(message.image_url, image, x, y, 355, 225, 0, 0, 230, 0, 0);
        } catch(error) {
            console.error(error);
        }
        parentPort.postMessage(buffer);
    });
}