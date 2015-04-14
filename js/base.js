$(function(){
	(function chushihua(){
		var divs ='';
		for( var i=0; i<14; i++){
			for(var j=0; j<14; j++){
				divs += '<div id="'+i+'_'+j+'" class="block"></div>';
			}
		}
		$('.container').append(divs);
		she = ['#0_0','#0_1','#0_2'];
		xianShiShe();
	})();

	//右移动
	function youyidong(){
		for(var i=0; i<she.length;i++){
			var n = parseInt(she[i].split('_')[1]) + 1;
			if (n >=14){
				alert('撞了');
				clearInterval(t);
				return;
			}
			she[i] = she[i].split('_')[0] +'_'+ String(n);
		}
		xianShiShe();
	}

	//左移动
	function zuoyidong(){
		for(var i=0;i<she.length;i++){
			var n = parseInt(she[i].split('_')[1]) - 1;
			if(n<0){
				alert('撞了');
				clearInterval(t);
				return;
			}
			she[i] = she[i].split('_')[0] +'_'+ String(n);
		}
		xianShiShe();
	}
	//下移动
	function xiayidong(){
		for(var i=0;i<she.length;i++){
			var n = parseInt( she[i].split('_')[0].slice(1) ) + 1;

			if(n>=14){
				clearInterval(t);
				alert('撞了');
				return;
			}
			she[i] = '#' + n + '_' + she[i].split('_')[1];
		}
		xianShiShe();
	}
	//上移动
	function shangyidong(){
		for(var i=0;i<she.length;i++){
			var n = parseInt( she[i].split('_')[0].slice(1) ) - 1;

			if(n<0){
				clearInterval(t);
				alert('撞了');
				return;
			}
			she[i] = '#' + n + '_' + she[i].split('_')[1];
		}
		xianShiShe();
	}



	//让蛇出现
	function xianShiShe(){
		$('.she').css('background-color','white');
		$('.she').removeClass('she');
		for(var i=0; i<she.length;i++){
			$(she[i]).addClass('she');
			$(she[i]).css('background-color','#cb5953');
		}
	}

	var t;
	var fangxiang;
	$(document).keydown(function(e){
		switch(e.which){
			case 37:
				if(fangxiang == 'you'){
					return;
				}

				clearInterval(t);
				t = setInterval(zuoyidong,300);
				fangxiang = 'zuo';
				break;
			case 38:
				if(fangxiang == 'xia'){
					return;
				}
				clearInterval(t);
				t = setInterval(shangyidong,300);
				fangxiang = 'shang';
				break;
			case 39:
				if(fangxiang == 'zuo'){
					return;
				}
				clearInterval(t);
				t = setInterval(youyidong,300);
				fangxiang = 'you';
				break;
			case 40:
				if(fangxiang == 'shang'){
					return;
				}


				clearInterval(t);
				t = setInterval(xiayidong,300);
				fangxiang = 'xia';
				break;
		}
	})

	function you_to_xia(){
		//从右向下的情况
		//00  01 02
		//01  02 12
		//02  12 13
		//12  13 14
		//从左向下的情况
		//00 01 02
		//10 00 01
		//11 10 00
		//12 11 10
		//从上向左
		//45 35 25
		//44 45 35
		she  = she.slice(1)
		she = she.push('')

		xianshishe();
	}
})
