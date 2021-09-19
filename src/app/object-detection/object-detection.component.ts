import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import * as ScanditSDK from "scandit-sdk";
import { Barcode, ScanResult, ScanSettings } from "scandit-sdk";
import { UPCapiService } from './UPCapi/upcapi.service';
import { ItemService, ItemInventory, Item } from '../services/item.service';

//import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';

//import COCO-SSD model as cocoSSD
import * as cocoSSD from '@tensorflow-models/coco-ssd';
import { LottieService } from '../services/lottie.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment.prod';

@Component({
    selector: 'app-root',
    templateUrl: './object-detection.component.html',
    styleUrls: ['./object-detection.component.scss'],
    providers: [UPCapiService]
})
export class ObjectDetectionComponent implements AfterViewInit, OnDestroy {
    private inventoryId: string;

    constructor(private itemService: ItemService,
        route: ActivatedRoute, public animations: LottieService) {
        this.inventoryId = route.snapshot.params.id
    }

    WIDTH = 1500;
    HEIGHT = 500;

    addedSuccess?: String;
    addedError?: String;

    private barcodePicker?: ScanditSDK.BarcodePicker;

    @ViewChild("video")
    public video!: ElementRef;

    @ViewChild("canvas")
    public canvas!: ElementRef;

    error: any;
    lastPrediction?: string;
    loading = true;

    async ngAfterViewInit() {
        await this.setupDevices();
        this.seUpBarCodeScanner();
        this.predictWithCocoModel().then(() => {
            this.loading = false;
        });
    }

    seUpBarCodeScanner(): void {
        ScanditSDK.configure(environment.detection, {
            engineLocation: "https://cdn.jsdelivr.net/npm/scandit-sdk/build",
        }).then(() => {
            ScanditSDK.BarcodePicker.create(document.getElementById("scandit-barcode-picker")!, {
                playSoundOnScan: true,
                vibrateOnScan: true,
                hideLogo: true,
            }).then((barcodePicker) => {
                this.barcodePicker = barcodePicker;
                const scanSettings = new ScanSettings({
                    enabledSymbologies: [Barcode.Symbology.UPCA, Barcode.Symbology.EAN13],
                    codeDuplicateFilter: 1000,
                });

                barcodePicker.applyScanSettings(scanSettings);
                barcodePicker.on("scan", (s) => this.onScan(s));
            });
        });
    }

    ngOnDestroy(): void {
        this.barcodePicker?.destroy();
    }

    private onScan(result: ScanResult) {
        result.barcodes.forEach(barcode => {
            console.log(barcode.data);
            this.lastPrediction = undefined;
            this.sumbitItem(barcode.data, true);
        })
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


    async predictWithCocoModel() {
        const config: cocoSSD.ModelConfig = { base: 'lite_mobilenet_v2' };
        const model = await cocoSSD.load(config);
        this.detectFrame(this.video.nativeElement as HTMLVideoElement, model);

    }

    detectFrame(video: HTMLVideoElement, model: cocoSSD.ObjectDetection) {
        model.detect(video).then(predictions => {
            this.renderPredictions(predictions);
            requestAnimationFrame(() => {
                this.detectFrame(video, model);
            });
        });
    }

    renderPredictions(predictions: cocoSSD.DetectedObject[]) {
        const videoElem = this.video.nativeElement as HTMLVideoElement;
        const ctx = this.canvas.nativeElement.getContext("2d");
        this.canvas.nativeElement.width = this.WIDTH;
        this.canvas.nativeElement.height = this.HEIGHT;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);  // Fonts
        const font = "16px sans-serif";
        ctx.font = font;
        ctx.textBaseline = "top";

        const acceptedPrediction: String[] = ["cake", "donut", "pizza", "carrot", "broccoli", "orange", "sandwich", "apple", "banana"];

        //ctx.drawImage(videoElem,0, 0,videoElem.width,videoElem.height);
        predictions.forEach(prediction => {
            if (!acceptedPrediction.includes(prediction.class))
                return;

            let x = prediction.bbox[0];
            let y = prediction.bbox[1];

            const width = prediction.bbox[2];
            const height = prediction.bbox[3];  // Bounding box

            //miror the position
            //x = this.WIDTH - x-width;


            ctx.strokeStyle = "#00FFFF";
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, width, height);  // Label background
            ctx.fillStyle = "#00FFFF";
            const textWidth = ctx.measureText(prediction.class).width;
            const textHeight = parseInt(font, 10); // base 10
            ctx.fillRect(x, y, textWidth + 4, textHeight + 4);

            ctx.fillStyle = "#000000";
            ctx.fillText(prediction.class, x, y);

            if (this.lastPrediction != prediction.class) {
                this.lastPrediction = prediction.class;
                this.sumbitItem(prediction.class, false);
            }
        });
    }

    sumbitItem(itemId: string, isUpc: boolean) {

        let item: Item = {
            upc: isUpc ? itemId : undefined,
            title: !isUpc ? itemId : undefined,
            quantity: 1,
        }
        console.log(item)
        this.itemService.addNewItem(this.inventoryId, item).subscribe(itemInv => {
            console.log(itemInv);
            this.displayNotification(itemInv);
        });
    }
    displayNotification(itemInv: ItemInventory) {
        this.addedSuccess = itemInv.title;
    }
}



