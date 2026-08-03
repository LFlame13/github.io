$(document).ready(function() {
  var spacing = 190;

  function createControl(src) {
    return $('<img/>')
      .attr('src', src)
      .addClass('control')
      .css('opacity', 0.6)
      .css('display', 'none');
  }
      
  var $leftRollover = createControl('images/left.gif');
  var $rightRollover = createControl('images/right.gif');
  var $enlargeRollover = createControl('images/enlarge.gif');
  var $enlargedCover = $('<img/>')
    .addClass('enlarged')
    .hide()
    .appendTo('body');
  
  $('#featured-books').css({
    'width': spacing * 3,
    'height': '190px',
    'top': '-5px',
    'overflow': 'hidden'
  }).find('.covers a').css({
    'float': 'none',
    'position': 'absolute',
    'left': 1000
  });     

  var setUpCovers = function() {
    var $covers = $('#featured-books .covers a');

    $covers.unbind('click mouseenter mouseleave');

    // Ћевое изображение - сдвинуть вправо
    // (чтобы просмотреть изображени€ слева).
    $covers.eq(0)
      .css('left', 0)
      .click(function(event) {
        $covers.eq(0).animate({'left': spacing}, 'fast');
        $covers.eq(1).animate({'left': spacing * 2}, 'fast');
        $covers.eq(2).animate({'left': spacing * 3}, 'fast');
        $covers.eq($covers.length - 1)
          .css('left', -spacing)
          .animate({'left': 0}, 'fast', function() {
           $(this).prependTo('#featured-books .covers');
           setUpCovers();
          });

        event.preventDefault();
      }).hover(function() {
        $leftRollover.appendTo(this).show();
      }, function() {
        $leftRollover.hide();
      });

    // ѕравое изображение - сдвинуть влево
    // (чтобы просмотреть изображени€ справа).
    $covers.eq(2)
      .css('left', spacing * 2)
      .click(function(event) {
        $covers.eq(0)
          .animate({'left': -spacing}, 'fast', function() {
            $(this).appendTo('#featured-books .covers');
            setUpCovers();
          });
        $covers.eq(1).animate({'left': 0}, 'fast');
        $covers.eq(2).animate({'left': spacing}, 'fast');
        $covers.eq(3)
          .css('left', spacing * 3)
          .animate({'left': spacing * 2}, 'fast');

        event.preventDefault();
      }).hover(function() {
        $rightRollover.appendTo(this).show();
      }, function() {
        $rightRollover.hide();
      });

    // ÷ентральное изображение; увеличенна€ верси€.
    $covers.eq(1)
      .css('left', spacing)
      .click(function(event) {
        $enlargedCover.attr('src', $(this).attr('href'))
          .css({
            'left': $('body').width()/2 - 150,
            'top' : $('body').height()/2 - 250,
            'width': 300,
            'height': 300
          })
          .show()
          .one('click', function() {
            $enlargedCover.fadeOut();
          });
        event.preventDefault();
      })
      .hover(function() {
        $enlargeRollover.appendTo(this).show();
      }, function() {
        $enlargeRollover.hide();
      });
  };

  setUpCovers();
});


//ƒобавка
