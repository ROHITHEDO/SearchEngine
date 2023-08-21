import { Component, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../search.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbCarousel, NgbModal, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})

export class NewsComponent {
  ngCarousel: any;
  ngAfterViewInit() {
    this.ngCarousel = this.elementRef.nativeElement.querySelector('#ngcarousel');
    // Now you can use ngCarousel
  }
  // @ ViewChild('ngcarousel', { static: true }) ngCarousel!: NgbCarousel;
  slideActivate(ngbSlideEvent: NgbSlideEvent) {
    console.log(ngbSlideEvent.source);
     console.log(ngbSlideEvent.paused);
    console.log(NgbSlideEventSource.INDICATOR);
    console.log(NgbSlideEventSource.ARROW_LEFT);
    console.log(NgbSlideEventSource.ARROW_RIGHT);
  }
  searchForm:FormGroup;
    data:any;
    display=true;
    backgroundImageUrl:any
    constructor(private _router:Router,private _service:SearchService,private _fb:FormBuilder, private elementRef: ElementRef,private modalService: NgbModal)
    {
      this.backgroundImageUrl = `url('https://source.unsplash.com/1600x900/?news')`;
      this.searchForm=this._fb.group({
         name:['',Validators.required]
      })
     
    }
    public selectedNewsUrl: string | null = null;
    public contentVisible: boolean = true;

    // Function to open the URL and hide the content
    openUrl(url: string) {
        this.selectedNewsUrl = url;
        this.contentVisible = false;
    }
    
    // Function to show the content again
    showContent() {
        this.selectedNewsUrl = null;
        this.contentVisible = true;
    }
   
  
  onSubmit(value:any)
  {
    this.display=false;
    console.log(value);
    this._service.getNews(value.name).subscribe((res)=>{
          console.log(res);
          this.data=res;
          console.log("data",this.data)
    },(err)=>{
      console.log(err);
    })
  }
  navigateToSlide(item: any) {
    this.ngCarousel.select(item);
    console.log(item);
  }
  // Move to previous slide
  getToPrev() {
    this.ngCarousel.prev();
  }
  // Move to next slide
  goToNext() {
    this.ngCarousel.next();
  }
  // Pause slide
  stopCarousel() {
    this.ngCarousel.pause();
  }
  // Restart carousel
  restartCarousel() {
    this.ngCarousel.cycle();
  }
  GoBack()
  {
    this._router.navigate([''])
  }

}


