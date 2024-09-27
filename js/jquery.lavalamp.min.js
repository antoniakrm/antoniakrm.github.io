(function($){
  $.fn.lavaLamp = function(o) {
    o = $.extend({fx: "linear", speed: 500, click: function() {}}, o || {});
    return this.each(function() {
      var $menu = $(this),
          $back = $('<li class="back"><div class="left"></div></li>').appendTo($menu),
          $li = $("li", this),
          curr = $("li.current", this)[0] || $($li[0]).addClass("current")[0];
      
      // Hover functionality
      $li.not(".back").hover(function() { 
        move(this);
      }, function() {
        move(curr);  // Moves back to the current element when not hovering
      });
      
      // Set the clicked element as the current one
      $li.click(function(e) {
        setCurr(this);
        return o.click.apply(this, [e, this]);
      });
      
      // Set the initial current element
      setCurr(curr);
      
      function setCurr(a) {
        // Calculate position and width for 'back' element
        $back.css({
          "left": a.offsetLeft + "px",
          "width": a.offsetWidth + "px"
        });
        curr = a;
      }
      
      function move(a) {
        // Smoothly animate the 'back' element
        $back.each(function() {
          $.dequeue(this, "fx");
        }).animate({
          width: a.offsetWidth,
          left: a.offsetLeft
        }, o.speed, o.fx);
      }
    });
  };
})(jQuery);
