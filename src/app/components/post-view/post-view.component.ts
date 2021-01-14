import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Subscription } from 'rxjs';
import { PostsModal } from 'src/app/models/PostsModal';
import { JsonplaceholderService } from 'src/app/services/jsonplaceholder.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit, OnDestroy {
  posts: PostsModal[];
  message: string;
  subscription: Subscription;

  constructor(private jsonService: JsonplaceholderService, private messageService: MessageService, private ngxModal: NgxSmartModalService) {
    this.subscription = this.messageService.currentMessage.subscribe(m => this.message = m);
    this.ngxModal.create('myModal', 'welcome '+ this.message).open();
  }

  ngOnInit(): void {
    this.subscription = this.messageService.currentMessage.subscribe(m => console.log(m));
    this.jsonService.getPosts().subscribe(res => {
      console.log(res);
      this.posts = res as PostsModal[];
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
