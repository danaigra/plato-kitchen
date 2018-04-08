import { Routes, RouterModule, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { HotplateComponent } from './Hotplate/Hotplate.component';
import { ChekerComponent } from './cheker/cheker.component';
import { ColdplateComponent } from './Coldplate/Coldplate.component';
<<<<<<< HEAD
import { HomeComponent } from 'app/Home/Home.component';
import { DrinksComponent } from 'app/Drinks/Drinks.component';
import { StoveComponent } from 'app/Stove/Stove.component';
=======
import { HomeComponent } from "app/Home/Home.component";
import { DrinksComponent } from "app/Drinks/Drinks.component";
import { StoveComponent } from "app/Stove/Stove.component";
>>>>>>> 132275125b1a9d51425007fa70dfeb5edbbdca3c

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'hot',
    component: HotplateComponent
  },
  {
    path: 'cheker',
    component: ChekerComponent
  },
  {
    path: 'cold',
    component: ColdplateComponent
  },
  {
    path: 'drinks',
    component: DrinksComponent
  },
  {
    path: 'stove',
    component: StoveComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule {
}
