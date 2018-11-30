(function($) {
    var selectors = [];
  
    var check_binded = false;
    var check_lock = false;
    var defaults = {
      interval: 250,
      force_process: false
    }
    var $window = $(window);
  
    var $prior_appeared;
  
    function process() {
      check_lock = false;
      for (var index = 0; index < selectors.length; index++) {
        var $appeared = $(selectors[index]).filter(function() {
          return $(this).is(':appeared');
        });
  
        $appeared.trigger('appear', [$appeared]);
  
        if ($prior_appeared) {
          
          var $disappeared = $prior_appeared.not($appeared);
          $disappeared.trigger('disappear', [$disappeared]);
        }
        $prior_appeared = $appeared;
      }
    }
  
    // "appeared" custom filter
    $.expr[':']['appeared'] = function(element) {
      var $element = $(element);
      if (!$element.is(':visible')) {
        return false;
      }
  
      var window_left = $window.scrollLeft();
      var window_top = $window.scrollTop();
      var offset = $element.offset();
      var left = offset.left;
      var top = offset.top;
  
      if (top + $element.height() >= window_top &&
          top - ($element.data('appear-top-offset') || 0) <= window_top + $window.height() &&
          left + $element.width() >= window_left &&
          left - ($element.data('appear-left-offset') || 0) <= window_left + $window.width()) {
        return true;
      } else {
        return false;
      }
    }
  
    $.fn.extend({
      // watching for element's appearance in browser viewport
      appear: function(options) {
        var opts = $.extend({}, defaults, options || {});
        var selector = this.selector || this;
        if (!check_binded) {
          var on_check = function() {
            if (check_lock) {
              return;
            }
            check_lock = true;
  
            setTimeout(process, opts.interval);
          };
  
          $(window).scroll(on_check).resize(on_check);
          check_binded = true;
        }
  
        if (opts.force_process) {
          setTimeout(process, opts.interval);
        }
        selectors.push(selector);
        return $(selector);
      }
    });
  
    $.extend({
      // force elements's appearance check
      force_appear: function() {
        if (check_binded) {
          process();
          return true;
        };
        return false;
      }
    });
  })(jQuery);
  


  (function($){
    '$:nomunge'; // Used by YUI compressor.
    
    var cache = {},
      
      // Reused internal string.
      doTimeout = 'doTimeout',
      
      // A convenient shortcut.
      aps = Array.prototype.slice;

      $[doTimeout] = function() {
        return p_doTimeout.apply( window, [ 0 ].concat( aps.call( arguments ) ) );
      };
      
$('.animatedParent').appear();
$('.animatedClick').click(function(){
  var target = $(this).attr('data-target');

  
  if($(this).attr('data-sequence') != undefined){
    var firstId = $("."+target+":first").attr('data-id');
    var lastId = $("."+target+":last").attr('data-id');
    var number = firstId;

    //Add or remove the class
    if($("."+target+"[data-id="+ number +"]").hasClass('go')){
      $("."+target+"[data-id="+ number +"]").addClass('goAway');
      $("."+target+"[data-id="+ number +"]").removeClass('go');
    }else{
      $("."+target+"[data-id="+ number +"]").addClass('go');
      $("."+target+"[data-id="+ number +"]").removeClass('goAway');
    }
    number ++;
    delay = Number($(this).attr('data-sequence'));
    $.doTimeout(delay, function(){
      console.log(lastId);
      
      //Add or remove the class
      if($("."+target+"[data-id="+ number +"]").hasClass('go')){
        $("."+target+"[data-id="+ number +"]").addClass('goAway');
        $("."+target+"[data-id="+ number +"]").removeClass('go');
      }else{
        $("."+target+"[data-id="+ number +"]").addClass('go');
        $("."+target+"[data-id="+ number +"]").removeClass('goAway');
      }

      //increment
      ++number;

      //continute looping till reached last ID
      if(number <= lastId){return true;}
    });
  }else{
    if($('.'+target).hasClass('go')){
      $('.'+target).addClass('goAway');
      $('.'+target).removeClass('go');
    }else{
      $('.'+target).addClass('go');
      $('.'+target).removeClass('goAway');
    }
  } 
});

$(document.body).on('appear', '.animatedParent', function(e, $affected){
  var ele = $(this).find('.animated');
  var parent = $(this);
  

  if(parent.attr('data-sequence') != undefined){
    
    var firstId = $(this).find('.animated:first').attr('data-id');
    var number = firstId;
    var lastId = $(this).find('.animated:last').attr('data-id');

    $(parent).find(".animated[data-id="+ number +"]").addClass('go');
    number ++;
    delay = Number(parent.attr('data-sequence'));

    $.doTimeout(delay, function(){
      $(parent).find(".animated[data-id="+ number +"]").addClass('go');
      ++number;
      if(number <= lastId){return true;}
    });
  }else{
    ele.addClass('go');
  }
  
});

 $(document.body).on('disappear', '.animatedParent', function(e, $affected) {
  if(!$(this).hasClass('animateOnce')){
    $(this).find('.animated').removeClass('go');
   }
 });

 $(window).on('load',function(){
  $.force_appear();
 });