import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-male',
  templateUrl: './male.component.html',
  styleUrls: ['./male.component.css']
})
export class MaleComponent {
  constructor(private _router:Router)
  {

  }
  maleTravelEssentials = [
    { name: 'Clothing suitable for the weather'},
    { name: 'Shoes'},
    { name: 'Wallet'},
    { name: 'Keys'},
    { name: 'First aid box'},
    { name: 'Chargers'},
    { name: 'Camera and accessories' }
  
  ];
  GoBack()
  {  
    this._router.navigate(['']);
  }
}
