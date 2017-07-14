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

function indexBuzzWordInArray( { buzzWord } ){ //return -1 if not found, else return position of word
  let indexMatchingWord = -1;
  console.log( `buzzWord ${ buzzWord }` );
  //could use every or some array method for this
  for( var i = 0; i < arrayofWords.length; i++ ){
    let currentComparisonWord = arrayofWords[ i ].buzzWord;
    console.log( currentComparisonWord );
    if( currentComparisonWord === buzzWord ){
      indexMatchingWord = i;
      break;
    }
  }
  return indexMatchingWord;
}

const arrayofWords = [
  {buzzWord:"c",points:"3",heard:"false"},{buzzWord:"2",points:"3",heard:"false"}  //delete this later
];
var userScore = 0;

app.use( express.static( 'public' ) );


app.use( bodyParser.json() );

app.get( '/', ( req, res ) => {
  res.sendFile( '/index.html' );
} );

app.route( '/buzzword' )
  .get( ( req, res ) => {
    res.json( { buzzWords: arrayofWords } );
  } )
  .post( ( req, res ) => {
    let buzzword = req.body;
    let isSuccessful = indexBuzzWordInArray( buzzword ) === -1;
    if( isSuccessful ){
      arrayofWords.push( buzzword );
    }
    res.send( { success: isSuccessful } );
  } )
  .put( ( req, res ) => {
    let { heard } = req.body;
    let isSuccessful = false;
    let index = indexBuzzWordInArray( req.body );
    let unusedWord = arrayofWords[ index ].heard === 'false';
    console.log( `index ${ index } unusedWord ${ unusedWord }`);
    if( index > -1  && unusedWord ){
      arrayofWords[ index ].heard = heard;
      userScore += parseFloat( arrayofWords[ index ].points );
      console.log( userScore );
      isSuccessful = true;
    }
    res.send( { success: isSuccessful } );
  } )
  .delete( ( req, res ) => {
    let index = indexBuzzWordInArray( req.body );

    let isWordInArray = index > -1;
    if( isWordInArray ){
      arrayofWords.splice( index, 1 );
    }

     res.send( { success: isWordInArray } );
  } );


app.post( '/reset', ( req, res ) => { //body { 'reset': true }, resp. { 'success, etc'  resets server.  all buzzwords removed and scores = 0.}
  console.log( 'reset' );

} );

//track this user's score somehow.



const server = app.listen( 3000, function(){
  console.log( 'server running' );
} );