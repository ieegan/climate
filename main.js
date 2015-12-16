$( document ).ready(function() {
  var month,year,timezone,interval;
  var jqxhr = $.getJSON( "project.json", function(data) {
    document.title = data.name;
    month = data.month;
    year = data.year;
    timezone = data.timezone;
  })
  .done(function(data) {
    $.each(data.calendar,function(){
      var name = this.name;
      var place = this.place;
      var date = this.date;
      var color = this.color;
      $('.calendar').append('<ul><li data-color="'+color+'"><a>'+date+' '+month+'</a><span><p><a>'+name+'</a><a>'+place+'</a></p></span></li><ol></ol></ul>');
      $.each(this.events,function(){
        var name = this.name;
        var person = this.person;
        var time = this.time;
        var timeclass = time.replace(":", "");
        var timestamp = new Date(month+' '+date+', '+year+' '+time+':00 '+timezone);
        $('ul:last-child>ol','.calendar').append('<li data-color="'+color+'" class="'+timeclass+'" data-date="'+timestamp+'"><span><strong>'+time+'</strong><p><a>'+name+'</a></p></span></li>');
        if(person)
        $('li.'+timeclass+'>span p','.calendar>ul:last-child>ol').append('<a>'+person+'</a>');
      })
    });
  })
  .fail(function() {
  console.log( "error" );
  })
  .always(function() {
    $('.holder').on( "mousemove", function( event ) {
      clearInterval(interval);
      var variable = position(event.pageX);
      $('.calendar').css('left',variable);
    });
    var interval = setInterval(function(){
      var current = new Date();
      var boolean = true;
      $('.calendar>ul>ol>li').each(function(){
        if(boolean){
          var date = $(this).data('date');
          date = new Date(date);
          if(date.getTime() > current.getTime()){
            var offset = $(this).prev().offset();
            var variable = position((offset.left)/($('.calendar').width())*($('.holder').width()));
            if($(this).hasClass('active')){
              var activedate = $('.calendar>ul>ol>li.active').data('date');
              activedate = new Date(activedate);
              if(activedate.getTime() != date.getTime())
              $('.calendar>ul>ol>li').removeClass('active');
            }
            if(!$(this).prev().hasClass('active')){
                $('.calendar').css('left',variable);
            }
            $(this).prev().addClass('active');
            boolean = false;
          }
        }
      });
    },1000);
  });
});
function position(coordinate){
  var x = $('.holder').width();
  var y = $('.calendar').width();
  var z = y-x;
  var variable = z * (coordinate) / x * -1;
  return variable;
}
