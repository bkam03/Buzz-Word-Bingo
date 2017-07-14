const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );

function indexBuzzWordInArray( { buzzWord } ){ //return -1 if not found, else return position of word
  let indexMatchingWord = -1;
  //could use every or some array method for this
  for( let i = 0; i < arrayofWords.length; i++ ){
    if( arrayofWords[ i ].buzzWord === buzzWord ){
      indexMatchingWord = i;
      break;
    }
  }
  return indexMatchingWord;
}

var arrayofWords = [];
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
    let isSuccessful = false;
    if(  arrayofWords.length < 5 ){
      let buzzword = req.body;
      isSuccessful = indexBuzzWordInArray( buzzword ) === -1;
      if( isSuccessful ){
        arrayofWords.push( buzzword );
      }
    } else {
      console.log( 'too many words' );
    }
    res.send( { success: isSuccessful } );
  } )
  .put( ( req, res ) => {
    let { heard } = req.body;
    let isSuccessful = false;
    let index = indexBuzzWordInArray( req.body );
    let unusedWord = arrayofWords[ index ].heard === 'false';
    if( index > -1  && unusedWord ){
      arrayofWords[ index ].heard = heard;
      userScore += parseFloat( arrayofWords[ index ].points );
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


app.post( '/reset', ( req, res ) => {
  arrayofWords = [];
  userScore = 0;
  res.send( { success: true } );
} );


const server = app.listen( 3000, function(){
  console.log( 'server listening at 3000' );
} );