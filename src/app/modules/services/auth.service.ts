import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { EndPoint } from "src/environments/endpoint";
import { HttpService } from ".";
import { ILogin, IResetPassword } from "../interfaces";
import { CanLoad, Route, UrlSegment, UrlTree } from "@angular/router";
@Injectable()
export class AuthService implements CanLoad {

    constructor(
        private httpContext: HttpService
    ) { }

    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return false;
    }

    public state: ILogin = { userName: '', password: '', loading: false };

    public postLogin(input: ILogin) {
        this.state.loading = true;
        return this.httpContext.post(EndPoint.POST_LOGIN, input)
            .pipe(map(response => {
                this.state.loaded = true;
                this.state.loading = false;
                this.state.message = response.message;
                localStorage.setItem('token', response.data);

                // Save remember me to storage

                localStorage.setItem('remember', `${input.remember}`);

                // Save user code as well
                if (input.remember) {
                    localStorage.setItem('userCode', input.userName);
                };

                //return this.state;
            })).pipe(catchError((err: any) => {
                this.state.loading = false;
                this.state.loaded = true;
                this.state.message = err.status === 0 ? err.statusText : err.error ? err.error.message : err.statusText;
                return throwError(err);
            }));
    }
    public postResetPassword(input: IResetPassword) {

        this.state.loading = true;
        return this.httpContext.post(EndPoint.RESET_PASSWORD, input)
            .pipe(map(response => {
                this.state.loaded = true;
                this.state.loading = false;
                this.state.message = response.message;
                this.state.id = response.id;
                localStorage.setItem('userCode', response.data)
                // Save remember me to storage


                // Redirect to dashboard


                //return this.state;
            })).pipe(catchError((err: any) => {
                this.state.loading = false;
                this.state.loaded = true;
                this.state.message = err.status === 0 ? err.statusText : err.error ? err.error.message : err.statusText;
                return throwError(err);
            }));


        // Save remember me to storage




    }
}