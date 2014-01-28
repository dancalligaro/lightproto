package
{
  import flash.external.ExternalInterface;
  import flash.display.Sprite;
  import flash.media.Camera;
  import flash.media.Video;
  import flash.display.BitmapData;
  import flash.utils.setInterval;
   import flash.text.*;
   import flash.events.StatusEvent;
   

  [SWF(frameRate='5', width='320', height='240', backgroundColor='#FFFFFF')]
  public class CameraRequest extends Sprite
  {
    protected var webcam:Camera;
    protected var video:Video;
    private var alreadyInit:Boolean = false;

    public function CameraRequest()
    {
    	ExternalInterface.addCallback("startCamera", startCamera);
    }

    public function startCamera(): void
    {
    	if(!alreadyInit){
    		alreadyInit = true;
    		openCamera(0);
    	}
    }

    public function openCamera(camIndex:int):void
    {
      webcam=Camera.getCamera();
      if (!webcam)
      {
      	ExternalInterface.call('flashWebcam.noWebcamAvailable');
      }else{
	      webcam.addEventListener(StatusEvent.STATUS, statusHandler); 
	      webcam.setMode(320, 240, 4);
	      video=new Video(320, 240);
	      video.attachCamera(webcam);
	      addChild(video);
	      ExternalInterface.call('console.log', 'camera loaded');
      }
    }

	public function statusHandler(event:StatusEvent):void 
	{ 
	    // This event gets dispatched when the user clicks the "Allow" or "Deny" 
	    // button in the Flash Player Settings dialog box. 
	    trace(event.code); // "Camera.Muted" or "Camera.Unmuted"
	    
	    ExternalInterface.call('flashWebcam.statusChanged', event.code);
	    
	     setInterval (watchPixels, 250);
	    
	}

	public function watchPixels():void{
	
		var bd:BitmapData = new BitmapData(320,240);
		var pixel:uint;
		
		bd.draw(video);

		var red:uint;
		var green:uint;
		var blue:uint;
		
		var sumLuminance:uint = 0;
		
		for( var j:int = 0; j < bd.height; j++ ){
		    for( var i:int = 0; i < bd.width; i++){
				pixel = bd.getPixel(i,j);
				red = pixel >> 16 & 0xFF;
				green = pixel >> 8 & 0xFF;
				blue = pixel & 0xFF;
	        	sumLuminance += 0.2126 * red + 0.7152 * green + 0.0722 * blue;
	        
		    }
		}
		
		ExternalInterface.call('flashWebcam.lightLevel', sumLuminance/(bd.height*bd.width));
	}

    /*public function drawCapture(image:BitmapData):void
    {
      image.draw(video);
    }
    */
  }
}

