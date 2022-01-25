import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('http://localhost:8080/api/users');
  }
  updateUsersFavouriteMovies(userID: number, movies: string) {
    const body = {movies: movies};
    return this.http.put(`http://localhost:8080/api/movies/${userID}`, body);
  }
  createUser(firstName: string, lastName: string, favouriteMovies: string) {
    return this.http.post(`http://localhost:8080/api/user`, {
      'firstName': firstName,
      'lastName': lastName,
      'favouriteMovies': favouriteMovies}
    );
  }
  deleteUser(userID: number) {
    return this.http.delete(`http://localhost:8080/api/user/${userID}`);
  }
}
