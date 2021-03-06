import { Injectable } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { ErrorDialogComponent } from './errordialog.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ErrorDialogService {
  public isDialogOpen: Boolean = false;
  constructor(public dialog: MatDialog) {}
  openDialog(data): any {
    if (this.isDialogOpen) {
      return false;
    }
    this.isDialogOpen = true;
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '300px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.isDialogOpen = false;
      let animal;
      animal = result;
    });
  }
}
