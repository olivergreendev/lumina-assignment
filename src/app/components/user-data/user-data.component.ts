import { animate, state, style, transition, trigger } from '@angular/animations';
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

  constructor(private omdbRequestService: OmdbRequestService,
              private usersRequestService: UsersService) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.usersRequestService.getUsers().subscribe((data: any) => {
      this.userData = data;
      this.dataSource = this.userData;
      for(let i = 0; i < data.length; i++) {
        this.userMovieData.push(data[i].favourite_movies.split(','));
        for(let k = 0; k < this.userMovieData[i].length; k++) {
          this.omdbRequestService.getMovieData(this.userMovieData[i][k]).subscribe((data: Movie) => {
            this.userMovieData[i][k] = {title: data.Title,
                                        poster: data.Poster,
                                        plot: data.Plot,
                                        rated: data.Rated,
                                        year: data.Year,
                                        genre: data.Genre,
                                        runtime: data.Runtime,
                                        director: data.Director};
          });
        }
      }
    })
  }
}

export interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  favourite_movies: string;
}

export interface Movie {
  Title: string;
  Poster: string;
  Plot: string;
  Rated: string;
  Year: string;
  Genre: string;
  Runtime: string;
  Director: string;
}