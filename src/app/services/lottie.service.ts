import { Injectable } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Injectable({
    providedIn: 'root'
})
export class LottieService {

    loading: AnimationOptions = {
        path: '/assets/lottie/loading.json',
        autoplay: true,
        loop: true
    };
}
