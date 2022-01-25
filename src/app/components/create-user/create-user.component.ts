import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private usersRequestService: UsersService) { }

  ngOnInit(): void { }

  createUserForm = this.formBuilder.group({
    firstName: '',
    lastName: '',
    favouriteMovies: ''
  });

  onSubmit(): void {
    const formValues = this.createUserForm.value;
    this.usersRequestService.createUser(formValues.firstName, formValues.lastName, formValues.favouriteMovies)
      .subscribe((result) => {
        // call the tableRefreshData() function here [user-data-component.ts]
      });
  }
}
