import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OmdbRequestService {

  constructor(private http: HttpClient) { }

  readonly base_url = 'http://www.omdbapi.com/?i=';

  // movieId: string = 'tt0167260';
  getMovieData(movieId: string) {
    return this.http.get(`${this.base_url}${movieId}&apiKey=eb6c247e`);
  }
}
