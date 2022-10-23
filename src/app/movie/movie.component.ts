import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  constructor(private movieservice:MovieService,private activatedRoute:ActivatedRoute,private route:Router) { 
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
  }

  movies:any[] = []
  id:any
  category:any[] = []
  category1:any[] = []
 
  

  ngOnInit(): void {
    this.movieservice.getData().subscribe(res => {
       this.movies = res.message
       console.log(this.movies);
    })

   
     this.movieservice.getDataCategory().subscribe(data => {
        this.category = data.message
        console.log(this.category);
        
      })
    
      if (!localStorage.getItem('token')) {
        this.route.navigate(['/login'])
      }
   
  }

  onChange(event: { target: { files: File[]; }; }) {
    this.file = event.target.files[0];
}

  filter(value:string){
   this.category1=this.movies.filter(p => p.name === value)
   console.log(this.category1); 
  }

 
  
  deleteMovie()
  {
    this.movieservice.deleteItem(this.id)
  }

  // updateMovie()
  // {
  //   this.movieservice.updateItem(this.id)
  // }

  addMovie()
  {
    this.movieservice.addItem()
  }

  //************************************************* */

val1:any
des:any
fil:any
ngAfterViewInit(): void {
 this.val1 = localStorage.getItem('name')
 this.des = localStorage.getItem('description')
 this.fil = localStorage.getItem('file')
}

name:string=''
file:any
  getName(name:string){
   this.name=name
  }
  getFile(event:any){
   this.file=event.target.files[0]
  //  console.log(this.file);
  }

  submitData() {
    const formData = new FormData();
    formData.append("image", this.file);
    formData.append("name", this.name);
    formData.append("description", 'dfdfdfd');
    formData.append("category_id", '86');
    let body = {
      name: this.val1,
      description:this.des,
      image:this.fil,
      category_id: 88,
    }
    

    this.movieservice.postData(body)
      .subscribe(response => {
        console.log(response)
      })
  }

  updateData(id:number,movie:any) {
    localStorage.setItem('movieData',JSON.stringify(movie))
    // let body = {
    //   name: 'noha',
    //   description:'fgfgfgfgfg',
    //   // image:event?.target.files[0],
    //   category_id: 87,
    // }

    // this.movieservice.updateData(body, id)
    //   .subscribe(response => {
    //     console.log(response)
    //   })
  }

  delete(id:number) {
    this.movieservice.deleteData(id)
      .subscribe(response => {
        console.log(response);
      })
    this.ngOnInit()
  }

  logout(){
    localStorage.clear()
    this.route.navigate(['/login'])

  }

}
