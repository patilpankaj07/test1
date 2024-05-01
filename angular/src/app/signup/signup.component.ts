import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  user = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

   register()
   {
     

      if (this.user.password !== this.user.confirmPassword) {
        alert('Password and Confirm Password do not match.');
        return;
      }


      const hasAtSymbol = this.user.email.includes('@');
      const hasDot = this.user.email.includes('.');
  
      if (!hasAtSymbol || !hasDot) {
        alert('Invalid email format.');
        return;
      }

      // Save user data to localStorage
      localStorage.setItem('user', JSON.stringify(this.user));
      alert('Registration successful!');
   }
    
}
