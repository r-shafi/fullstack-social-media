import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../services/login-register.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent {
  constructor(
    private loginRegisterService: LoginRegisterService,
    private router: Router
  ) {}

  register = false;

  toggleRegister() {
    this.register = !this.register;
  }

  loginForm = new FormGroup({
    email: new FormControl('shafi@shafi.com', Validators.required),
    password: new FormControl('abcd12', Validators.required),
  });

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  submitForm() {
    if (this.register) {
      this.loginRegisterService
        .register(this.registerForm.value)
        .subscribe((res) => console.log(res));
    } else {
      this.loginRegisterService
        .login(this.loginForm.value)
        .subscribe((res: any) => {
          sessionStorage.setItem('id', res.id);
          this.router.navigate(['/']);
        });
    }
  }
}
