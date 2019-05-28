const gc = require('../EndpointsHelper/GenericCanvas.js');
const worker = require('../workers/canvas/TweetPerson_worker.js');

module.exports =  {
    name: 'trumptweet1',
    args: ['text'],
    filepaths: ['./assets/images/trumptweet1.jpg'],
    maxChars: 52,

    /**
     * initiates the service
     * @param module our module.
     * @param expressApp the express app.
     */
    initService(module, expressApp) {
        gc.initService(module, expressApp, worker);
    }
};