(function($){
  $.fn.extend({
    snake:function(){
      var
      that = this,

      row = 20,
      tmplate = '<div class="block"></div>',
      restart = $('<div class="restart"></div>'),

      snake = [],
      map = {},
      food,

      timer,

      R = 'right', L = 'left', U = 'up', D = 'down',
      direct,

      dir2num = { 'right':39 , 'left':37 , 'up':38, 'down':40 },
      num2dir = { 39:'right' , 37:'left' , 38:'up', 40:'down' },

      blocks;

      var pos2el = function (pos) {
        var index = pos.x * row + pos.y;
        return blocks.eq(index);
      }

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

      var move = function () {
        var od = snake[ snake.length - 1 ],nw;
        switch (direct) {
          case R:
            nw = { x : od.x , y : od.y + 1 };
            break;
          case L:
            nw = { x : od.x , y : od.y - 1 };
            break;
          case U:
            nw = { y : od.y , x : od.x - 1 };
            break;
          case D:
            nw = { y : od.y , x : od.x + 1 };
            break;
          default:
          return;
        }

        if( nw.x < 0  || nw.y < 0  ||
            nw.x > 19 || nw.y > 19 ||
            map[ nw.x + '-' + nw.y ]
          )
        {
          clearInterval(timer);
          that.trigger('start');
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

      var togglemove = function () {
        if(timer){
          clearInterval(timer);
          timer = null;
        }else{
          timer = setInterval(move,100);
        }
      }

      touch.on( this, 'doubletap ',togglemove);

      $( document ).keydown( function( e ){
        e.preventDefault();

        if ( e.keyCode === 32 ){
          togglemove();
          return;
        }

        if( Math.abs( e.keyCode - dir2num[ direct ] ) === 2 ){
          return;
        }
        if( !( e.keyCode >= 37 && e.keyCode <= 40 ) ){
          return;
        }
        if(!timer){
          timer = setInterval(move,100);
        }
        direct = num2dir[e.keyCode];
      })

      touch.on( this ,'swipe', function(e){
        e.preventDefault();
        if( Math.abs( dir2num[e.direction] - dir2num[direct] ) === 2 ){
          return;
        }
        direct =  e.direction;
      })


      this.bind('draw',function(){
        for (var i = 0,html=''; i < row*row; i++) {
          html += tmplate;
        }
        $(this).html(html);
        blocks = $('#snake .block');
      })
      this.trigger('draw');


      this.bind('start',function(){
        $(this).find('.snake').removeClass('snake');
        $(this).find('.food').removeClass('food');

        snake = [ {x:0,y:0},{x:0,y:1},{x:0,y:2} ];

        map   = {'0-0':true,'0-1':true,'0-2':true};

        snake.forEach(function (v) {
          pos2el(v).addClass('snake');
        })

        food = dropFood();
        direct = R;

        timer = setInterval(move,100);
      });
      this.trigger('start');

    }
  })
})(jQuery)
