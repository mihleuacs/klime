import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';  
import { Router } from '@angular/router'
import { UtilityService } from '../services/utility.service';
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: any[] = []; 

 
  showAddCastButton: boolean = true;

  constructor(private movieService: MovieService, private router: Router, private utilityService: UtilityService) { }

  ngOnInit() {
    this.movieService.getMovies().subscribe(
      (data) => {
        this.movies = data;
        console.log(this.movies);
      },
      (error) => {
        console.error('Error fetching movies', error);
      }
    );
  }

  viewMovie(id: number) {
    this.router.navigate(['/movies', id]);
    console.log(`View movie with ID: ${id}`);
  }

  editMovie(id: number) {
    
    console.log(`Edit movie with ID: ${id}`);
    this.router.navigate(['/movies', id, 'edit']); 
  }

  deleteMovie(id: number) {
    const confirmDelete = window.confirm('Are you sure you want to delete this movie?');

    if (confirmDelete) {
      this.movieService.deleteMovie(id).subscribe(
        (data) => {
          console.log(`Movie with ID ${id} deleted successfully`, data);
         
          this.refreshMovieList();
        },
        (error) => {
          console.error(`Error deleting movie with ID ${id}`, error);
        }
      );
    }
  }

  refreshMovieList() {
    
    this.movieService.getMovies().subscribe(
      (data) => {
        this.movies = data;
      },
      (error) => {
        console.error('Error fetching movies', error);
      }
    );
  }


  addCast(movieId: number) {
   
    console.log(`Add cast to movie with ID: ${movieId}`);
  }

  
  getOscars(oscars: { [key: string]: string }): string {
    if (!oscars) return '';

   
    return Object.entries(oscars).map(([type, recipient]) => `${type}: ${recipient}`).join(', ');
  }
}

