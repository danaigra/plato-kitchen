import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    console.log('nana--> ', this.router.url === '/cold'); // array of states
    console.log(activatedRoute.snapshot.url)

   }

  ngOnInit() {
  }

}
