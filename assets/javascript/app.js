// -------------------- I. VARIABLES + NODE PACKAGES--------------------
var str = [];
var tweets = [];
var textTweet;
var jsonObject;

// Twitter API
var Twitter = require('twitter')
var util = require('util');
var T = new Twitter({
    consumer_key: '<YOUR KEY>',
    consumer_secret: '<YOUR CONSUMER_SECRET>',
    access_token_key: '<YOUR_ACCESS_TOKEN_KEY>',
    access_token_secret: '<YOUR_ACCESS_TOKEN_SECRET>',
});

// Twitter Parameters
var paramsTwitter = {
    from: 'khloekardashian',
    // q: '@realDonaldTrump',
    count: 100
}

// Watson Personality API
var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
var personality_insights = new PersonalityInsightsV3({
    username: '<YOUR USERNAME>',
    password: '<YOUR PASSWORD>',
    version_date: '2016-10-20'
});


// -------------------- II. MAIN PROCESS -------------------
// Promise Function
T.get('/search/tweets.json', paramsTwitter)
    .then(function(stageOne) {
        for (var i = 0; i < stageOne.statuses.length; i++) {
            tweets.push(stageOne.statuses[i].text);
        };
        return textTweet = tweets.join(' ').toString();
    })
    // Watson Parameters
    .then(function(stageTwo) {
        var paramsWatson = {
            // Get the content items from the JSON file.
            text: stageTwo,
            consumption_preferences: true,
            raw_scores: true,
            headers: {
                'accept-language': 'en',
                'accept': 'application/json'
            }
        };
        return paramsWatson;
    })
    .then(function(stageThree) {
        personality_insights.profile(stageThree, function(error, response) {
            if (error)
                console.log('WATSON Error:', error);
            else
                console.log(JSON.stringify(response, null, 2));
            // return jsonObject = JSON.stringify(response, null, 2);
        });
    });