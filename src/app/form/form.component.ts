import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(private movieservice: MovieService, private route: Router, private fb: FormBuilder) { }

  movie: any = JSON.parse(localStorage.getItem('movieData')!)

  category: any[] = []
  name: string = ''
  description: string = ''
  file: any
  option: any
  data: any[] = []
  selectedOption: any
  printOption: any
  movieName: string = this.movie?.name
  movieDescription: string = this.movie?.description
  movieCategory: string = this.movie?.category
  
  @ViewChild('option') optionVAL!: ElementRef;
  @ViewChild('category') categoryVAL!: ElementRef;
  @ViewChild('cat') cate!: ElementRef;

  ngOnInit(): void {
    this.movieservice.getDataCategory().subscribe(data => {
      this.category = data.message
    })

    if (!localStorage.getItem('token')) {
      this.route.navigate(['/login'])
    }

  }


  getName(name: string) {
    this.name = name
    this.formData.append("name", this.name);
    console.log(this.name);
  }

  getDescription(description: string) {
    this.description = description
    this.formData.append("description", this.description);
  }

  getFile(event: any) {
    this.file = event.target.files[0]
  }


  getCategory() {
    this.printOption = this.selectedOption
    this.formData.append("category_id", this.printOption);
  }

  selectImage() {
    this.formData.append("image", this.file);
  }

  formData: any = new FormData();

  submitData() {
    if (localStorage.getItem('movieData')) {
      this.formData.append('_method', 'put')
      this.movieservice.updateData(this.formData, this.movie?.id)
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
    }, 1000);
  }
}
