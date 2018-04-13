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
  inProgress,
  done
}


@Component({
  selector: 'dish-list',
  templateUrl: './Hotplate.component.html',
  styleUrls: ['./Hotplate.component.css']
})

export class HotplateComponent implements OnInit {
    orderDoc: AngularFirestoreDocument<Order>;
    order:  Observable<Order>;
    restsCollection: AngularFirestoreCollection<any>;
    orderCollection: AngularFirestoreCollection<any>;
    orderDocItem$: Subscription;
    test: any;
    mealList: any[] = [];
    rawMatriel:any;
    warehouseStock:any[] = [];

  constructor(private afs: AngularFirestore, private router: Router) {
  }

  updateStatusInP(dish) {
    console.log(dish);
    this.afs.collection('/Rests/restId/Orders/order123/meals/234/dishes').doc(dish.id)
      .set({
        status: dishStatus.inProgress,
        category: dish.category,
        name: dish.name,
        description: dish.description
      });
  }

  updateStatusDone(item) {
    console.log(item);
    this.afs.collection('/Rests/restId/Orders/order123/meals/234/dishes').doc(item.id)
    .set({
      status: dishStatus.done,
      category: item.dish.category,
      name: item.dish.name,
      description: item.dish.description
    });
    this.updateWarehouseStock(item);
  }


  updateWarehouseStock(item){
    console.log('ggwarehouseStockgg--> ', this.warehouseStock);
    this.afs.collection('/Rests/restId/Orders/order123/meals/' + item.id + '/dishes/' + item.dish.name + '/grocerys')
      .snapshotChanges()
      .map(mapObj => {
        console.log('mapObj-> ', mapObj);
        return mapObj.map(dataTest => {
          const dishItem = dataTest.payload.doc.data();
          this.warehouseStock.forEach((item) => {
            for (let key of Object.keys(dishItem.rawMatriel)) {
              const matirielAmount = dishItem.rawMatriel[key];
              const matirielName = key;
              console.log('item=> ', item.value);
              if (item.value.name === matirielName){
                console.log('valueB => ', item.value.amount);
                item.value.amount = item.value.amount - matirielAmount;
                console.log('valueA => ', item.value.amount);
                console.log('matirielName => ', matirielName);
                this.afs.collection('/Restaurants/Mozes-333/WarehouseStock/').doc(matirielName).set({
                  value: {
                    amount: item.value.amount,
                    name: item.value.name,
                    redLine: item.value.redLine,
                    type: item.value.type,
                    units: item.value.units
                  }
                }).then(function(){
                  console.log('success');
                }).catch(function(err){
                    console.log(err);
                });
              }
              // console.log(matirielAmount, matirielName);
              // this.afs.collection('/Restaurants/Mozes-333/WarehouseStock/').doc(matirielName).set({
              // });
            }
          })
          // ({ id: dataTest.payload.doc.id, ...dataTest.payload.doc.data() })
        });
      }).subscribe(data => {
      })
  }

  createdDish(dish) {
    console.log(dish.id);
    this.afs.collection('/Rests/restId/Orders/order123/meals/234/dishes').doc('dish22')
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
    this.afs.collection('/Rests/restId/Orders/order123/meals/234/dishes').doc(dishId).delete();
  }

  ngOnInit() {

    this.afs.collection('/Rests/restId/Orders/order123/meals').snapshotChanges()

    .map(data => {
      return data.map(subData => {
        const someData = subData.payload.doc.data();
        const mealId = subData.payload.doc.id;
        this.afs.collection('/Rests/restId/Orders/order123/meals/'+mealId+"/dishes", ref => ref.where('status', '<', 2).where('category', '==', 'Hotplate')).valueChanges()
        .map(mapObj => {
          // console.log("mapObj-> ", mapObj);
          return mapObj.map(dataTest => ({ id: mealId, dish:dataTest }));
        })
        .subscribe(subsubData => {
          // console.log("subsubData-> ", subsubData);
          this.mealList.push(subsubData);
          console.log('this.someTest-> ', this.mealList);
        })
      });
    })
    .subscribe(fin => {
    });


    // get all stock
    this.warehouseStock = [];
    this.afs.collection('/Restaurants/Mozes-333/WarehouseStock').snapshotChanges()
    .map(data => {
      return data.map(subData => {
        return subData.payload.doc.data();
      })
    }).subscribe(result => {
      this.warehouseStock = result;
    })

  }
}
