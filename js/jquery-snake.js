(function($){
  $.fn.extend({
    snake:function(){
      var
      row = 20,
      tmplate = '<div class="block"></div>';

      for (var i = 0,html=''; i < row*row; i++) {
        html += tmplate;
      }
      $(this).html(html);

      var blocks = $('#snake .block');
      var pos2el = function (pos) {
        var index = pos.x * row + pos.y;
        return blocks.eq(index);
      }

      var snake = [ {x:0,y:0},{x:0,y:1},{x:0,y:2} ];
      var map   = {'0-0':true,'0-1':true,'0-2':true};
      snake.forEach(function (v) {
        pos2el(v).addClass('snake');
      })

      var dropFood = function() {
        var pos = {}
        do{
          pos.x = Math.floor( Math.random()*row );
          pos.y = Math.floor( Math.random()*row );
        }
        while( map[ pos.x + '-' + pos.y ] );

        pos2el(pos).addClass('food');

        return pos;
      }
      var food = dropFood();


      var R = 'right', L = 'left', U = 'up', D = 'down';
      var direct =  R;

      var move = function () {
        var od = snake[ snake.length - 1 ],nw;
        switch (direct) {
          case R:
            nw = { x : od.x , y : od.y + 1 }; break;
          case L:
            nw = { x : od.x , y : od.y - 1 }; break;
          case U:
            nw = { y : od.y , x : od.x - 1 }; break;
          case D:
            nw = { y : od.y , x : od.x + 1 }; break;
          default:
          return;
        }

        if( nw.x < 0  || nw.y < 0  ||
            nw.x > 19 || nw.y > 19 ||
            map[ nw.x + '-' + nw.y ]
          )
        {
          clearInterval(timer);
          return;
        }

        if( nw.x === food.x && nw.y === food.y ){
          food = dropFood();
          pos2el(nw).removeClass('food');
        }else{
          var tail = snake.shift();
          delete map[ tail.x + '-' + tail.y ];
          pos2el(tail).removeClass('snake');
        }

        snake.push(nw)
        map[ nw.x + '-' + nw.y ] = true;
        pos2el(nw).addClass('snake');

      }

      $( document ).keydown( function( e ){
        e.preventDefault();
        var dir2num = { 'right':39 , 'left':37 , 'up':38, 'down':40 };
        var num2dir = { 39:'right' , 37:'left' , 38:'up', 40:'down' };
        if( Math.abs( e.keyCode - dir2num[ direct ] ) === 2 ){
          return;
        }
        if( !( e.keyCode >= 37 && e.keyCode <= 40 ) ){
          return;
        }
        direct = num2dir[e.keyCode];
      })
      var timer = setInterval(move,100);

      touch.on( '#snake' ,'swipe', function(e){
        e.preventDefault();
        if(e.direction){
          direct =  e.direction;
        }
      })

    }
  })
})(jQuery)
