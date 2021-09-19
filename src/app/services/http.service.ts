import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiHost: string = 'https://pinnacle-2021-api.azurewebsites.net/api';
// const apiHost: string = 'https://localhost:44363/api';

export abstract class HttpService {
    private defaultHeaders = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
    });

    constructor(
        protected http: HttpClient,
        protected endpoint: string = '',
        protected host: string = apiHost
    ) { }

    protected getAll<TResult>(
        path: string = '',
        requestOptions?: RequestOptions
    ): Observable<TResult[]> {
        return this.http.get<TResult[]>(this.urlFor(path), {
            headers: requestOptions?.headers ?? this.defaultHeaders,
            params: requestOptions?.params
        });
    }

    protected get<TResult>(
        path: string = '',
        requestOptions?: RequestOptions
    ): Observable<TResult> {
        return this.http.get<TResult>(this.urlFor(path), {
            headers: requestOptions?.headers ?? this.defaultHeaders,
            params: requestOptions?.params
        });
    }

    protected getString(path: string = '', requestOptions?: RequestOptions): Observable<string> {
        return this.http.get(this.urlFor(path), {
            headers: requestOptions?.headers ?? this.defaultHeaders,
            params: requestOptions?.params,
            observe: 'body',
            responseType: 'text'
        });
    }

    protected post<TRequest, TResult>(body: TRequest, path: string = '', requestOptions?: RequestOptions): Observable<TResult> {
        return this.http.post<TResult>(this.urlFor(path), body, {
            headers: requestOptions?.headers ?? this.defaultHeaders,
            params: requestOptions?.params
        });
    }

    protected postFormData<TResult>(formData: FormData, path: string = '', requestOptions?: RequestOptions): Observable<TResult> {
        return this.http.post<TResult>(this.urlFor(path), formData, {
            headers: requestOptions?.headers,
            params: requestOptions?.params
        });
    }

    protected put<TRequest, TResult>(body: TRequest, path: string = '', requestOptions?: RequestOptions): Observable<TResult> {
        return this.http.put<TResult>(this.urlFor(path), body, {
            headers: requestOptions?.headers ?? this.defaultHeaders,
            params: requestOptions?.params
        });
    }

    protected putFormData<TResult>(item: FormData, path: string = '', requestOptions?: RequestOptions): Observable<TResult> {
        return this.http.put<TResult>(this.urlFor(path), item, {
            headers: requestOptions?.headers,
            params: requestOptions?.params
        });
    }

    protected patch<TRequest, TResult>(body: TRequest, path: string = '', requestOptions?: RequestOptions): Observable<TResult> {
        return this.http.patch<TResult>(this.urlFor(path), body, {
            headers: requestOptions?.headers ?? this.defaultHeaders,
            params: requestOptions?.params
        });
    }

    protected patchFormData<TResult>(item: FormData, path: string = '', requestOptions?: RequestOptions): Observable<TResult> {
        return this.http.patch<TResult>(this.urlFor(path), item, {
            headers: requestOptions?.headers,
            params: requestOptions?.params
        });
    }

    protected delete<TResult>(path: string = '', requestOptions?: RequestOptions): Observable<TResult> {
        return this.http.delete<any>(this.urlFor(path), {
            headers: requestOptions?.headers,
            params: requestOptions?.params
        });
    }

    /**
     * Strip trailing slash on url
     *
     * @param url url
     */
    protected stripUrl(url: string): string {
        let route = url.split('https://')[1];
        return 'https://' + route.replace(/\/{2,}/, '/');
    }

    protected urlFor(path?: string): string {
        return this.stripUrl(`${this.host}/${this.endpoint}/${path}`);
    }
}

export interface RequestOptions {
    headers?: HttpHeaders;
    params?: HttpParams | { [key: string]: string };
}
