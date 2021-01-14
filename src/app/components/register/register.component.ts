import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  users: any[] = JSON.parse(localStorage.getItem('usersList')) || [];
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      inputName: ['', Validators.required],
      inputEmail: ['', Validators.required],
      inputPassword: ['', [Validators.required, Validators.minLength(8)]],
  });
  }

  get f() { 
    return this.form.controls; 
  }

  register() {
    console.log(this.form.value);
    let currentUsers: any[] = (JSON.parse(localStorage.getItem('usersList'))) || [];
    if(currentUsers.find(s => s.inputEmail === this.form.value.inputEmail)) {
      this.toastr.error('User already registered with same email address');
    } else {
      this.users.push(this.form.value);
      localStorage.setItem('usersList', JSON.stringify(this.users));
      this.toastr.success('User registered!! Check Debugger Tools Local Storage');
      this.router.navigate(['/login'])
    }
  }
}
