import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Order, Meal, Dish } from '../order';
import { AngularFireModule } from 'angularfire2';
import { DocumentChangeAction } from 'angularfire2/firestore/interfaces';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

const enum dishStatus {
  new,
  inProgress,
  done
}


@Component({
  selector: 'dish-list',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})

export class HomeComponent implements OnInit {
    orderDoc: AngularFirestoreDocument<Order>;
    order:  Observable<Order>;
    restsCollection: AngularFirestoreCollection<any>;
    orderCollection: AngularFirestoreCollection<any>;
    orderDocItem$: Subscription;
    test: any;
    @Output() titleChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(private afs: AngularFirestore, private router: Router) {
  }

  goToCheker() {
      this.router.navigate(['cheker']);

  }
  goToStove() {
      this.router.navigate(['stove']);

  }
  goToHotplate() {
      this.router.navigate(['hot']);

  }
  goToColdplate() {
      this.router.navigate(['cold']);

  }
  goToDrinks() {
      this.router.navigate(['drinks']);

  }




  ngOnInit() {

   }






  /*TODO: USR THIS CODE FOR SHOWING ALL SUB DATA INCLUDE GROCERY!!!!!!! */
  // this.orderDocItem$ = this.afs.collection('/Rests/Kibuz-222/Orders').valueChanges()
  //  .subscribe(data => {
  //     this.test = data;
  //     console.log("Coldplate111-->" , data);
  //  });





}

