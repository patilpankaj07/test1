import { Component, OnInit } from '@angular/core';

// import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-userdata',
  standalone: true,
  imports: [],
  templateUrl: './userdata.component.html',
  styleUrl: './userdata.component.css'
})
export class UserdataComponent implements OnInit{

  user: any;

 

  ngOnInit() {
    // Retrieve user details from localStorage
    const storedUserDetails = localStorage.getItem('user');

    // Parse the JSON string to get the user object
    this.user = storedUserDetails ? JSON.parse(storedUserDetails) : null;

  }
    


} 
