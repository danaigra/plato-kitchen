import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Order } from '../order';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import * as $ from 'jquery';

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
  someTest: any[] = [];
  someDishes: any[] = [];

constructor(private afs: AngularFirestore, private router: Router) {
}

updateStatusInP(dish) {
  console.log(dish);
  this.afs.collection('/Rests/restId/Orders/uHN9bSdMnEMpFqVpzdNX/meal1').doc(dish.id)
    .set({
      status: dishStatus.inProgress,
      name: dish.name,
      description: dish.description,
      category: dish.category
    });
}

updateStatusDone(dish) {
 
  this.afs.collection('/Rests/RestID/Orders/uHN9bSdMnEMpFqVpzdNX').doc(dish.id)
    .set({
      status: dishStatus.done,
      name: dish.name,
      description: dish.description,
      category: dish.category
    });

    // this.router.navigate(['cheker']);
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
    this.afs.collection('/Rests/restId/Orders/order123/meals').snapshotChanges()
    .map(data => {
      return data.map(subData => {
        const someData = subData.payload.doc.data();
        const mealId = subData.payload.doc.id;
        this.afs.collection('/Rests/restId/Orders/order123/meals/'+mealId+"/dishes").snapshotChanges()
        .map(mapObj => {
          return mapObj.map(dataTest => ({mealId: mealId, id: dataTest.payload.doc.id, ...dataTest.payload.doc.data() }));
        })
        .subscribe(subsubData => {
          this.someTest.push(subsubData);
        })
      });
    })
    .subscribe(fin => {
    });
  }

  getDishes(mealId){
    $("#"+mealId).toggle("slow")
    this.afs.collection('/Rests/restId/Orders/order123/meals/'+mealId+"/dishes").snapshotChanges()
    .map(data => {
      return data.map(newData => ({id: newData.payload.doc.id, ...newData.payload.doc.data()}));
    }).subscribe(dishObj => {
      this.someDishes = dishObj;
      console.log("dishObj ", dishObj);
    });
    //Rests/restId/Orders/order123/meals/"+mealId+"/dishes
  }



}
