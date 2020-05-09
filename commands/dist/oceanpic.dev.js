"use strict";

var functions = require('../functions.js');

var _require = require('../config.json'),
    UNSPLASH_KEY = _require.UNSPLASH_KEY;

module.exports = {
  name: 'oceanpic',
  description: 'Provides a marine-based photograph from Unsplash.',
  execute: function execute(message) {
    var axios = require('axios');

    axios.get("https://api.unsplash.com/collections/3672442/?client_id=" + UNSPLASH_KEY).then(function (response) {
      var collectionSize = response.data.total_photos;
      var randomNum = functions.getRandom(collectionSize / 10);
      axios.get("https://api.unsplash.com/collections/3672442/photos/?page=".concat(randomNum, "&client_id=").concat(UNSPLASH_KEY)).then(function (response) {
        var temp = functions.getRandom(10);
        var img = response.data[temp];
        console.log(img.color);
        message.channel.send("Here you go.", {
          embed: {
            image: {
              url: img.urls.raw
            },
            color: functions.convertColor(img.color),
            title: img.description,
            description: "By ".concat(img.user.name, " on Unsplash: ").concat(img.user.links.html, "?utm_source=jotarobot&utm_medium=referral")
          }
        });
      })["catch"](function (error) {
        console.log(error);
      });
    })["catch"](function (error) {
      console.log(error);
    });
    console.log("Ocean pic sent.");
  }
};