$( document ).ready(function() {
  var jqxhr = $.getJSON( "project.json", function(data) {
    document.title = data.name;
    var month = data.month;
    var year = data.year;
  })
  .done(function(data) {
    $.each(data.calendar,function(){
      var name = this.name;
      var place = this.place;
      var date = this.date;
      var color = this.color;
      $('.calendar').append('<ul class="'+date+'"><li data-color="'+color+'"><a>'+date+'</a><span><p><a>'+name+'</a><a>'+place+'</a></p></span></li><ol></ol></ul>');
      $.each(this.events,function(){
        var name = this.name;
        var person = this.person;
        var time = this.time;
        var timeclass = time.replace(":", "");
        $('ul.'+date+'>ol','.calendar').append('<li data-color="'+color+'" class="'+timeclass+'"><span><strong>'+time+'</strong><p><a>'+name+'</a></p></span></li>');
        if(person)
        $('li.'+timeclass+'>span p','ul.'+date+'>ol').append('<a>'+person+'</a>');
      })
    });
  })
  .fail(function() {
  console.log( "error" );
  })
  .always(function() {
    $('.holder').on( "mousemove", function( event ) {
      var x = $('.holder').width();
      var y = $('.calendar').width();
      var z = y-x;
      var variable = z * (event.pageX) / x * -1;
      $('.calendar').css('left',variable);
    });
  });
});
