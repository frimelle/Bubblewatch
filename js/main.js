function series( json ) {

  clickWithoutCtrl();

  var chooser = document.getElementById( 'serieslist' );
  //set size to number of series in json
  chooser.size = json.length;

  //go over json and fill entityIds of series into array
  var seriesArray = []
  for ( var seriesKey in json ) {
    seriesArray.push(seriesKey);
  }
  outputSeriesTitel( seriesArray, chooser );

  //after click on button
  document.getElementById( "seriesbutton" ).onclick = function( e ) {
    var selectedValues = getSelectedOptions( chooser );
    if (selectedValues != "") {
      //get random episode ID
      var series = getRandomSeries( selectedValues, json )
      var episode = getRandomEpisode( series, json );
      outputLabel( series, episode );
    }
  };
}

//function to set the options and labels for the selection
function outputSeriesTitel( seriesArray, chooser ) {
  urlSeries = "https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&ids=" + seriesArray[0];
  for( var i = 1; i < seriesArray.length; i++) {
    urlSeries = urlSeries + "|" + seriesArray[i];
  }
  $.ajax({
    url: urlSeries,
    dataType: 'jsonp',
    success: function( results ){
      for( var i = 0; i < seriesArray.length; i++) {
        var labelSeries = results['entities'][seriesArray[i]]['labels']['en']['value'];
        chooser.options[i] = new Option( labelSeries, seriesArray[i] );
      }
    }
  })

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
  if (selectedValues.length <= 0) {
    return "";
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
    success: function( results ){
      //add label of episode to html
      var labelEpisode = results['entities'][episode]['labels']['en']['value'];
      var episodeTitelDiv = document.getElementById('suggestedEpisode');
      episodeTitelDiv.innerHTML = labelEpisode;
      //add label of series to html
      var labelSeries = results['entities'][series]['labels']['en']['value'];
      var seriesTitelDiv = document.getElementById('suggestedSeries');
      seriesTitelDiv.innerHTML = labelSeries;
      //add description to html if exists else clear div
      if ( results['entities'][episode]['descriptions'] && results['entities'][episode]['descriptions']['en'] ) {
        document.getElementById('description').innerHTML = "";
        var description = results['entities'][episode]['descriptions']['en']['value'];
        var descriptionDiv = document.getElementById('description');
        descriptionDiv.innerHTML = description;
      }
      else {
        document.getElementById('description').innerHTML = "";
      }
      //add image to html if exists else clear div
      if (results['entities'][series]['claims'] && results['entities'][series]['claims']['P18']) {
        document.getElementById('img').innerHTML = "";
        var imageTitel = results['entities'][series]['claims']['P18'][0]['mainsnak']['datavalue']['value'];
        imageTitel = imageTitel.split(' ').join('%20')
        imgSrc = "https://commons.wikimedia.org/w/thumb.php?f=" + imageTitel + "&w=400";
        $('#img').prepend('<img id="theImg" src=' + imgSrc + ' />')
      }
      else {
        document.getElementById('img').innerHTML = "";
      }
    }
  });
}

function clickWithoutCtrl() {
  $('select').bind("click", function (event, target) {

       event.preventDefault();
       var CurrentIndex = event.target.selectedIndex==undefined? $(event.target).index(): event.target.selectedIndex
       var CurrentOption = $("option:eq(" + CurrentIndex+ ")", $(this));
       if ($(CurrentOption).attr('data-selected') == undefined || $(CurrentOption).attr('data-selected') == 'false') {
           $(CurrentOption).attr('data-selected', true);
       }
       else {
           $(CurrentOption).prop('selected', false).attr('data-selected', false);
       }

       $("option", $(this)).not(CurrentOption).each(function (Index, OtherOption) {
           $(OtherOption).prop('selected', ($(OtherOption).attr('data-selected') == 'true') ? true : false);
       });
        return false;
   });
}
