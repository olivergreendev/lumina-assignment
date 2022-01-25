import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OmdbRequestService } from 'src/app/services/omdb-request.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expandeed', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1.0)')),
    ]),
  ],
})

export class UserDataComponent implements OnInit {

  columnsToDisplay: string[] = ['id', 'name', 'favourites', 'deleteUser'];
  expandedElement: UserModel | null;
  userData = null;
  userMovieData = [];
  fetchedUserMovieData = [];
  dataSource = new MatTableDataSource<UserModel>(this.userData);
  dialogMovieID: string;

  constructor(private omdbRequestService: OmdbRequestService,
              private usersRequestService: UsersService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.refreshTableData();
  }

  deleteMovie(movieID: string, movies: string, userID: number) {
    // We need to get the string of favourite_movies for the user, and replace(id, '')
    const moviesSplit = movies.split("," || "");
    const moviesUpdated = moviesSplit.filter(movie => movie !== movieID).join();
    // Make a http request to the node backend server to update a value for a user
    const dialogRef = this.dialog.open(DeleteMovieDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.usersRequestService.updateUsersFavouriteMovies(userID, moviesUpdated).subscribe((result) => {
          this.refreshTableData();
        });
      }
    });
  }
  deleteUser(userID: number) {
    const dialogRef = this.dialog.open(DeleteUserDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.usersRequestService.deleteUser(userID).subscribe((result) => {
          this.refreshTableData();
        });
      }
    });
  }
  addMovie(userID: number, existingMovies: string) {
    const dialogRef = this.dialog.open(AddMovieDialog, {
      width: '350px',
      data: {userID: userID, movieID: this.dialogMovieID},
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const splitExistingMovies = existingMovies.split("," || "");
        const splitNewMovies = result.split("," || "");
        const updatedMovies = splitExistingMovies.concat(splitNewMovies).join();
        this.usersRequestService.updateUsersFavouriteMovies(userID, updatedMovies).subscribe((result) => {
          this.refreshTableData();
        });
      }
    });
  }
  refreshTableData() {
    this.userMovieData = [];
    this.usersRequestService.getUsers().subscribe((users: any) => {
      this.userData = users;
      this.dataSource = this.userData;
      for(let i = 0; i < users.length; i++) {
        if (users[i].favourite_movies !== null) {
          this.userMovieData.push(users[i].favourite_movies.split(','));
            for(let k = 0; k < this.userMovieData[i].length; k++) {
              if (this.userMovieData[i][k] !== '') {
                this.omdbRequestService.getMovieData(this.userMovieData[i][k]).subscribe((movie: Movie) => {
                  this.userMovieData[i][k] = {imdbID: movie.imdbID,
                                              title: movie.Title,
                                              poster: movie.Poster,
                                              plot: movie.Plot,
                                              rated: movie.Rated,
                                              year: movie.Year,
                                              genre: movie.Genre,
                                              runtime: movie.Runtime,
                                              director: movie.Director};
                });
              }
            }
        } else {
          this.userMovieData.push(['']);
        }
      }
    });
  }
}

export interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  favourite_movies: string;
}
export interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Plot: string;
  Rated: string;
  Year: string;
  Genre: string;
  Runtime: string;
  Director: string;
}
export interface DialogData {
  movieID: string;
}

@Component({
  selector: 'delete-user-dialog',
  templateUrl: 'delete-user-dialog.html',
})
export class DeleteUserDialog { }

@Component({
  selector: 'delete-movie-dialog',
  templateUrl: 'delete-movie-dialog.html',
})
export class DeleteMovieDialog { }

@Component({
  selector: 'add-movie-dialog',
  templateUrl: 'add-movie-dialog.html',
})
export class AddMovieDialog {
  constructor(public dialogRef: MatDialogRef<AddMovieDialog>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}