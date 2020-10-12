const Twitter = require('twitter');
const Sheet = require('./sheet');

(async function (){
//connect to twitter via api
const client = new Twitter({
    consumer_key: 'iuP84dyXfkjJdW8vWQgTrJ2Eb',
    consumer_secret: '8fDFz7IZ7CjZMlwrAVLIdSLNgv1oxgkkMAwOrYUH9qaKGErTCM',
    access_token_key: '1315272128481034240-SwWpUcjmK8HHLO5bXAvkLqkamAoSnE',
    access_token_secret: 'fLoAnXz6lUNc4AShI7TF0TBPOqyVivsGXyRPBiKv5iZU9'
  });
  //pull tweet from ss
  const sheet = new Sheet
  await sheet.load();
  const quotes = await sheet.getRows();
  const status = quotes[0].quote;

  //send tweets
  client.post('statuses/update', {status},  function(error, tweet, response) {
    if(error) throw error;
    console.log(tweet);  // Tweet body.
  });
  //remove tweeted quote from ss
  await quotes[0].delete();
})()
