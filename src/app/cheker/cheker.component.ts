import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Order } from '../order';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

const enum dishStatus {
  new,
  inProgress,
  done
}

@Component({
  selector: 'app-cheker',
  templateUrl: './cheker.component.html',
  styleUrls: ['./cheker.component.css']
})



export class ChekerComponent implements OnInit {
  orderDoc: AngularFirestoreDocument<Order>;
  order:  Observable<Order>;
  restsCollection: AngularFirestoreCollection<any>;
  orderCollection: AngularFirestoreCollection<any>;
  orderDocItem$: Subscription;
  test: any;

constructor(private afs: AngularFirestore, private router: Router) {
}

<<<<<<< HEAD
return(dish) {
=======
updateStatusInP(dish) {
>>>>>>> 132275125b1a9d51425007fa70dfeb5edbbdca3c
  console.log(dish);
  this.afs.collection('/Rests/RestID/Orders/uHN9bSdMnEMpFqVpzdNX/meal1').doc(dish.id)
    .set({
      status: dishStatus.inProgress,
      name: dish.name,
<<<<<<< HEAD
      description: dish.description,
      category: dish.category
=======
      description: dish.description
>>>>>>> 132275125b1a9d51425007fa70dfeb5edbbdca3c
    });
}

updateStatusDone(dish) {
  console.log(dish);
<<<<<<< HEAD
  this.afs.collection('/Rests/RestID/Orders/uHN9bSdMnEMpFqVpzdNX').doc(dish.id)
    .set({
      status: dishStatus.done,
      name: dish.name,
      description: dish.description,
      category: dish.category
=======
  this.afs.collection('/Rests/RestID/Orders/uHN9bSdMnEMpFqVpzdNX/meal1').doc(dish.id)
    .set({
      status: dishStatus.done,
      name: dish.name,
      description: dish.description
>>>>>>> 132275125b1a9d51425007fa70dfeb5edbbdca3c
    });

    // this.router.navigate(['cheker']);

}

<<<<<<< HEAD
// createdDish(dish) {
//   console.log(dish.id);
//   this.afs.collection('/Rests/RestID/Orders/uHN9bSdMnEMpFqVpzdNX/meal1').doc('dish22')
//   .set({
//     status: 'new',
//     name: 'dish.name',
//     description: 'dish.description'
//   }).then(function(){
//     console.log('success');
//   }).catch(function(err){
//       console.log(err);
//   });
// }
=======
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
>>>>>>> 132275125b1a9d51425007fa70dfeb5edbbdca3c

deleteDish(dishId) {
  console.log(dishId);
  this.afs.collection('/Rests/RestID/Orders/uHN9bSdMnEMpFqVpzdNX/meal1').doc(dishId).delete();
}

ngOnInit() {
  this.orderDocItem$ = this.afs.collection('/Rests/RestID/Orders')
  .doc('uHN9bSdMnEMpFqVpzdNX')
  .collection('meal1', ref => ref.where('status', '==', 2)).snapshotChanges()
  .map(data => {
    return data.map(data => ({id: data.payload.doc.id, ...data.payload.doc.data() }));
  })
 .subscribe(data => {
    this.test = data;
    console.log(data);
 });
}
}

