import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  model : any = {};
  users: any;

  constructor() { }

  ngOnInit(): void {
  }

  register() {
    console.log(this.model)
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

}
