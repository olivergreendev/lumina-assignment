import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class UserDataComponent implements AfterViewInit {

  columnsToDisplay: string[] = ['id', 'name', 'favourites'];
  expandedElement: UserModel | null;
  userData = null;
  userMovieData = [];
  fetchedUserMovieData = [];
  dataSource = new MatTableDataSource<UserModel>(this.userData);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient,
              private omdbRequestService: OmdbRequestService,
              private usersRequestService: UsersService) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    
    // this.fetchUserData().then(res => this.fetchMovieData());

    this.usersRequestService.getUsers().subscribe((data: any) => {
      this.userData = data;
      this.dataSource = this.userData;
      for(let i = 0; i < data.length; i++) {
        this.userMovieData.push(data[i].favourite_movies.split(','));
        for(let k = 0; k < this.userMovieData[i].length; k++) {
          this.omdbRequestService.getMovieData(this.userMovieData[i][k]).subscribe((data: Movie) => {
            // this.fetchedUserMovieData.push([{title: data.Title, poster: data.Poster, plot: data.Plot}]);
            this.userMovieData[i][k] = {title: data.Title, poster: data.Poster, plot: data.Plot};
          });
        }
      }
      console.log(this.userMovieData);
      // console.log(this.fetchedUserMovieData);
    })

    // This is working, however the API code needs this.userMovieData to not = null before executing
    // Promises ?
    // setTimeout(() => {
    //   for(let i = 0; i < this.userMovieData.length; i++) {
    //     for(let k = 0; k < this.userMovieData[i].length; k++) {
    //       this.omdbRequestService.getMovieData(this.userMovieData[i][k]).subscribe((data: Movie) => {
    //         this.userMovieData[i][k] = {title: data.Title, poster: data.Poster, plot: data.Plot};
    //       });
    //     }
    //   }
    //   // console.log(this.userMovieData);
    // }, 2000);
  }
  fetchUserData() {
    return new Promise((resolve, reject) => {
      this.usersRequestService.getUsers().subscribe((data: any) => {
        this.userData = data;
        this.dataSource = this.userData;
        for(let i = 0; i < data.length; i++) {
          this.userMovieData.push(data[i].favourite_movies.split(','));
        }
        // console.log(this.userMovieData);
        resolve('Promise resolved.');
      });
    });
  }

  fetchMovieData() {
    for(let i = 0; i < this.userMovieData.length; i++) {
      for(let k = 0; k < this.userMovieData[i].length; k++) {
        this.omdbRequestService.getMovieData(this.userMovieData[i][k]).subscribe((data: Movie) => {
          this.userMovieData[i][k] = {title: data.Title, poster: data.Poster, plot: data.Plot};
        });
      }
    }
    // console.log(this.userMovieData[5][1]);
  }
}

export interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  favourite_movies: string;
  movies: string[];
}

export interface Movie {
  Title: string;
  Poster: string;
  Plot: string;
}

/*
[
  {
    id: 'tt0167260',
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    poster: 'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
    plot: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring"
  },
  {
    id: 'tt0167260',
    title: 'The Lord of the Rings: The Two Towers',
    poster: 'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
    plot: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring"
  },
  {
    id: 'tt0167260',
    title: 'The Lord of the Rings: The Return of the King',
    poster: 'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
    plot: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring"
  }
]
*/