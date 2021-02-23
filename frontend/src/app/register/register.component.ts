import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from './../alert-dialog/alert-dialog.component';
import { error } from 'protractor';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { SignUpInfo } from '../auth/signup-info';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo=new SignUpInfo("","","","");
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService,public dialog: MatDialog) { }

  ngOnInit() { }

  onSubmit() {
    // //console.log(this.form);

    this.signupInfo = new SignUpInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        // //console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        // //console.log(error);
        this.errorMessage = error.error.errorMessage;
        this.isSignUpFailed = true;
        this.openDialog();
      }
    );
  }
  openDialog() {
    this.dialog.open(AlertDialogComponent);
  }
}
