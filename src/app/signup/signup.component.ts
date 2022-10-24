import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthAccountService } from '../auth-account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthAccountService) { }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['', [Validators.required]],
    name: ['', [Validators.required]]
  })

  ngOnInit(): void {
  }

  get email() {
    return this.loginForm.get('email')
  }
  get password() {
    return this.loginForm.get('password')
  }
  get name() {
    return this.loginForm.get('name')
  }


  sign() {
    console.log(this.email?.value, this.password?.value);


    this.auth.register({ email: this.email?.value, password: this.password?.value, name: this.name?.value }).subscribe(res => {
      if (res.status === 'success') {
        localStorage.setItem('token', res.authorisation.token)
        this.router.navigate(['/movies'])
      } else {
        this.router.navigate(['/signup'])
      }
    }, error => alert('Something went wrong'))
  }
}
