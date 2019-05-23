const deepfry = require('./Deepfry.js');

module.exports =  {
    maxThreads: 2,
    name: 'fry',
    workerScript:'./src/workers/Fry_worker.js',
    args: ['image_url'],

    /**
     * the module to add
     * @param module the module (this)
     * @param expressApp the express app
     */
    initService(module, expressApp) {
        deepfry.initService(module, expressApp);
    }
};