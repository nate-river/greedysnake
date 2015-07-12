$(function(){
    document.onkeydown = function(e){
	if(e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40){
	    if( Math.abs( e.keyCode - snake.derection) != 2 ){
			snake.derection = e.keyCode;
	    }
	}
    }
    function Snake(row){
	this.row = row||20;
	this.data = [{x:0,y:0},{x:0,y:1},{x:0,y:2}];
	this.derection = 40; //上下左右  38 40 37 39 
	this.drawSence();
	this.drawSelf();
    }
    //画场景
    Snake.prototype.drawSence = function(){
	$('.container').css({width:this.row * 20 + 'px', height:this.row * 20 + 'px'});
	for( var i=0; i<this.row; i++){
	    for(var j=0; j<this.row; j++){
		if( Math.random() > 0.991 ){
		    $('<div/>').attr('id','_'+ i +'_'+ j).addClass('block food').appendTo($('.container'));
		}else{
		    $('<div/>').attr('id','_'+ i +'_'+ j).addClass('block').appendTo($('.container'));
		}
	    }
	}
    }
    //画自己
    Snake.prototype.drawSelf = function(){
	$(".block").css('background','white');
	for ( var i = 0;  i < this.data.length;  i++){
	    $('#_'+ this.data[i].x+'_'+ this.data[i].y).css('background','red');
	}
    }
    Snake.prototype.move = function(){
	if( this.derection == 38 ){
	    var newHeadX = this.data[this.data.length-1].x - 1;
	    var newHeadY = this.data[this.data.length-1].y
	}
	if( this.derection == 40 ){
	    var newHeadX = this.data[this.data.length-1].x + 1;
	    var newHeadY = this.data[this.data.length-1].y
	}
	if( this.derection == 37 ){
	    var newHeadX = this.data[this.data.length-1].x
	    var newHeadY = this.data[this.data.length-1].y - 1;
	}
	if( this.derection == 39 ){
	    var newHeadX = this.data[this.data.length-1].x
	    var newHeadY = this.data[this.data.length-1].y + 1;
	}
	//判断撞墙
	if( (newHeadX > this.row-1) || (newHeadY > this.row-1) || (newHeadX < 0) || (newHeadY < 0) ){
	    return false;
	}
	//判断撞自己
	for ( var i = 0;  i < this.data.length;  i++){
	    if(  (newHeadX == this.data[i].x) && (newHeadY == this.data[i].y) ){
		return false;
	    }
	}
	//判断吃东西
	var selector = '#_'+newHeadX+'_'+newHeadY;
	if( $(selector).hasClass('food') ){
	    $(selector).removeClass('food');
	    //吃一个放一个
	    this.dropfood();
	}else{
	    this.data.shift();
	}
	this.data.push({x:newHeadX,y:newHeadY});
	this.drawSelf();
	return true;
    }
    Snake.prototype.dropfood = function(){
	var that = this;
	var _f = true;
	while(_f){
	    var x = Math.round( Math.random()*(this.row-1) );
	    var y = Math.round( Math.random()*(this.row-1) );
	    _f = function(){
		//不要把食物放到蛇身上
		for ( var i = 0;  i < that.data.length;  i++){
		    if(  ( x == that.data[i].x) && ( y == that.data[i].y) )
			return true;
		}
		return false;
	    }();
	}
	//不要把食物放到食物身上.....fuck...
	var selector = '#_'+x+'_'+y;
	while( $(selector).hasClass('food') ){
	    var x = Math.round( Math.random()*(this.row-1) );
	    var y = Math.round( Math.random()*(this.row-1) );
	    selector = '#_'+x+'_'+y;
	}
	$(selector).addClass('food');
    }
    Snake.prototype.start = function(){
	var that = this;
	this.intervalId = setInterval(function(){
	    if( !that.move() ){
		clearInterval(that.intervalId);
	    };
	},200);
    }
    var snake = new Snake();
    snake.start();
})
