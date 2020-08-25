// app.js
// This file houses the main section of code for the Twitter bot
// Ĉi tiu dosiero enhavas la ĉefan parton de kodo por la roboto de Twitter

const Twitter = require('twitter');
const config = require('./config.js');

// Using our config options, we will start the bot
// Uzante niajn agordojn, ni komencos la roboton

const T = new Twitter(config);

// Search Parameters
// Serĉaj Parametroj
// Atentu: Twitter ne subtenas EO per sia propra kodo.
// Se tio ŝanĝos, tiam mi ĝisdatigos ĉi tiun programeron. - @m-j-hacker
let params = {
    q: '#esperanto',
    count: 10,
    result_type: 'recent',
    // lang: 'eo'
}

// GET request for posts
// GET peto por afiŝoj

T.get('search/tweets', params, function(err, data, response) {
    if (!err) {
        // Se eraroj ne ekzistas, komencu kodon

        // Loop through returned tweets
        // Interaciu tra redonitaj afiŝoj
        for(let i = 0; i < data.statuses.length; i++) {
            // Get Tweet ID from returned data
            // Prenu Tweet ID de redonita datumo
            let id = { id: data.statuses[i].id_str }
            // Try to favorite the selected message
            // Provu plej ŝati la elektitan afiŝon
            T.post('favorites/create', id, function(err, response) {
                // If we are not successful, log the URL of the tweet
                // Se ni ne sukcesas, logu la adreson de la afiŝo
                if(err) {
                    console.log(err[0].message);
                }
                // If we are succesful, log the URL of the tweet
                // Se ni sukcesas, logu la adreson de la afiŝo
                else {
                    let username = response.user.screen_name;
                    let tweetId = response.id_str;
                    console.log('Plej ŝatis: ', `https://twitter.com/${username}/status/${tweetId}`)
                }
            });
            // Now we will try to follow the user who posted the current tweet
            // Nun ni provos sekvi la uzanto kiu afiŝis la nuntempan afiŝon
            T.post('friendships/create', {username}, function(err, res) {
                if(err) {
                    console.log(err);
                } else {
                    console.log(username, ': FOLLOWED!!');
                }
            })

        }
    } else {
        // Se eraro ekzistas, redonu logon
        console.log(err)
    }
});