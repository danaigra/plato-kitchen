import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Order, Meal, Dish } from '../order';
import { AngularFireModule } from 'angularfire2';
import { DocumentChangeAction } from 'angularfire2/firestore/interfaces';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-item',
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

  constructor(private afs: AngularFirestore) {
  }

  // tslint:disable-next-line:one-line
  updateStatus(dish){
    console.log(dish.id);
    this.afs.collection('/Rests/RestID/Orders/uHN9bSdMnEMpFqVpzdNX/meal1').doc(dish.id)
      .set({
        status: 'in progress',
        name: dish.name,
        description: dish.description
      });
  }

  // tslint:disable-next-line:one-line
  createdDish(dish){
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

  // tslint:disable-next-line:one-line
  deleteDish(dishId){
    console.log(dishId);
    this.afs.collection('/Rests/RestID/Orders/uHN9bSdMnEMpFqVpzdNX/meal1').doc(dishId).delete();
  }

  ngOnInit() {
    this.orderDocItem$ = this.afs.collection('/Rests/RestID/Orders')
    .doc('uHN9bSdMnEMpFqVpzdNX')
    .collection('meal1').snapshotChanges()
    .map(data => {
      return data.map(data => ({id: data.payload.doc.id, ...data.payload.doc.data() }));
    })
   .subscribe(data => {
      this.test = data;
      console.log(data);
   });
  }
}

