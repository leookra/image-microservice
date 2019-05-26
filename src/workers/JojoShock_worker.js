const gf = require('../helpers/GeneralizedFunctions.js');

module.exports = {
    x: 480,
    y: 270,

    /**
     * generates the image.
     * @param image_url the user's image
     * @param buffer our buffer image
     * @returns {Promise<void>}
     */
    execute: async function(image_url, buffer) {
        return await gf.modifyImageOverImage(image_url, buffer, this.x, this.y, 88, 82, 0, 302, 150, 0, 0);
    }
};