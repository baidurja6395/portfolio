import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from ".";
import { IUser } from "../interfaces";

@Injectable()
export class RouteResolveService implements Resolve<IUser> {

    constructor(private userService: UserService) {}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser> {
        return this.userService.getUserBasicInfo();
    }
    
}