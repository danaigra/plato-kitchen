import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import { Order, Meal, Dish } from '../order';
import { AngularFireModule } from 'angularfire2';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})





export class ItemComponent implements OnInit {
    // public names= ['mixed Burger 300 gr','coca cola','Burger 300 gr'];
    // public statuss= ['new','new','done'];
    
    // myname = this.names[0];
    // mystatus = this.statuss[0];

    orderDoc: AngularFirestoreDocument<Order>;
    order:  Observable<Order>;
    o:any;
    restsCollection: AngularFirestoreCollection<any>;
    orderCollection: AngularFirestoreCollection<any>;
    orderDocItem: Observable<{}>;
    orders:Observable<any[]>;
    rests: Observable<any[]>;
    snapshot:any;

    test:any;
  //meal = {dish1:{name:"mixed Burger 300 gr", status:"new"},dish2:{name:"coca cola", status:"new"},dish3:{name:"chicken Burger 300 gr", status:"new"}};

  constructor(private afs: AngularFirestore) {

    // // this.restsCollection = this.afs.collection("Rests");
    // // this.rests = this.restsCollection.valueChanges();
    // // this.orderCollection = this.afs.collection("/Rests/RestID/Orders");
    // this.orderDoc = this.afs.doc('/Rests/RestID/Orders/uHN9bSdMnEMpFqVpzdNX');
    // this.order = this.orderDoc.valueChanges();
    // this.o = new Order('a',[],[]);
    // this.o.name = "test";
   
    // this.order.subscribe(a=>{
    //   //console.log(a.meals);
    //   console.log(Object.keys(a.meals).length);
      

    //   for(let key of Object.keys(a.meals)){
    //     let meal = new Meal([]);
    //     let t = a.meals[key].Dishes;
    //     console.log(t);
    //     for(let key2 of Object.keys(t)){
    //       let dish = new Dish('',[]);
    //       let tt = t[key2];
    //       dish.name = key2;
    //       dish.status = tt.status;
    //       console.log(dish);
    //       meal.dishes.push(dish);
    //       console.log(meal);
          
    //       //meal.dishes.push(new Dish(key2, tt.status));
    //     }
    //      console.log(meal);
    //     this.o.meals.push(meal);
        
    //   }
    //    console.log(this.o);
      // for (var i = 0; i < Object.keys(a.meals).length; i++) {
      //   var element =a.meals[i];
      //   console.log(element);
        
      //   //this.o.meals.push(element);
      //   // for (var j = 0; j < element.dishes.length; j++) {
      //   //   var element = element[j];
          
      //   // }
      // }
      // for(let i=0; i<a.orders.length; i++){
      //   const element = a.orders[i];
      //   console.log(element.a);
      //   this.o.orders.push(element);
      // }
    //})
 
    
   }

  ngOnInit() {
    this.orderDocItem = this.afs.collection("/Rests/RestID/Orders").doc("uHN9bSdMnEMpFqVpzdNX").valueChanges();
     this.orderDocItem
     .subscribe(data => {
       this.test =  data;
       console.log(this.test);
    })
    //console.log(" nana--> ",this.orderDocItem); 
  }
    
}

