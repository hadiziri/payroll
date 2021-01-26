import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-update-storage-settings',
  templateUrl: './update-storage-settings.component.html',
  styleUrls: ['./update-storage-settings.component.css']
})
export class UpdateStorageSettingsComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  constructor(
    public dialogRef: MatDialogRef<UpdateStorageSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.formGroup = new FormGroup({
        path: new FormControl('', [Validators.required])
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
