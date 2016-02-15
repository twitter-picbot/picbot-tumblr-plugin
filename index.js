'use strict';

const tumblr = require('tumblr.js'),
  utils = {
    /**
     * Gets a random item from given array.
     * @param {Array} list - an array.
     * @returns {*} random item fron the array.
     */
    getRandom(list) {
      return list[Math.floor(Math.random() * (list.length - 1))];
    }
  };

module.exports = {
  /**
   * Gets source of an image related to the query.
   * @param {string} query - topic of the image.
   * @return {Promise} promise handler.
   */
  getSource: function(query) {
    return new Promise((resolve, reject) => {
      const KEYS = require('./keys.json'),
        client = tumblr.createClient(KEYS);

      client.tagged(query, {limit: 50}, (error, data) => {
        if (error) {
          reject({
            error
          });
        } else {
          let imagePosts = data.filter((post) => {
              return post.type === 'photo'
            }),
            source = utils.getRandom(imagePosts);

          resolve({
            url: source.photos[0].original_size.url,
            source: source.short_url
          });
        }
      });
    });
  }
};
