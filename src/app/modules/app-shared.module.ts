import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';
import { DateUtilityService, HttpService, MessageService } from './services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    HttpClientModule,
    
  ],
  providers: [
    HttpService, 
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    
    MessageService,
    DateUtilityService
  ]
})
export class AppSharedModule { }
