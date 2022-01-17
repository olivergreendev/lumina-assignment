import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})

export class UserDataComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'favouriteCount'];
  userData: any = [];
  dataSource = new MatTableDataSource<UserModel>(USER_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient, private userDataService: UserDataService) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.userDataService.getUserData().subscribe(data => {
      this.userData = data;
      console.log(this.userData);
    })
  }
}

export interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  favourite_movies: string;
}

const USER_DATA: UserModel[] = [
  { id: 1, firstName: 'Anona', lastName: 'Cruz', favourite_movies: 'tt0848228,tt4154756,tt2395427,tt4154796' },
  { id: 2, firstName: 'Camilla', lastName: 'Sayer', favourite_movies: 'tt4154756,tt10515848,tt0120575' },
  { id: 3, firstName: 'Ganesh', lastName: 'Zentai', favourite_movies: 'tt0287871,tt2975590,tt0103776,tt4116284,tt2313197' },
  { id: 4, firstName: 'Vivien', lastName: 'Straub', favourite_movies: 'tt0926084,tt0417741' },
  { id: 5, firstName: 'Bernardita', lastName: 'Bishop', favourite_movies: 'tt0389860' },
];