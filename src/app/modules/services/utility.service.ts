import { Injectable } from "@angular/core";

import { of } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class UtilityService {

    constructor() {
        this.getUnits();
        this.getShapes();
        this.getFishes();
    }

    // units: Array<IOption> = [];
    // shapes: Array<IOption> = [];

    public getValueFromKey(name: string, url = window.location.href): string {
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return '';
        if (!results[2]) return "";
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    /**
     * Update query string key and value
     * @param key string
     * @param value string
     */
    public updateQueryStringParam(key: string, value: string) {
        var baseUrl = [
            location.protocol,
            "//",
            location.host,
            location.pathname,
        ].join(""),
            urlQueryString = document.location.search,
            newParam = key + "=" + value,
            params = "?" + newParam;

        // If the "search" string exists, then build params from it
        if (urlQueryString) {
            var updateRegex = new RegExp("([?&])" + key + "[^&]*");
            var removeRegex = new RegExp("([?&])" + key + "=[^&;]+[&;]?");

            if (typeof value == "undefined" || value == null || value == "") {
                // Remove param if value is empty
                params = urlQueryString.replace(removeRegex, "$1");
                params = params.replace(/[&;]$/, "");
            } else if (urlQueryString.match(updateRegex) !== null) {
                // If param exists already, update it
                params = urlQueryString.replace(updateRegex, "$1" + newParam);
            } else {
                // Otherwise, add it to end of query string
                params = urlQueryString + "&" + newParam;
            }
        }

        // no parameter was set so we don't need the question mark
        params = params == "?" ? "" : params;

        window.history.replaceState({}, "", baseUrl + params);
    }
    
    /**
     * **CREATING FILE ABSOLUTE PATH**
     * @param relativePath 
     * @returns 
     */
    public filePathHandler(relativePath: string) {
        return `${environment.fileBasePath}/${relativePath}`
    }

    /**
     * **CONVERTS SIMPLE ARRAY TO PARENT CHILD ARRAY**
     * @param items array
     * @param key string
     * @returns group by array
     */
    public groupBy(items: Array<any>, key: string) {
        return items.reduce((r, a) => {
            r[a[key]] = [...r[a[key]] || [], a];
            return r;
        }, {});
    };

    /**
     * **GET RANDOM NUMBER WITHIN GIVEN RANGE**
     * @param min number
     * @param max number
     * @returns random numer
     */
    public getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    /**
     * **OBSERVE PAGE IDLE STATE**
     * After certain time system will promt a message
     * Default would be 5 mins
     * @param {300 ms} idleDurationSecs 
     */
    public observeIdleState(idleDurationSecs: number = 300) {

        // Check only on token, if exists, which means in dashboard only
        if (!localStorage.getItem('token')) return;

        let idleTimeout: any;

        const resetIdleTimeout = () => {
            if (idleTimeout) clearTimeout(idleTimeout);
            idleTimeout = setTimeout(() => {
                localStorage.removeItem('token');
                alert('Session got expired, please relogin and continue');
                window.location.assign('/auth/login');
            }, idleDurationSecs * 1000);
        };

        // Key events for reset time
        resetIdleTimeout();
        window.onmousemove = resetIdleTimeout;
        window.onkeypress = resetIdleTimeout;
        window.onclick = resetIdleTimeout;
        window.onfocus = resetIdleTimeout;
        window.onchange = resetIdleTimeout;
        window.onmouseover = resetIdleTimeout;
        window.onmouseout = resetIdleTimeout;
        window.onmousemove = resetIdleTimeout;
        window.onmousedown = resetIdleTimeout;
        window.onmouseup = resetIdleTimeout;
        window.onkeypress = resetIdleTimeout;
        window.onkeydown = resetIdleTimeout;
        window.onkeyup = resetIdleTimeout;
        window.onsubmit = resetIdleTimeout;
        window.onreset = resetIdleTimeout;
        window.onselect = resetIdleTimeout;
        window.onscroll = resetIdleTimeout;
    };

    /**
     * **CHECK INTERNET CONNECTIVITY**
     * @description Show message accordingly
     */
    public registerInternetConnectivity() {
        window.addEventListener('online', () => {
            alert('Now you are online now');
            setTimeout(() => {
                window.location.assign('');
            }, 500);
        });
        window.addEventListener('offline', () => {
            alert('ERROR: You are offline, please check your internet connectivity.');
        });
    };

    public getUnits() {
        return of([
            {
                "id": 1,
                "value": "Kg",
                "text": "Killogram"
            },
            {
                "id": 2,
                "value": "Lit",
                "text": "Liter"
            },
            {
                "id": 3,
                "value": "Gm",
                "text": "Gram"
            },
            {
                "id": 4,
                "value": "Ml",
                "text": "MilliLiter"
            },
            {
                "id": 5,
                "value": "Pic",
                "text": "Pice"

            },
            {
                "id": 6,
                "value": "ft",
                "text": "Feet"
            },
            {
                "id": 7,
                "value": "m",
                "text": "Meter"
            },
            {
                "id": 8,
                "value": "cm",
                "text": "Centimeter"
            },
        ]);
    }

    public getShapes() {

        return of([
            {
                id: 1,
                text: "V-Round",
                value: "VROUND"
            },
            {
                id: 2,
                text: "Square",
                value: "SQUARE"
            },
            {
                id: 3,
                text: 'Rectangle',
                value: 'RECT'
            }
        ]);
    }

    public getFishes(){
        return of([
            {
                id: 1,
                text: 'Fish 1',
                value: 'FISH1'
            },
            {
                id: 2,
                text: 'Fish 2',
                value: 'FISH2'
            },
            {
                id: 3,
                text: 'Fish 3',
                value: 'FISH3'
            },
            {
                id: 4,
                text: 'Fish 4',
                value: 'FISH4'
            }
        ])
    }

}