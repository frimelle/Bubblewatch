function series( json ) {
  var chooser = document.getElementById( 'serieslist' );
  //set size to number of series in json
  chooser.size = json.length;
  //fill selection list (chooser) with series as defined in json
  for ( var i = 0; i < json.length; i++ ) {
    chooser.options[i] = new Option( "text", json[i]['Series'] );
  }

  //after click on button
  document.getElementById( "seriesbutton" ).onclick = function(e) {
    var opts = getSelectedOptions( chooser );
    //alert( 'The number of options selected is: ' + opts.length );
    var episode = getRandomEpisode( opts, json );
    alert ("I choose you episode " + episode)
    //var yay = $( '#serieslist' ).find( ":selected" ).val();
    //alert(yay);
  };
}

//function to get an array of all selected options
function getSelectedOptions( sel ) {
  var opts = [],
    opt;
  // loop through options in select list
  for ( var i=0, len=sel.options.length; i < len; i++ ) {
    opt = sel.options[i];
    // check if selected
    if ( opt.selected ) {
      // add to array of option elements to return from this function
      opts.push( opt );
    }
  }
  // return array containing references to selected option elements
  return opts;
}

//function to get the id of an random episode
function getRandomEpisode( opts, json ) {
  var series = opts[Math.floor(Math.random()*opts.length)];
  alert(opts[1]);
  var episodes = json[series]['Episodes'];
  var episode = episodes[Math.floor(Math.random()*episodes.length)];
  return episode;
}
