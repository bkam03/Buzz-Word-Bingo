const express = require( 'express' );
const app = express();

app.get( '/', ( req, res ) => {

} );

app.route( '/buzzword' )
  .get( ( req, res ) => {

  } )
  .post( ( req, res ) => {

  } )
  .put( ( req, res ) => {

  } )
  .delete( ( req, res ) => {

  } );

app.post( '/reset', ( req, res ) => {

} );



const server = app.listen( 3000, function(){
  console.log( 'server running' );
} );