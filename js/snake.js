window.onload = function(){
  function $(id){
    return  d.getElementById(id);
  }
  function init(){
    el = $('container'); el.style.width = ROW*20 + ROW +'px';
    for(var i=0;i<ROW;i++){
      for(var j=0; j<ROW;j++){
        var e = d.createElement('div');
        e.setAttribute('class','block');
        e.setAttribute('id', i+'-'+j);
        el.appendChild(e);
      }
    }
    for(var i=0;i<snake.length; i++){
      $(join(snake[i])).style.background = 'red';
    }
  };
  function join(i){
    return i[0]+ '-' + i[1];
  }
  function panduan(x,y){
    for(var i=0;i<snake.length;i++){
      if(x == snake[i][0] && y == snake[i][1]){
        return true;
      }
    }
    return false;
  }
  function dropfood(){
    var x = Math.floor(Math.random()*ROW);
    var y = Math.floor(Math.random()*ROW);
    while(panduan(x,y)){
      x = Math.floor(Math.random()*ROW);
      y = Math.floor(Math.random()*ROW);
    }
    $(join([x,y])).style.background = 'blue';
    return [x,y];
  }
  function move(){
    var head = snake[snake.length-1],new_head;
    if(direction == LEFT)  new_head = [ head[0],head[1]+1];
    if(direction == RIGHT) new_head = [ head[0],head[1]-1];
    if(direction == UP)    new_head = [ head[0]-1,head[1]];
    if(direction == DOWN)  new_head = [ head[0]+1,head[1]];
    if(panduan(new_head[0],new_head[1]) || new_head[0]<0||new_head[1]<0||new_head[0]>ROW-1||new_head[1]>ROW-1){
      clearInterval(timerId);
      gamestate = OVER;
      return;
    }
    snake.push(new_head);
    $( join(new_head)).style.background = 'red';
    if(new_head[0]==food[0] && new_head[1]==food[1]){
      food = dropfood();
      return;
    }
    $( join(snake.shift()) ).style.background = 'white';
  }
  function pause(){
    clearInterval(timerId);
    gamestate = PAUSE;
  }
  function restart(){
    for(var i = 0; i< snake.length; i++){
      $(join(snake[i])).style.background = 'white';
    }
    $(join(food)).style.background = 'white';
    direction = LEFT;
    snake = [[0,0],[0,1],[0,2]];
    for(var i =0; i<snake.length; i++){
      $(join(snake[i])).style.background = 'red';
    }
    start();
    food = dropfood();
  }
  function keydownHandle(ev){
    if((gamestate == OVER)&& (ev.keyCode == 82) ){
      restart();
    }
    if(ev.keyCode == 32){//空格暂停
      if(gamestate == PLAY){
        pause();
      }else if(gamestate == PAUSE){
        start();
      }
    }
    if(Math.abs(direction-ev.keyCode) == 2){
      return;
    }
    if((ev.keyCode == LEFT ||
        ev.keyCode == RIGHT ||
        ev.keyCode == UP ||
        ev.keyCode == DOWN) &&
       !(gamestate == OVER)
      ){
        if(gamestate == PAUSE){
          return;
        }
        direction = ev.keyCode;
        clearInterval(timerId);
        move();
      }
  }
  function keyupHandle(ev){
    if(gamestate == PAUSE){return;}
    if(!(gamestate == OVER)){
      start();
    }
  }
  function start(){
    clearInterval(timerId);
    timerId  = setInterval(move,timer);
    gamestate = PLAY;
  };

  var
  d = document,
  snake = [[0,0],[0,1],[0,2]],
  ROW= 14,
  timer = 100, timerId = 1,
  LEFT = 39, RIGHT = 37, UP = 38, DOWN = 40,
  OVER = 1, PAUSE = 2, PLAY = 3;
  direction = LEFT,
  gamestate = PLAY;
  d.onkeydown = keydownHandle,
  d.onkeyup = keyupHandle,
  init();
  food = dropfood();
  start();

};
