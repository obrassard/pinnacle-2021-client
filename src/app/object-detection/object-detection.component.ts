import { Component, ViewChild, ElementRef, AfterViewInit, ModuleWithComponentFactories } from '@angular/core';
//import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';

//import COCO-SSD model as cocoSSD
import * as cocoSSD from '@tensorflow-models/coco-ssd';

@Component({
  selector: 'app-root',
  templateUrl: './object-detection.component.html',
  styleUrls: ['./object-detection.component.scss']
})
export class ObjectDetectionComponent implements AfterViewInit{
  WIDTH = 1500;
  HEIGHT = 500;

  @ViewChild("video")
  public video!: ElementRef;

  @ViewChild("canvas")
  public canvas!: ElementRef;

  error: any;


  async ngAfterViewInit() {
    await this.setupDevices();
    this.predictWithCocoModel();
  }

  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        this.HEIGHT = stream.getVideoTracks()[0].getSettings().height!;
        this.WIDTH = stream.getVideoTracks()[0].getSettings().width!;
        if (stream) {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
          this.error = null;
        } else {
          this.error = "You have no webcam";
        }
      } catch (e) {
        this.error = e;
      }
    }
  }

  public async predictWithCocoModel()
  {
    const config :cocoSSD.ModelConfig  = {base:'lite_mobilenet_v2'};
    const model = await cocoSSD.load(config);
    this.detectFrame(this.video.nativeElement as HTMLVideoElement,model);
    
  }

  detectFrame = (video: HTMLVideoElement, model: cocoSSD.ObjectDetection) => {
    model.detect(video).then(predictions => {
      console.log(predictions)
    this.renderPredictions(predictions);
    requestAnimationFrame(() => {
      this.detectFrame(video, model);});
    });
  }
  renderPredictions = (predictions: cocoSSD.DetectedObject[]) => {  
    const videoElem = this.video.nativeElement as HTMLVideoElement;
    const ctx = this.canvas.nativeElement.getContext("2d");  
    this.canvas.nativeElement.width  = this.WIDTH;
    this.canvas.nativeElement.height = this.HEIGHT;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);  // Fonts
    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";
    
    ctx.drawImage(videoElem,0, 0,videoElem.width,videoElem.height);
    predictions.forEach(prediction => {  
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      const width = prediction.bbox[2];
      const height = prediction.bbox[3];  // Bounding box
      ctx.strokeStyle = "#00FFFF";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);  // Label background
      ctx.fillStyle = "#00FFFF";
      const textWidth = ctx.measureText(prediction.class).width;
      const textHeight = parseInt(font, 10); // base 10
      ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
    });
    predictions.forEach(prediction => {
    
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];  
      ctx.fillStyle = "#000000";
      ctx.fillText(prediction.class, x, y);
    });
  };

  
}



