import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { SearchService } from '../search.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
  animations: [
    trigger('slideDown', [
      state('void', style({ transform: 'translateY(-100%)', opacity: 0 })),
      state('*', style({ transform: 'translateY(0)', opacity: 1 })),
      transition(':enter', animate('1000ms ease-in'))
    ])
  ]
})
export class ExerciseComponent {
   name:any
   Exercise:any=[];
   backgroundImageUrl:any;
constructor(private _route:ActivatedRoute,private _service:SearchService,private _router:Router){
  
   this.loadData();
  

}
loadData()
{
  this.name=this._route.snapshot.paramMap.get('SelectedExercise');
  this.backgroundImageUrl = `url('https://source.unsplash.com/1600x900/?exercise')`;
  console.log("myname:" ,this.name);
   this._service.getExercises(this.name).subscribe((res)=>{
      console.log(res)
      this.Exercise=res
      console.log("hello",this.Exercise);
    
   },(err)=>{
       console.log(err);
   })
}
getExerciseImageUrl(name: string): string {
  const encodedName = encodeURIComponent(name);
  return `https://source.unsplash.com/1600x900/?${encodedName}`;
}
GoBack()
{
  this._router.navigate(['']);
}
}
