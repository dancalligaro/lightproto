$(function(){

	var canvas = $('#puntos');
	canvas[0].height = canvas.parent().height();
	canvas[0].width = canvas.parent().width();
	var ctx = canvas.get(0).getContext('2d');

	window.drawIt = function(firstI){
		ctx.clearRect(0,0,canvas[0].width,canvas[0].height);

		var ix = 0;
		for(var i = 0; i<60 ; i++){
			for(var j = 0; j<80; j++){
				ix++;
				//draw a circle

				ctx.beginPath();
				if(firstI.x == j && firstI.y==i){
					ctx.fillStyle = "red";
					ctx.arc((80-j) * 10 , i*10 + 10, 15, 0, Math.PI*2, true);
				}else{
					ctx.fillStyle = "black";
					ctx.arc((80-j) * 10 , i*10 + 10, 3, 0, Math.PI*2, true);
				}
				ctx.closePath();
				ctx.fill();			
				//if(ix==firstI)ctx.strokeStyle = "black";
			}
		}
	}


});


$(function(){

	window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

	navigator.getMedia = ( navigator.getUserMedia ||
	                       navigator.webkitGetUserMedia ||
	                       navigator.mozGetUserMedia ||
	                       navigator.msGetUserMedia);

	var video = document.getElementById('videoEl');
	var videoCanvas = document.getElementById('videoCanvas');
	var videoCanvas2 = document.getElementById('videoCanvas2');

	var ctx = videoCanvas.getContext("2d");
	var ctx2 = videoCanvas2.getContext("2d");

	var SAMPLE_W = 80;
	var SAMPLE_H = 60;
	var count = 200;
	var width = SAMPLE_W * 4;
	var pixels;
	var len,i,j,d, x,y;
	var green;
	var level = 30;

	//Video 

	function snapshot(){
		var destImg = ctx2.createImageData(SAMPLE_W, SAMPLE_H);
		d = destImg.data;
		ctx.drawImage(video, 0, 0, SAMPLE_W, SAMPLE_H);
		p = ctx.getImageData(0, 0, SAMPLE_W, SAMPLE_H).data;
		var start;
		var firstI;
		var detectedPixels = 0;

		if(pixels){

			len=pixels.length;
			i=0;
			for(y=0;y<SAMPLE_H;y++){
				i = y * width;
				start = -1;

				for(x=0;x<SAMPLE_W;x++, i+=4){
					green = p[i+1] > pixels[i+1] ? p[i+1]-pixels[i+1] : pixels[i+1]-p[i+1];
					if(green>level){
						
						if(!firstI)firstI = {x:x,y:y};

						start=x;
						i = (y+1) * width;
						x = SAMPLE_W;
						
						do{
							i-=4;
							x--;
							green = p[i+1] > pixels[i+1] ? p[i+1]-pixels[i+1] : pixels[i+1]-p[i+1];
							d[i]=d[i+1]=d[i+2]= 0;
							d[i+3]=255;
						}while(x>start && green <=level);
						
						for(;x>=start;x--,i-=4){
							//green = p[i+1] > pixels[i+1] ? p[i+1]-pixels[i+1] : pixels[i+1]-p[i+1];
							d[i]=d[i+1]=d[i+2]= 255;
							d[i+3]=255;	
							detectedPixels++;
						}

						x = SAMPLE_W; //To go to next iteration

					}else{
						d[i]=d[i+1]=d[i+2]= 0;
						d[i+3]=255;
					}
					//d[i]=d[i+1]=d[i+2]= green > 15 ? green : 0;
					//d[i+3]=255;
				}
			}
			
			ctx2.putImageData(destImg,0,0)

		}


		pixels = p;

		if(detectedPixels > 200 && firstI){
			console.log(detectedPixels)
			window.drawIt(firstI);
		}
	}

	function videoError(){
		alert('video error');
	}

	// Not showing vendor prefixes or code that works cross-browser.
	navigator.getMedia({video: true}, function(stream) {

		if (video.mozSrcObject !== undefined) {
		  
		    video.mozSrcObject = stream;
		    video.play()
		    setTimeout(function(){
		      //requestAnimationFrame(snapshot);
		      setInterval(snapshot,100);
		    },1)
		} else {
			//video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
			video.src = window.URL.createObjectURL(stream);
			//requestAnimationFrame(snapshot);
			setInterval(snapshot,100);
		};
		
	}, videoError);

});



