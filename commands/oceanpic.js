const functions = require('../functions.js');
const { UNSPLASH_KEY } = require('../config.json');

module.exports = {
    name: 'oceanpic',
    description: 'Provides a marine-based photograph from Unsplash.',
    execute(message) {
        const axios = require('axios');

    
        axios.get("https://api.unsplash.com/collections/3672442/?client_id=" + UNSPLASH_KEY)
            .then(function(response) {
                            
            var collectionSize = response.data.total_photos;
            var randomNum = functions.getRandom(collectionSize/10);
                        
            axios.get(`https://api.unsplash.com/collections/3672442/photos/?page=${randomNum}&client_id=${UNSPLASH_KEY}`)
                .then(function(response){
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
                            description: `By ${img.user.name} on Unsplash: ${img.user.links.html}?utm_source=jotarobot&utm_medium=referral`
                                }
                            });
                        }).catch(function(error){console.log(error);});
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                console.log("Ocean pic sent.");
    }  
    
};