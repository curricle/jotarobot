exports.run = (client, message, args) => {
    
    const axios = require('axios');
    
    axios.get("https://api.unsplash.com/collections/3672442/?client_id=" + client.config.UNSPLASH_KEY)
        .then(function(response) {
                        
        var collectionSize = response.data.total_photos;
        var randomNum = client.getRandom(collectionSize/10);
                    
        axios.get("https://api.unsplash.com/collections/3672442/photos/?page="+randomNum+"&client_id=" + client.config.UNSPLASH_KEY)
            .then(function(response){
                var temp = client.getRandom(10);
                var img = response.data[temp];
                            
                message.channel.send("Here you go.", {
                    embed: {
                        image: {
                            url: img.urls.raw
                                },
                        color: client.convertColor(img.color),
                        title: client.trunc(img.description),
                        description: "By " + img.user.name + " on Unsplash: " + (img.user.links.html + "?utm_source=jotarobot&utm_medium=referral")
                            }
                        });
                    }).catch(function(error){console.log(error);});
                })
                .catch(function (error) {
                    console.log(error);
                });
            console.log("Ocean pic sent.");
    
};