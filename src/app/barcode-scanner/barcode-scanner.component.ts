import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import * as ScanditSDK from "scandit-sdk";
import { Barcode, ScanResult, ScanSettings } from "scandit-sdk";
import { UPCapiService } from './UPCapi/upcapi.service';

@Component({
    selector: 'app-barcode-scanner',
    templateUrl: './barcode-scanner.component.html',
    styleUrls: ['./barcode-scanner.component.scss'],
    providers: [UPCapiService]
})
export class BarcodeScannerComponent implements AfterViewInit, OnDestroy {

    private barcodePicker?: ScanditSDK.BarcodePicker;

    constructor(private upcService: UPCapiService) { }

    ngAfterViewInit(): void {
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
            //   this.upcService.getUPCdata(barcode.data).subscribe(upcData => {
            //     console.log(upcData);
            //   });
        })
    }
}
