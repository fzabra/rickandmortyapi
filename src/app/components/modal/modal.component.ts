import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialogContent, MatDialogClose , MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogContent, MatDialogClose, MatDialogModule],
})
export class ModalComponent {
  constructor(public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}

