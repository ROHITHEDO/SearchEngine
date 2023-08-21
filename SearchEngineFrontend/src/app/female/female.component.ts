import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-female',
  templateUrl: './female.component.html',
  styleUrls: ['./female.component.css']
})
export class FemaleComponent {
  constructor(private _router:Router)
  {

  }
  maleTravelEssentials = [
    { name: 'Clothing suitable for the weather', isCarried: false },
    { name: 'Comfortable shoes', isCarried: false },
    { name: 'Hand Bag', isCarried: false },
    { name: 'Sunscreen and insect repellent', isCarried: false },
    { name: 'Medications and first aid kit', isCarried: false },
    { name: ' chargers', isCarried: false },
    { name: 'Camera and accessories', isCarried: false },
    {name:'MakeUp Kit'},
    {name:'Purse'}
  
  ];
  GoBack()
  {  
    this._router.navigate(['']);
  }
}
