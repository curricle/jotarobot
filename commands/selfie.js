exports.run = (client, message, args) => {

    const axios = require('axios');
    const fs = require('fs');
    const dir = './selfies';

    var Twitter = require('twitter');
    var twitterClient = new Twitter({
        consumer_key: client.config.TWITTER_KEY,
        consumer_secret: client.config.TWITTER_SECRET,
        access_token_key: client.config.TWITTER_ACCESS_KEY,
        access_token_secret: client.config.TWITTER_ACCESS_SECRET
    });             

    var src = client.getRandom(4);
    console.log(src);
                
        switch(src) {
                    
            case 0:
                      
                var selfie2;
                        
                axios.get("https://api.tumblr.com/v2/blog/dailyjotaroscreenshots.tumblr.com/posts/photo?api_key=" + client.config.TUMBLR_KEY)
                        .then(function(resp) {
                            var r = resp.data;
                            var limit = r.response.blog.posts;
                            var rand = client.getRandom(r.response.posts.length);
                            selfie2 = r.response.posts[rand].photos[0].original_size.url;
                            console.log("Tumblr selfie: " + selfie2); 
                            message.channel.send("Here you go.", {
                                embed: {
                                    image: {
                                        url: selfie2
                                        },
                                    description: "Source: " + r.response.posts[rand].post_url
                                    }
                               });
                            })
                        .catch(function(error) {
                            console.log(error);
                        }); 
                            
                        break;
                    
            case 1:
                        
                //see if you can restructure this so it's not creating arrays every time; pick directly from the folder
                fs.readdir(dir, (err, files) => {
                    if(err) {
                        console.log(err);
                        } 
                    else {
                        //send selfies from folder
                        var rand = client.getRandom(files.length);
                        var selfies = [];
                        files.forEach(file => {
                            selfies.push(file);
                                });
                        console.log("Selfie on-file: " + selfies[rand]);
                        message.channel.send("I've got " + files.length + " selfies to choose from. You're getting number " + (rand+1) + ".", {
                            files: [
                                    "./selfies/" + selfies[rand],
                                    ]
                                });
                            }
                    });
                        
                break;
                        
            case 2:
                        
                var params = {
                    screen_name:"daily_jotaro",
                    value: "has:media",
                       count: 3200
                };
                 
                try {
                twitterClient.get("statuses/user_timeline", params, function(error, tweets, response) {
                    console.log(tweets.length);
                    if(!error) {
                            
                        var status = tweets[client.getRandom(tweets.length)];
                                
                        //check to see if the tweet has media
                        if(status.entities.media !== undefined) {
                            var pic = status.entities.media[0].media_url;
                            console.log("@daily_jotaro selfie"); 
                                    
                            message.channel.send("Here you go.", {
                                embed: {
                                    image: {
                                        url: pic
                                        },
                                    color: client.convertColor(status.user.profile_link_color),
                                    description: "Source: @daily_jotaro " + status.text,
                                        }
                                });
                            }
                        else  {
                            message.channel.send("Sorry, something went wrong. Try again.");
                            console.log("tweet does not have media");
                            throw error;
                            }
                        }
                    }); }
                    catch(error) { console.error };

                break;
                
            case 3:
                
                var totalSize = 110;
                var offset = 10;
                var offsetInterval;
                
                
                //get new auth token
                axios.get('https://www.deviantart.com/oauth2/token', {
                params: {
                    client_id: client.config.DEV_CLIENT_ID,
                    client_secret: client.config.DEV_CLIENT_SECRET,
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
                        client.config.DEV_ACCESS_TOKEN = response.data.access_token;
                        offsetInterval = client.getRandom(totalSize/offset);
                
                        //get deviations from collection
                        axios.get('https://www.deviantart.com/api/v1/oauth2/collections/C769BFDD-A16F-33D2-7BFE-45DA8BB5A5BF?username=thefelldragon&access_token=' + client.config.DEV_ACCESS_TOKEN, {
                            params: {
                                offset: (offsetInterval*10)
                            }
                        })
                            .then(function(innerResponse) {
                                let arr = innerResponse.data.results.length;
                                let rand = client.getRandom(arr);
                                
                                let selfie = innerResponse.data.results[rand];
                                console.log("deviantART selfie: " + selfie.content.src);
                                
                                message.channel.send('Here you go.', {
                                   embed: {
                                        image: {
                                           url: selfie.content.src
                                       },
                                        color: client.convertColor(client.config.default_color),
                                        title: client.trunc(selfie.title),
                                        description: "By " + selfie.author.username + " on deviantART: " + selfie.url
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
                
                
};