import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { UtilityService } from ".";
import { IHttpResponse } from "../interfaces";

@Injectable()
export class HttpService {
    
    private readonly baseAPIUrl: string = '';

    private readonly headers: any = {
        headers: {
            'Authorization': ''
        }
    };

    constructor(public httpClient: HttpClient, private _utilityContext: UtilityService) {
        if (this._utilityContext.getValueFromKey('token')) {
            localStorage.setItem('token', this._utilityContext.getValueFromKey('token'));
        }

        this.baseAPIUrl = environment.apiBaseUrl;

        // Aetting token to headers if exists
        if(localStorage.getItem('token')) {
            this.headers.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;;
        }
    }

    private readonly responseHandler = (dbResponse: any): IHttpResponse => {
        return {
            id: dbResponse.id,
            data: dbResponse.data,
            message: dbResponse.message
        };
    };

    private readonly errorHandler = (error: HttpErrorResponse): any => {
        if(error.status === 401) {
            window.alert(`${error.message}, redirecting to login page`);
            localStorage.removeItem('token');
            window.location.assign(environment.websiteURL);
        }
        return this.responseHandler({
            id: 0,
            data: null,
            message: error.message
        });
    }

    public get(url: string, options?: any): Observable<IHttpResponse> {

        // Making absolute url
        url = `${this.baseAPIUrl}/${url}`;

        this.headers.headers["Content-Type"] = 'application/json';

        options = options ?? this.headers;

        return this.httpClient.get(url, options)
            .pipe(
                map((response: any) => this.responseHandler(response))
            ).pipe(catchError((err: HttpErrorResponse) => {
                return throwError(this.errorHandler(err));
            }));
    }

    public post(url: string, data: any, options?: any): Observable<IHttpResponse> {

        // Making absolute url
        url = `${this.baseAPIUrl}/${url}`;

        this.headers.headers["Content-Type"] = 'application/json';

        options = options ?? this.headers;

        return this.httpClient.post(url, data, options)
            .pipe(
                map((response: any) => this.responseHandler(response))
            ).pipe(catchError((err: HttpErrorResponse) => {
                return throwError(this.errorHandler(err));
            }));
    }

    public postFiles(url: string, files: any, options?: any): Observable<IHttpResponse> {

        // Making absolute url
        url = `${this.baseAPIUrl}/${url}`;

        if (!files || files.length === 0) {
            throw Error('Please select file to upload');
        };
        var formData = new FormData();
        for (var i = 0; i < files.length; i++) {
            formData.append(files[i].name, files[i]);
            formData.append(`fileTypeRow${i}`, files[i].fileTypeRowID);
        };

        options = options ?? this.headers;
        delete options.headers['Content-Type'];

        return this.httpClient.post(url, formData, options)
            .pipe(
                map((response: any) => this.responseHandler(response))
            ).pipe(catchError((err: HttpErrorResponse) => {
                return throwError(this.errorHandler(err));
            }));
    }

}