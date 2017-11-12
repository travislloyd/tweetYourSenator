# tweet_your_senator

Web app to help users lookup and tweet their senators based on zip code.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

To use the app visit: https://travislloyd.github.io/tweet_your_senator/

## Callouts

I decided that the app made the most sense as a statically served single page app.  I used React as the frontend framework to achieve this.  The benefit of this approach is that we don't need to run a server and can serve the app straight from github.  The one downside is that we must call the Google Civic Data API directly from our frontend.  This API call requires the use of an API_KEY and by calling from the frontend we expose this key.  This doesn't seem like much of a problem in this use case, but it is generally bad practice to expose the key.  If this were going into production it might be worth setting up a dynamic server that could store the key and call the Google API for our frontend. 