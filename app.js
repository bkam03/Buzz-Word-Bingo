const express = require( 'express' );
const app = express();

app.use( express.static( 'public' ) );
//always send postman by x-www-form-urlencoded

/*
  post will look like {
    buzzWord : String,
    points: Number,
    heard: false
  }
*/

const arrayofWords = [];

//get body parser.  use it on data coming in for posts.  look at urlencodedoptions in README.  use extended: true.  might be familiar in function.

app.get( '/', ( req, res ) => { //empty body, render HTML( index.html ) by serving. check slack for this  static file.
  res.sendFile( '/index.html' );
} );

app.route( '/buzzword' )
  .get( ( req, res ) => { //empty body, return a JSON 'buzzWords':[arrayofwords].  creates new buzzword object, returns true if successful, else false.
    let isSuccessful = false;

    res.json( { buzzWords: arrayofWords } );

    return isSuccessful;
  } )
  .post( ( req, res ) => { //return object at top of this page as body.  response is the 'success' : true.  creates new buzzword object, return true, else false.

  } )
  .put( ( req, res ) => { //return { 'buzzWord' : String, 'heard': Bool } as body, response is { 'success': true, newScore: Number }.  updates buzzword.  returns true and new score if successful, else false.

  } )
  .delete( ( req, res ) => { //body {'buzzWord': String }, resp. { 'success': true }, return true if successful

  } );


app.post( '/reset', ( req, res ) => { //body { 'reset': true }, resp. { 'success, etc'  resets server.  all buzzwords removed and scores = 0.}

} );

//track this user's score somehow.



const server = app.listen( 3000, function(){
  console.log( 'server running' );
} );