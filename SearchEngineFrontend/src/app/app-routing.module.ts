import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialComponent } from './initial/initial.component';

import { FemaleComponent } from './female/female.component';
import { MaleComponent } from './male/male.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { NewsComponent } from './news/news.component';


const routes: Routes = [
   {path:'',component:InitialComponent},
   {path:'male',component:MaleComponent},
   {path:'female',component:FemaleComponent},
  
   {path:'Exercise/:SelectedExercise',component:ExerciseComponent},
   {path:'news',component:NewsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}
