import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import { RoutingModule } from './app.router.module';
import { ChekerComponent } from './cheker/cheker.component';
import { HotplateComponent } from './Hotplate/Hotplate.component';
import { ColdplateComponent } from './Coldplate/Coldplate.component';
import { HomeComponent } from "app/Home/Home.component";
import { DrinksComponent } from "./Drinks/Drinks.component";
import { StoveComponent } from "app/Stove/Stove.component";
export const firebaseConfig = environment.firebaseConfig;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HotplateComponent,
    ChekerComponent,
    ColdplateComponent,
    HomeComponent,
    DrinksComponent,
    StoveComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
