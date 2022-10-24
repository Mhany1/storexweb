import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  constructor(private movieservice: MovieService, private activatedRoute: ActivatedRoute, private route: Router) { }

  movies: any[] = []
  id: any
  name: string = ''
  file: any
  category: any[] = []
  category1: any[] = []

  ngOnInit(): void {
    this.movieservice.getData().subscribe(res => {
      this.movies = res.message
    })

    if (!localStorage.getItem('token')) {
      this.route.navigate(['/login'])
    }
  }

  onChange(event: { target: { files: File[]; }; }) {
    this.file = event.target.files[0];
  }

  filter(value: string) {
    this.category1 = this.movies.filter(p => p.name === value)
    console.log(this.category1);
  }

  getName(name: string) {
    this.name = name
  }
  getFile(event: any) {
    this.file = event.target.files[0]
  }

  updateData(id: number, movie: any) {
    localStorage.setItem('movieData', JSON.stringify(movie))
  }

  delete(id: number) {
    this.movieservice.deleteData(id)
      .subscribe(response => {
        console.log(response);
      })
    this.ngOnInit()
  }

  logout() {
    localStorage.clear()
    this.route.navigate(['/login'])
  }

  clearData() {
    localStorage.removeItem('movieData');
  }
}
