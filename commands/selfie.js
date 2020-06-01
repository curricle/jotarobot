const axios = require('axios');
const fs = require('fs');
const dir = './selfies';
const config = require("../config.json");
const functions = require("../functions.js");

const default_color = functions.convertColor(config.default_color);

module.exports = {
    name: 'selfie',
    description: "Sends an image of Jotaro.",
    cooldown: 1,
    guildOnly: false,
    execute(message) {
        var Twitter = require('twitter');
        var twitterClient = new Twitter({
            consumer_key: config.TWITTER_KEY,
            consumer_secret: config.TWITTER_SECRET,
            access_token_key: config.TWITTER_ACCESS_KEY,
            access_token_secret: config.TWITTER_ACCESS_SECRET
        });             
    
        var src = functions.getRandom(4);
                    
            switch(src) {
                        
                case 0:
                          
                    var selfie2;
                            
                    axios.get(`https://api.tumblr.com/v2/blog/dailyjotaroscreenshots.tumblr.com/posts/photo?api_key=${config.TUMBLR_KEY}`)
                            .then(function(resp) {
                                var r = resp.data;
                                var limit = r.response.blog.posts;
                                var rand = functions.getRandom(r.response.posts.length);
                                selfie2 = r.response.posts[rand].photos[0].original_size.url;
                                message.channel.send("Here you go.", {
                                    embed: {
                                        image: {
                                            url: selfie2
                                            },
                                        description: `Source: ${r.response.posts[rand].post_url}`,
                                        color: default_color    
                                    }
                                   });
                                })
                            .catch(function(error) {
                                console.log(error);
                            }); 
                                
                            break;
                        
                case 1:
                    
                    var selfie;
                    axios.get(`https://api.tumblr.com/v2/blog/jotarobot-selfies.tumblr.com/posts/photo?api_key=${config.TUMBLR_KEY}`)
                            .then(function(resp) {
                                var r = resp.data;
                                var limit = r.response.blog.posts;
                                var rand = functions.getRandom(r.response.posts.length);
                                selfie = r.response.posts[rand].photos[0].original_size.url; 
                                message.channel.send("Here you go.", {
                                    embed: {
                                        image: {
                                            url: selfie
                                            },
                                        color: default_color   
                                        }
                                        
                                   });
                                })
                            .catch(function(error) {
                                console.log(error);
                            }); 
                            
                    break;
                            
                case 2:
                            
                    var params = {
                        screen_name:"daily_jotaro",
                        value: "has:media",
                           count: 3200
                    };
                            
                    twitterClient.get("statuses/user_timeline", params, function(error, tweets, response) {
                        if(!error) {
                                
                            var status = tweets[functions.getRandom(tweets.length)];
                                    
                            //check to see if the tweet has media
                            if(status.entities.media !== undefined) {
                                var pic = status.entities.media[0].media_url;
                                                                        
                                message.channel.send("Here you go.", {
                                    embed: {
                                        image: {
                                            url: pic
                                            },
                                        color: functions.convertColor(status.user.profile_link_color),
                                        description: `Source: @daily_jotaro ${status.text}`,
                                            }
                                    });
                                }
                            else  {
                                message.channel.send("Sorry, something went wrong. Try again.");
                                console.log(error);
                                }
                            }
                        });
                    break;
                    
                case 3:
                    
                    var totalSize = 110;
                    var offset = 10;
                    var offsetInterval;
                    
                    
                    //get new auth token
                    axios.get('https://www.deviantart.com/oauth2/token', {
                    params: {
                        client_id: config.DEV_CLIENT_ID,
                        client_secret: config.DEV_CLIENT_SECRET,
                        grant_type: 'client_credentials'
                        }
                    }).then(function(response){
                        
                        //get collection size
                        axios.get('https://www.deviantart.com/api/v1/oauth2/collections/folders', {
                            params: {
                                username: 'thefelldragon',
                                calculate_size: true,
                                access_token: response.data.access_token,
                                offset: 10
                            }
                        })
                        
                        .then(function(f){
                            
                            totalSize = f.data.results[4].size;
                            config.DEV_ACCESS_TOKEN = response.data.access_token;
                            offsetInterval = functions.getRandom(totalSize/offset);
                    
                            //get deviations from collection
                            axios.get(`https://www.deviantart.com/api/v1/oauth2/collections/C769BFDD-A16F-33D2-7BFE-45DA8BB5A5BF?username=thefelldragon&access_token=${config.DEV_ACCESS_TOKEN}`, {
                                params: {
                                    offset: (offsetInterval*10)
                                }
                            })
                                .then(function(innerResponse) {
                                    let arr = innerResponse.data.results.length;
                                    let rand = functions.getRandom(arr);
                                    
                                    let selfie = innerResponse.data.results[rand];
                                    
                                    message.channel.send('Here you go.', {
                                       embed: {
                                            image: {
                                               url: selfie.content.src
                                           },
                                            color: default_color,
                                            title: selfie.title,
                                            description: `By ${selfie.author.username} on deviantART: ${selfie.url}`
                                       } 
                                    });
                    
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                            
                        })
                        .catch(error => { console.log(error); });
                        
                    })
                    .catch(error => {
                        console.log(error);
                    });
                    
                    break;
                        
                }
                            
    }
   
};