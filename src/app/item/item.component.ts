import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Order, Meal, Dish } from '../order';
import { AngularFireModule } from 'angularfire2';
import { DocumentChangeAction } from 'angularfire2/firestore/interfaces';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

const enum dishStatus {
  new,
  done,
  inProgress
}


@Component({
  selector: 'dish-list',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent implements OnInit {
    orderDoc: AngularFirestoreDocument<Order>;
    order:  Observable<Order>;
    restsCollection: AngularFirestoreCollection<any>;
    orderCollection: AngularFirestoreCollection<any>;
    orderDocItem$: Subscription;
    test: any;

  constructor(private afs: AngularFirestore, private router: Router) {
  }

  updateStatusInP(dish) {
    console.log(dish);
    this.afs.collection('/Rests/RestID/Orders/uHN9bSdMnEMpFqVpzdNX/meal1').doc(dish.id)
      .set({
        status: dishStatus.inProgress,
        name: dish.name,
        description: dish.description
      });
  }

  updateStatusDone(dish) {
    console.log(dish);
    // this.afs.collection('/Rests/RestID/Orders/uHN9bSdMnEMpFqVpzdNX/meal1').doc(dish.id)
    //   .set({
    //     status: dishStatus.done,
    //     name: dish.name,
    //     description: dish.description
    //   });

      this.router.navigate(['cheker']);

  }

  createdDish(dish) {
    console.log(dish.id);
    this.afs.collection('/Rests/RestID/Orders/uHN9bSdMnEMpFqVpzdNX/meal1').doc('dish22')
    .set({
      status: 'new',
      name: 'dish.name',
      description: 'dish.description'
    }).then(function(){
      console.log('success');
    }).catch(function(err){
        console.log(err);
    });
  }

  deleteDish(dishId) {
    console.log(dishId);
    this.afs.collection('/Rests/RestID/Orders/uHN9bSdMnEMpFqVpzdNX/meal1').doc(dishId).delete();
  }

  ngOnInit() {
    this.orderDocItem$ = this.afs.collection('/Rests/RestID/Orders')
    .doc('uHN9bSdMnEMpFqVpzdNX')
    .collection('meal1', ref => ref.where('status', '==', 'pizzaBarmanSTATUS')).snapshotChanges()
    .map(data => {
      return data.map(data => ({id: data.payload.doc.id, ...data.payload.doc.data() }));
    })
   .subscribe(data => {
      this.test = data;
      console.log(data);
   });
  }
}

