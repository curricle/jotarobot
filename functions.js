const Vibrant = require('node-vibrant');

const getRandom = function(len, rangeFloor) {
    if(rangeFloor) {
    return Math.floor(Math.random()*(len-rangeFloor)+rangeFloor);
    }
    else return Math.floor(Math.random()*len);
};

const convertColor = function(rrggbb) {
    let newColor = rrggbb.substr(1);
    return parseInt(newColor, 16);
    };

 const getColorOfImage = function(img) {
    let vibrant = new Vibrant(img);
    vibrant.getPalette()
        .then((palette) => {
                let color = palette.Vibrant.getHex();
                return parseInt(color.substr(1), 16);
            }
        );
 }   

module.exports = {
    getRandom: getRandom,
    convertColor: convertColor,
    getColorOfImage: getColorOfImage
}
