import { Injectable } from "@angular/core";
import { of } from "rxjs";

declare const moment: any;

@Injectable()
export class DateUtilityService {

    constructor() { }

    public formatDate(date: string, format: string = 'DD-MM-YYYY') {
        return moment(date).add(1).format(format);
    }

    public getDays() {
        const days = [];
        const dateStart = moment();
        const dateEnd = moment().add(30, 'days');
        while (dateEnd.diff(dateStart, 'days') >= 0) {
            days.push(dateStart.format('D'));
            dateStart.add(1, 'days');
        }
        return of(days);
    };

    /**
     * date - YYYY-DD
     * @param {*} date 
     */
    public getDaysArrayInMonth(date: string = '') {
        const dayCounts = [];
        const daysCountInMonth = date ? moment(date, "YYYY-MM").daysInMonth() : moment().daysInMonth();
        for (let i = 1; i <= daysCountInMonth; i++) {
            const day = i.toString().length <= 1 ? `0${i}` : i;
            dayCounts.push({
                day: i,
                fullDate: `${day}-${moment(new Date(date)).format('MM')}-${moment(new Date()).format('YYYY')}`,
                status: ''
            });
        }
        return dayCounts;
    }

    public nextMonth(num: number, format: string = 'MMMM') {
        return moment().add(num, "month").startOf("month").format(format);
    };

    public currentMonth() {
        return moment().format('MMMM');
    };

    public prevMonth(num: number) {
        return moment().subtract(num, "month").startOf("month").format('MMMM');
    }

    /**
   * @description y and m in number only 
   * @description 0 => JAN and 11 => DEC
   * @param {number} y 
   * @param {number} m 
   * @returns number
   */
    public getEndDayOfMonth(y: number, m: number) {
        return new Date(y, m + 1, 0).getDate();
    };

    public getYearFromMonth(monthNum: number) {
        return moment().add(monthNum, "month").startOf("month").format('YYYY');
    };

}