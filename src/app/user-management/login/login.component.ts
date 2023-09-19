import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TopbarService } from 'src/app/Services/topbar.service';
import { HttpConnectionService } from 'src/app/shared/services/HttpConnectionService';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  id: any = 22
  public user_id: number = 1;
  loginForm!: FormGroup;
  showPassword: boolean = false;
  isBadRequest: boolean = false;
  constructor(
    private _router: Router,
    private http: HttpConnectionService
  ) { }
  ngOnInit() {
    this.initializeForm();
  }

  onSubmit() {
    this.http.post('/user/login/', this.loginForm.value).subscribe((result: any) => {
      // console.log("test" + JSON.stringify(result));
      if (result) {
        if (result?.token && result?.user?.id) {
          this.isBadRequest = false;
          this._router.navigate(['/dashboard']);
          localStorage.setItem("userDetails", JSON.stringify(result?.user));
        }
      }
    },
    (error) => {
      if (error?.status === 400) {
        this.isBadRequest = true;
      } })
  }

  initializeForm() {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]),
      password: new FormControl("", [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@#\\$%^&+=!]).{6,}$')])
    })
  }

  PasswordVisibility() {
    this.showPassword = !this.showPassword
  }
}
