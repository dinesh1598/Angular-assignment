import { Component, OnInit } from '@angular/core';
declare var time: Date;
@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.scss'],
})
export class WelcomeScreenComponent implements OnInit {
  constructor() {}
  greeting: string = '';

  ngOnInit(): void {
    var myDate = new Date();
    var hrs = myDate.getHours();

    var greet;

    if (hrs < 12) this.greeting = 'Good morning';
    else if (hrs >= 12 && hrs <= 17) this.greeting = 'Good Afternoon';
    else if (hrs >= 17 && hrs <= 24) this.greeting = 'Good Evening ';
  }
}
