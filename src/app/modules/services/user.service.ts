import { state } from "@angular/animations";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { of, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { EndPoint } from "src/environments/endpoint";
import { HttpService, UtilityService } from ".";
import { IChangePassword, IUpdateProfile, IUser, IViewState } from "../interfaces";


@Injectable()
export class UserService {

    state: IUser = { name: '', userCode: '' };
    state2: IViewState = {};


    constructor(
        private _httpService: HttpService,
        private _snackBar: MatSnackBar,
        private _utilityService: UtilityService
    ) { }

    public getUserBasicInfo() {

        // Set token in local storage if exists in query string
        return this._httpService.get(EndPoint.GET_BASIC_INFO)
            .pipe(map(response => {

                this.state.name = `${response.data.firstName} ${response.data.middleName} ${response.data.lastName}`;
                this.state.userCode = response.data.userCode;
                this.state.role = response.data.userRole;
                this.state.filePath = this._utilityService.filePathHandler(response.data.filePath);
                this.state.userFarmRowId = response.data.userFarmRowId;

                return this.state;
            }))
            .pipe(catchError(error => {
                return of(this.state);
            }))
    }

    public getUserDetails() {
        return this._httpService.get(EndPoint.GET_USER_DETAILS)
            .pipe(map(response => {

                this.state.name = `${response.data.firstName} ${response.data.middleName} ${response.data.lastName}`;
                this.state.userCode = response.data.userCode;
                this.state.email = response.data.email;
                this.state.contact1 = response.data.contact1;
                this.state.contact2 = response.data.contact2;
                this.state.whatsapp = response.data.whatsapp;
                this.state.role = response.data.userRole;
                this.state.filePath = this._utilityService.filePathHandler(response.data.filePath);
                this.state.farmCode = response.data.farmCode;
                this.state.farmName = response.data.farmName;
                this.state.farmAddress = response.data.farmAddress;

                return this.state;
            }))
            .pipe(catchError(error => {
                return of(this.state);
            }))

    }

    public UpdateProfileDetails(Input: IUpdateProfile) {

        this.state2.loading = true;
        return this._httpService.post(`${EndPoint.UPDATE_PROFILE_DETAILS}/${this.state.userCode}`, Input)
            .pipe(map(response => {
                this.state2.loading = false;
                this.state2.message = response.message;
                this._snackBar.open(response.message ? response.message : '', 'Ok',
                    { duration: 2000 },
                );
                if (response.id == 1) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
                return response;
            })).pipe(catchError((err: any) => {
                this.state2.loading = false;
                return throwError(err);
            }));
    }




    public changePassword(input: IChangePassword) {

        this.state2.loading = true;
        return this._httpService.post(`${EndPoint.UPDATE_PASSWORD}/${this.state.userCode}`, input)
            .pipe(map(response => {
                this.state2.loaded = true;
                this.state2.loading = false;
                this.state2.message = response.message;
                this.state2.id = response.id;
                setTimeout(() => {
                    localStorage.removeItem('token');
                    window.location.assign('');
                }, 1000);

            })).pipe(catchError((err: any) => {
                this.state2.loading = false;
                this.state2.loaded = true;
                this.state2.message = err.status === 0 ? err.statusText : err.error ? err.error.message : err.statusText;
                return throwError(err);
            }));

    }


}