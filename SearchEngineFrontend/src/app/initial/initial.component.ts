import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchService } from '../search.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.css'],
  animations: [
    trigger('slideDown', [
      state('void', style({ transform: 'translateY(-100%)', opacity: 0 })),
      state('*', style({ transform: 'translateY(0)', opacity: 1 })),
      transition(':enter', animate('1000ms ease-in'))
    ])
  ]
})
export class InitialComponent {
  title = 'Cafe-Search';
  searchForm: FormGroup;
  submitted = false;
  places: any = [];
   displaydata=false;
  constructor(private _service:SearchService,private formBuilder: FormBuilder,private _snack:MatSnackBar,private _router:Router){
    this.searchForm = this.formBuilder.group({
      placeType: ['', Validators.required],
      locationName: ['', Validators.required],
    });
  }
  placeName:any;
  locationNames:any
  backgroundImageUrl: string = ''; 
  onSubmit(value:any) {
     setTimeout(()=>{
      if (this.searchForm.valid) {
        console.log("value",value);
        this._service.getPlaces(value.placeType, value. locationName)
          .subscribe(
            (places:any) => {
              this.submitted=true;
              console.log(places);
              
              this.places = places;
              this.displaydata=true;
              if (this.places.length > 0) {
                if (this.avoidPlaces.includes(value.placeType.toLowerCase())) {
                  this.displayLuckButton = false; 
                } else {
                  this.displayLuckButton = true; 
                }
                this.backgroundImageUrl = `url('https://source.unsplash.com/1600x900/?${value.placeType}')`;
              }
            },
            (error:any) => {
              console.error('Error fetching places:', error);
            }
          );
      }
     },1)
}

  getImageUrl(name:string):string{
      const encodedName=encodeURIComponent(name);
      return `https://source.unsplash.com/1600x900/?${encodedName}`;
  }

get placename() {
  return this.searchForm.controls['placeType'];
}
get locationname() {
  return this.searchForm.controls['locationName'];
}
GoBack()
{
  this.clicked=true;
  this.submitted=false;
   this.displaydata=false;
}
backgroundContentVisible: boolean = true;
clicked=true;
showModal: boolean = false;
luckyPlace: any ;
modalBackgroundColor:any;
avoidPlaces=['hospital','Police','Police Station','Hospital','police','police station'];
displayLuckButton: boolean = true;
 


RandomPlace() {
  
  this.clicked=false;
   this.backgroundContentVisible=false;
  const randomIndex = Math.floor(Math.random() * this.places.length);
  const randomPlace = this.places[randomIndex]
  this.luckyPlace = randomPlace;
  this.showModal = true;
  // const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
  // this.modalBackgroundColor = randomColor;
  
}
closeModal() {

  this.backgroundContentVisible=true;
  this.showModal = false;
}
}
