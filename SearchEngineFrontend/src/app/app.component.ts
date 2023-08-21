import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {
  title = 'Cafe-Search';
  selectedOption: any;
   constructor(private _router:Router)
   {
    
   }
  visible=true;
   displayStyle:any;

   openPopup() {

     this.displayStyle = "block";
   }
   closePopup() {

        this.displayStyle = "none";
   }
   selectGender(gender: string) {

    if (gender === 'male') {
      this._router.navigateByUrl('male');
    } else if (gender === 'female') {
      this._router.navigateByUrl('female');
    }
    this.closePopup();
  }
  exercises: any[] = [
    {value: 'abdominals', viewValue: 'abdominals'},
    {value: 'abductors', viewValue: 'abductors'},
    {value: 'adductors', viewValue: 'adductors'},
    {value:'biceps',viewValue:'biceps'},
    {value:'calves',viewValue:'calves'},
    {value:'chest',viewValue:'chest'},
    {value:'forearms',viewValue:'forearms'},
    {value:'glutes',viewValue:'glutes'},
    {value:'hamstrings',viewValue:'hamstrings'},
    {value:'lats',viewValue:'Lats'},
    {value:'lower_back',viewValue:'Lower back'},
    {value:'middle_back',viewValue:'Middle Back'},
    {value:'neck',viewValue:'neck'},
    {value:'quadriceps',viewValue:'quadriceps'},
    {value:'traps',viewValue:'traps'},
    {value:'triceps',viewValue:'triceps'},
  ];
  onExerciseSelected(selectedValue:any){
     this._router.navigate(['Exercise/',selectedValue])
  }
  choose:any[]=[
    {value:'home',viewValue:'Home'},
    {value: 'travel', viewValue: 'Travel'},
    {value: 'exercise', viewValue: 'Exercise'},
    {value:'news',viewValue:'News'}
  ]
  navigateToOption(selectedValue: string) {
    if (selectedValue === 'home') {
      this._router.navigate(['']);
    }
   if(selectedValue==='news')
   {
    this._router.navigate(['news']);
   }
   if(selectedValue==='travel')
   {
    this.openPopup()
   }

  }
  goToNews()
  {
    this._router.navigate(['news']);
  }
  

}
// abdominals
// abductors
// adductors
// biceps
// calves
// chest
// forearms
// glutes
// hamstrings
// lats
// lower_back
// middle_back
// neck
// quadriceps
// traps
// triceps