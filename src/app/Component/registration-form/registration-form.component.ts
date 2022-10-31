import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent implements OnInit {
  data: any = {};
  form: any = {
    name: null,
    email: null,
    password: null,
    confirm_password: null,
    image: null,
  };

  toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  async updateImageFile(event: any) {
    const file: File = event.target.files[0];
    const fileBase64 = await this.toBase64(file);
    this.form.image = fileBase64;
  }

  isSuccessful = false;
  isSignUpFailed = false;
  isLoggedIn = true;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const { name, email, password, confirm_password, image } = this.form;

      this.authService
      .register(name, email, password, confirm_password, image)
      .subscribe({
        next: (data) => {
          this.data = data;
        },
        error: (e) => {
          console.log(e);
          this.errorMessage = e.error.message;
          this.isSignUpFailed = true;
        },
        complete: () => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.isLoggedIn = false;

          //redirect this.data.role
          if (this.data.role) {
            this.router.navigate(['admin']);
          } else {
            this.router.navigate(['user']);

          }
        },
      });
  }
}
