$(function(){

	var canvas = $('#puntos');
	canvas[0].height = canvas.parent().height();
	canvas[0].width = canvas.parent().width();

	var ctx = canvas.get(0).getContext('2d');

	var ix = 0;
	for(var i = 1; i<50 ; i++){
		for(var j = 1; j<20; j++){
			ix++;
			//draw a circle
			ctx.beginPath();
			ctx.arc(i * 10 , j*10, 3, 0, Math.PI*2, true);
			ctx.closePath();
			ctx.fill();			
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

	var SAMPLE_W = 160;
	var SAMPLE_H = 120;
	var count = 200;
	var width = SAMPLE_W * 4;
	var pixels;
	var len,i,j,d, x,y;
	var green;
	//Video 
	function snapshot(){
		var destImg = ctx2.createImageData(SAMPLE_W, SAMPLE_H);
		d = destImg.data;
		ctx.drawImage(video, 0, 0, SAMPLE_W, SAMPLE_H);
		p = ctx.getImageData(0, 0, SAMPLE_W, SAMPLE_H).data;
		
		
		if(pixels){

			len=pixels.length;
			i=0;
			for(y=0;y<SAMPLE_H;y++){
				for(x=0;x<width;x++){
					i+=4;
					//d[i]=d[i+1]=d[i+2]= (30 > ~~(p[i+1]-pixels[i+1])) ? 255 : 0;
					green = p[i+1] > pixels[i+1] ? p[i+1]-pixels[i+1] : pixels[i+1]-p[i+1];
					d[i]=d[i+1]=d[i+2]= green > 15 ? green : 0;
					d[i+3]=255;

				}
			}
			// for(i=0;i<len;){
			// }
			
			ctx2.putImageData(destImg,0,0)

		}

		pixels = p;
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


$(function(){

	var canvas = $('#puntos');
	canvas[0].height = canvas.parent().height();
	canvas[0].width = canvas.parent().width();

	var ctx = canvas.get(0).getContext('2d');

	var ix = 0;
	for(var i = 1; i<50 ; i++){
		for(var j = 1; j<20; j++){
			ix++;
			//draw a circle
			ctx.beginPath();
			ctx.arc(i * 10 , j*10, 3, 0, Math.PI*2, true);
			ctx.closePath();
			ctx.fill();			
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

	var SAMPLE_W = 160;
	var SAMPLE_H = 120;
	var count = 200;
	var width = SAMPLE_W * 4;
	var pixels;
	var len,i,j,d, x,y;
	var green;
	//Video 
	function snapshot(){
		var destImg = ctx2.createImageData(SAMPLE_W, SAMPLE_H);
		d = destImg.data;
		ctx.drawImage(video, 0, 0, SAMPLE_W, SAMPLE_H);
		p = ctx.getImageData(0, 0, SAMPLE_W, SAMPLE_H).data;
		
		
		if(pixels){

			len=pixels.length;
			i=0;
			for(y=0;y<SAMPLE_H;y++){
				for(x=0;x<width;x++){
					i+=4;
					//d[i]=d[i+1]=d[i+2]= (30 > ~~(p[i+1]-pixels[i+1])) ? 255 : 0;
					green = p[i+1] > pixels[i+1] ? p[i+1]-pixels[i+1] : pixels[i+1]-p[i+1];
					d[i]=d[i+1]=d[i+2]= green > 15 ? green : 0;
					d[i+3]=255;

				}
			}
			// for(i=0;i<len;){
			// }
			
			ctx2.putImageData(destImg,0,0)

		}

		pixels = p;
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


