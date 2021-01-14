import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  signInForm: FormGroup;
  message: string;
  subscription: Subscription;
  usersList: any[] = JSON.parse(localStorage.getItem('usersList')) || [];

  constructor(private messageService: MessageService, private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router,) { }

  ngOnInit(): void {
    this.subscription = this.messageService.currentMessage.subscribe(m => this.message = m);
    this.signInForm = this.formBuilder.group({
      inputEmail: ['', Validators.required],
      inputPassword: ['', Validators.required],
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  signIn() {
    console.log(this.signInForm.value);
    // let findName = this.usersList.find(s => s.inputEmail === this.signInForm.value.inputEmail).inputName;
    if(this.usersList.length == 0) {
      this.toastr.error('no users registered')
      return;
    }
    else if(this.usersList.find(s => s.inputEmail === this.signInForm.value.inputEmail && s.inputPassword === this.signInForm.value.inputPassword)) {
      this.toastr.success('logged in successfully');
      // console.log(findName)
      this.messageService.sendMessage(this.usersList.find(s => s.inputEmail === this.signInForm.value.inputEmail).inputName);
      this.router.navigate(['/posts'])
    } else {
      this.toastr.warning('username or password is wrong')
    }
  }

  register() {
    console.log('Register success');
  }

}
