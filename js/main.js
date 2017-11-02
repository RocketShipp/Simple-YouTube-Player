'use strict';

$(document).ready(function(){

  $('#results').hide();

  var videoHeight = ($('#embedCol').width() * .5625);

  $(window).on('resize', function(){
    videoHeight = ($('#embedCol').width() * .5625);
    $('#ytPlayer').attr('height', videoHeight);
  });

  // Simulates form submition
  $('#searchBar').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
  	if(keycode == '13'){
  		$('#searchBtn').trigger('click');
  	}
  });

  // Takes search terms and queries Youtube Data API
  $('#searchBtn').on('click', function(){
    // Search Youtube
    var searchTerm = $('#searchBar').val().replace(/ /g, '+');
    var apiKey = 'AIzaSyA8pBCdgvz7HuEeEeK1z8sLD-I06AVzTRE';
    $.ajax(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&order=relevance&q=${searchTerm}&type=video&videoEmbeddable=true&videoSyndicated=true&key=${apiKey}`, {
      success: function(response){
        response.items.forEach(function(result){
          $('#items').append(
            `<div class="ytResult" data-url="https://www.youtube.com/v/${result.id.videoId}"><span class="resultTitle">${result.snippet.title}</span><br/> ${result.snippet.channelTitle}</div>`
          );
        });
      }
    });
    $('#results').slideDown('fast');
  });

  // Selects a result to be embedded
  $('#items').on('click', '.ytResult', function(){
    $('#results').slideUp('fast');
    $('#items').html('');
    $('#embedCol').html(`
      <embed id="ytPlayer" width="100%" height="${videoHeight}" src="${$(this).data('url')}&autoplay=1" frameborder="0" type="application/vnd.adobe.flash-movie"></embed>
    `)
  })

  // Closes search results
  $('.closeButton').click(function(){
    $('#results').slideUp('fast');
    $('#items').html('');
  });
});
