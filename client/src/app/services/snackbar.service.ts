import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackbar: MatSnackBar) {}

  openSnackbar(message: string, action?: string, duration?: number) {
    this.snackbar.open(message, action, {
      duration: 2000,
    });
  }
}
