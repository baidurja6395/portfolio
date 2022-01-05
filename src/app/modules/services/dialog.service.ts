import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "../components/confirm-dialog/confirm-dialog.component";

@Injectable()
export class DialogService{

    constructor(
        private _dialog: MatDialog
    ){

    }

    confirm(message :any,headermsg:any) {
        return this._dialog.open(ConfirmDialogComponent, {
         width: '30%',
         panelClass: 'app-dialog-container',
         data: {
           msg:message,
           headermsg:headermsg 
         }
       })
       
     }
}