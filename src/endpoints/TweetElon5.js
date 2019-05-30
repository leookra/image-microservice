const gc = require('../EndpointsHelper/GenericCanvas.js');
const worker = require('../workers/canvas/TweetPerson_worker.js');

module.exports =  {
    name: 'elontweet5',
    args: ['text'],
    filepaths: ['./assets/images/elontweet5.jpg'],
    maxChars: 264,

    /**
     * initiates the service
     * @param module our module.
     * @param expressApp the express app.
     */
    initService(module, expressApp) {
        gc.initService(module, expressApp, worker);
    }
};