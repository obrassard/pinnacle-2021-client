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
    quantity:number = 1;

    private barcodePicker?: ScanditSDK.BarcodePicker;

    @ViewChild("video")
    public video!: ElementRef;

    @ViewChild("canvas")
    public canvas!: ElementRef;

    error: any;
    lastPrediction?: string;
    lastAddedItem?: ItemInventory
    loading = true;
    stream?: MediaStream;
    selectedIndex?: number;

    async ngAfterViewInit() {
        await this.setupDevices();
        this.seUpBarCodeScanner();
        this.predictWithCocoModel().then(() => {
            this.loading = false;
        });
    }

    seUpBarCodeScanner(): void {
        ScanditSDK.configure("AeNAzGAQQZ7rGTtUBzWc5yIXcjRVLvW9BEmBURVia9qiTMSWIQ3kUNduBr2NZuewkHl9tY8HrUZBaVZOGDDGpng0DGOmWZGOM3fagS411ISPQZ/+hiQ2MO9Ezxo+De4H9kjVq98+xZ2EDmG1nQeqxfVg91JIZ82o1PWEiN5pAwwbfHnmvtx3bczFmTkMLo/qrAWkDH7Q4DF156t90L3RuAUagz2L+KIRv25hUB253j0WZMuiq/6jKcD0xryg/G3dmnTEWu0Nb2sQCcF8Fs4RxkJ7V3BBStVeU4XBhS3xC+eanHaImfrx51MNrMTI1HjKlclPcNyLHSNxrVMmyGq3k3v4HdZlvIokh5BAdNSyYV2gvmvmS5gx7Ys+v5xlhhrPRm/HASYtyTKOwaWxvw7LCZiELLOgsbrRqBQzJ7SKvuj6uzpaw9VnPngelQ9vIV1Dg+tZuOxcSX1l1cvDDs75WeNAZA/cmTWyTzbbXzEA9+hRVVNkvGnFnlxkuddWIv+Ip1A8lnfVsUmXkRA2R5ERdnI4rtZR4kMBxNfYuir58lHoKP1uk4NuXOPDP3GBSlP+EdWWsVqWyB3DOeWoNwUzQNOb0rp1trUCq747cTbyxqw4FkzrN+dZpKUxgySdUt0BmRAH6+ola0/XKI10zioh3EU3Jar8Z0KxhvmT4Clni6qbFGJHeft0ulz4wsjpR+lPYkFZRcwaEnim+oLnBDR/JdgTe2S0PteyqLrLmlCnlW6pncydaIFBjKtd/ikv0PdJvwe5eT46PCLRWWQi2FtH/SaHihyBAS+rEmmLmQLvSQ==", {
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
                    codeDuplicateFilter: 1000
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
                this.stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "environment" }
                });
                this.HEIGHT = this.stream.getVideoTracks()[0].getSettings().height!;
                this.WIDTH = this.stream.getVideoTracks()[0].getSettings().width!;
                if (this.stream) {
                    this.video.nativeElement.srcObject = this.stream;
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

            const facingMode:any = this.stream?.getVideoTracks()[0].getCapabilities().facingMode;
            if(facingMode != undefined){
                if (facingMode[0] as string != 'environment'){
                    //miror the position
                    x = this.WIDTH - x-width;
                }
            }
            
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
        this.quantity = 1
        this.selectedIndex = undefined;
        let item: Item = {
            upc: isUpc ? itemId : undefined,
            title: !isUpc ? itemId : undefined,
            quantity: this.quantity,
        }
        console.log(item)
        this.itemService.addNewItem(this.inventoryId, item).subscribe(itemInv => {
            console.log(itemInv);
            this.displayNotification(itemInv);
        });
    }
    displayNotification(itemInv: ItemInventory) {
        this.lastAddedItem = itemInv;
        this.addedSuccess = itemInv.title;
    }
    modifyQuantity(newQuantity:number){
        if(this.selectedIndex != newQuantity){
            this.selectedIndex = newQuantity;
            
            this.quantity = newQuantity
            this.itemService.modifyQuantityItem(newQuantity,this.lastAddedItem?.id as string).subscribe(() => {
                console.log("yay")
            });
        }
    }
}



