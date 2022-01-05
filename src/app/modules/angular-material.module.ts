import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

const modules = [
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatDividerModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatToolbarModule,
  MatMenuModule,
  MatListModule,
  MatTooltipModule,
  MatTableModule,
  MatPaginatorModule,
  MatSelectModule,
  MatRadioModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatTabsModule,
  MatSnackBarModule,
  MatChipsModule,
  MatDatepickerModule,
  MatNativeDateModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class AngularMaterialModule { }
