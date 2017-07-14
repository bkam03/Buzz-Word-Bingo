const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );


/*
  post will look like {
    buzzWord : String,
    points: Number,
    heard: false
  }
*/

function isBuzzWordInArray( { buzzWord } ){
  let isValidWord = true;
  for( var i = 0; i < arrayofWords.length; i++ ){
    let currentComparisonWord = arrayofWords[ i ].buzzWord;
    if( currentComparisonWord === buzzWord ){
      isValidWord = false;
      break;
    }
  }
  return isValidWord;
}

const arrayofWords = [];
app.use( express.static( 'public' ) );

//always send postman by x-www-form-urlencoded

//app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );

//get body parser.  use it on data coming in for posts.  look at urlencodedoptions in README.  use extended: true.  might be familiar in function.

app.get( '/', ( req, res ) => { //empty body, render HTML( index.html ) by serving. check slack for this  static file.
  res.sendFile( '/index.html' );
} );

app.route( '/buzzword' )
  .get( ( req, res ) => {
    res.json( { buzzWords: arrayofWords } );
  } )
  .post( ( req, res ) => { //return object at top of this page as body.  response is the 'success' : true.  creates new buzzword object, return true, else false.
    //receives buzzword key pairs
    //parses payload
    //puts into array
    let buzzword = req.body;
    console.log( buzzword );
    let isSuccessful = isBuzzWordInArray( buzzword );
    console.log( isSuccessful );
    if( isSuccessful ){
      arrayofWords.push( buzzword );
    }

    res.send( { success: isSuccessful } );
    //res.end();
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