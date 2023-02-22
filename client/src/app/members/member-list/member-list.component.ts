import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagiantion';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: Member[] = [];
  pagination: Pagination | undefined;
  userParams: UserParams | undefined;
  user: User | undefined;
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];
// members$: Observable<Member[]> | undefined;

  constructor(private MemberService: MembersService) { 
    this.userParams = this.MemberService.getUserParams();
  }

  ngOnInit(): void {
    this.loadMembers();
    // this.members$ = this.MemberService.getMembers();
  }

  loadMembers() {
    if (this.userParams) {
      this.MemberService.setUserParams(this.userParams);
      this.MemberService.getMembers(this.userParams).subscribe({
        next: response => {
          if (response.result && response.pagination) {
            this.members = response.result;
            this.pagination = response.pagination;
          }
        }
      })
    }

  }

  resetFilters() {
      this.userParams = this.MemberService.resetUserParams();
      this.loadMembers();
  }

  pageChanged(event : any) {
    if (this.userParams && this.userParams?.pageNumber !== event.page) {
      this.userParams.pageNumber = event.page;
      this.MemberService.setUserParams(this.userParams);
      this.loadMembers();
    }
  }

}
