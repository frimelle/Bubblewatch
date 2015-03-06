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
    var series = getRandomSeries( selectedValues, json )
    var episode = getRandomEpisode( series, json );
    outputLabel( series, episode );
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

//function to get the id of a random episode
function getRandomSeries( selectedValues, json ) {
  //get one random series from the selected series
  var series = selectedValues[Math.floor( Math.random() * selectedValues.length )];
  return series;
}

//function to get the id of an random episode
function getRandomEpisode( series, json ) {
  var episodes = json[series]['Episodes'];
  //get one random episode from the series defined before
  var episode = episodes[Math.floor( Math.random() * episodes.length )];
  return episode;
}

//connects to the Wikidata API to get the label for a given EntityID
function outputLabel( series, episode ) {
  $.ajax({
    url: "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=" + series + "|" + episode + "&format=json",
    dataType: 'jsonp',
    success: function(results){
      var labelSeries = results['entities'][series]['labels']['en']['value'];
      var labelEpisode = results['entities'][episode]['labels']['en']['value'];
      var description = results['entities'][episode]['descriptions']['en']['value'];
      //add episode to suggestedEpisode div
      var seriesTitelDiv = document.getElementById('suggestedSeries');
      var episodeTitelDiv = document.getElementById('suggestedEpisode');
      var descriptionDiv = document.getElementById('description');
      //var episodeTitelDiv = document.getElementById('imageEpisode');
      seriesTitelDiv.innerHTML = "";
      seriesTitelDiv.innerHTML = labelSeries;
      episodeTitelDiv.innerHTML = labelEpisode;
      descriptionDiv.innerHTML = description;
    }
  });
}
