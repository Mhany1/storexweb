import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(private movieservice:MovieService,private route : Router) { }

  movie:any = JSON.parse(localStorage.getItem('movieData')!)
  
  
  category:any[] = []
  name:string = ''
  description:string = ''
  file:any
  option:string=''
  data:any[] =[]
  movieName:string=this.movie?.name
  @ViewChild('option') optionVAL! : ElementRef;

  ngOnInit(): void {
    this.movieservice.getDataCategory().subscribe(data => {
      this.category = data.message
      // console.log(this.category);
    })
   
  }

  // getMovieData(){
  //   console.log(JSON.parse(localStorage.getItem('movieData')!));
  //   this.name = 'ffffff'
  //   this.description = movie.description
  //   this.file = movie.image
  //   this.option = movie.category_id

  // }
 
  getName(name:string){
    this.name = name
    console.log(this.name);
    // localStorage.setItem('name',this.name)
  }
  
  getDescription(description:string){
    this.description = description
    // localStorage.setItem('description',this.description)
  }
  
  getFile(event:any){
    this.file=event.target.files[0]
    localStorage.setItem('file',this.file)
   }

  // getop(){
  //   this.option = this.optionVAL.nativeElement.value
  //   console.log(this.option);
    
  //   localStorage.setItem('option',this.option)
  // } 

  // ngAfterViewInit(): void {
  //   this.option = this.optionVAL.nativeElement.value
  //   console.log(this.option);
  //   console.log('llllll');
    
  // }
   formData:any = new FormData();
  submitData() {
    
    this.formData.append("name", this.name);
    this.formData.append("description", 'dfdfdfd');
    this.formData.append("category_id", '86');
    // let body = {
    //   name: this.val1,
    //   description:this.des,
    //   image:this.fil,
    //   category_id: 88,
    // }
    console.log(this.formData);
    if (localStorage.getItem('movieData')) {
      let object = localStorage.getItem('movieData')
      this.formData.append('_method','put')
         this.movieservice.updateData(this.formData,this.movie?.id)
          .subscribe(response => {
            console.log(response)
       })
     } else {
       this.movieservice.postData(this.formData)
       .subscribe(response => {
         console.log(response)
       })
     }
    setTimeout(() => {
      this.route.navigate(['/movies'])
    }, 5000);

    
  }

  selectImage(){
    this.formData.append("image", this.file);
  }
  
}
