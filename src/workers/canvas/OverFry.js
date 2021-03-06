const { createCanvas, loadImage } = require('canvas');
const fried = require('./Fried.js');

/**
 * over fries an image
 * algorithm from https://github.com/jorisvddonk/bash-screenshotter/blob/master/index.js
 * @param imageURL
 * @param opacity the opacity to blit the image on
 * @returns {Promise<*>}
 */
module.exports = {
  /**
   * over fries an image
   * @param imageURL the image url
   * @param opacity the opacity to fry
   * @param color the color to apply
   * @returns {Promise<*>}
   */
  async execute(imageURL, opacity, color = '#e03513') {
    try {
      const theirImage = await loadImage(imageURL);

      const canvas = createCanvas(theirImage.width, theirImage.height);
      const ctx = canvas.getContext('2d');

      ctx.drawImage(theirImage, 0, 0, theirImage.width, theirImage.height);

      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, theirImage.width, theirImage.height);
      ctx.globalAlpha = 1.0; // reset

      // saturation
      ctx.globalCompositeOperation = 'saturation';
      ctx.fillStyle = 'hsl(0, 100%, 50%)';
      ctx.fillRect(0, 0, theirImage.width, theirImage.height);
      ctx.globalCompositeOperation = 'source-over'; // restore default comp

      let imageData = ctx.getImageData(0, 0, theirImage.width, theirImage.height);
      imageData = await fried.brightnessContrastPhotoshop(imageData, 22, 40);

      ctx.putImageData(imageData, 0, 0);
      imageData = await fried.brightnessContrastPhotoshop(imageData, 32, 40);
      imageData = await fried.grain(imageData);
      imageData = await fried.brightnessContrastPhotoshop(imageData, 62, 20);
      ctx.putImageData(imageData, 0, 0);

      return canvas.toBuffer('image/jpeg', { quality: 0.5 });
    } catch (error) {
      console.error(error);
      return undefined;
    }
  },
};
