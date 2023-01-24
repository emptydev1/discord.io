'use strict';

/**
 * @param {Array} AllowedSizes An array with the Discord CDN allowed images sizes 
 * @param {Array} AllowedFormats An array with the Discord CDN allowed images formats 
 * @param {String} RestVersion The discord rest api version 
*/

const AllowedSizes = [16, 32, 64, 128, 256, 512, 1024, 2048, 4096];
const AllowedFormats = ["webp", "png", "jpg", "jpeg", "gif"];
const RestVersion = '10';


module.exports = {
    AllowedSizes,
    AllowedFormats,
    RestVersion
};
