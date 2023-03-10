import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
@ViewChild('memberTabs', {static: true}) memberTabs?: TabsetComponent;
member : Member = {} as Member;
galleryOptions: NgxGalleryOptions[] = [];
galleryImages: NgxGalleryImage[] = [];
activeTab?: TabDirective;
messages: Message[] = [];

  constructor(private memebrService: MembersService, private route: ActivatedRoute,private messageService: MessageService) { }

  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => this.member = data['member']
    })

    this.route.queryParams.subscribe({
      next: params => {
        params['tab'] && this.selectTab(params['tab'])
      }
    })

    this.galleryOptions = [
      {
        width: '550px',
        height: '550px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]

    this.galleryImages = this.getImages();
  }

  getImages() {
    if (!this.member) return [];
    const imagesUrls = [];
    for (const photo of this.member.photos) {
      imagesUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url
      })
    }
    return imagesUrls;
  }

  // loadMember() {
  //   const username = this.route.snapshot.paramMap.get('username');

  //   if (!username) return;

  //   this.memebrService.getMember(username).subscribe({
  //     next: member => {
  //       this.member = member;
  //       this.galleryImages = this.getImages();
  //     }
  //   })
  // }

  selectTab(heading: string) {
    if (this.memberTabs) {
      this.memberTabs.tabs.find(x => x.heading === heading)!.active = true;
    }

  }

  loadMessages() {
    if (this.member?.userName) {
    this.messageService.getMessagesThread(this.member.userName).subscribe({
      next: message => this.messages = message
    });
  }
}

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages') {
      this.loadMessages();
    }
  }
}
