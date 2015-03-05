function series( json ) {
  var chooser = document.getElementById( 'serieslist' );
  //set size to number of series in json
  chooser.size = json.length;
  //fill selection list (chooser) with series as defined in json
  var i = 0;
  for ( var seriesKey in json ) {
    chooser.options[i] = new Option( "text", seriesKey );
    i++;
  }

  //after click on button
  document.getElementById( "seriesbutton" ).onclick = function( e ) {
    var selectedValues = getSelectedOptions( chooser );
    //get random episode ID
    var episode = getRandomEpisode( selectedValues, json );
    //add episode to suggestedEpisode div
    var sediv = document.getElementById('suggestedEpisode');
    sediv.innerHTML = sediv.innerHTML + episode;
  };
}

//function to get an array of all selected options
function getSelectedOptions( chooser ) {
  var selectedValues = [],
    value;
  // loop through options in select list
  for ( var i=0, len=chooser.options.length; i < len; i++ ) {
    value = chooser.options[i];
    // check if selected
    if ( value.selected && value.value ) {
      // add to array of option elements to return from this function
      selectedValues.push( value.value );
    }
  }
  // return array containing references to selected option elements
  return selectedValues;
}

//function to get the id of an random episode
function getRandomEpisode( selectedValues, json ) {
  //get one random series from the selected series
  var series = selectedValues[Math.floor( Math.random() * selectedValues.length )];
  var episodes = json[series]['Episodes'];
  //get one random episode from the series defined before
  var episode = episodes[Math.floor( Math.random() * episodes.length )];
  return episode;
}
