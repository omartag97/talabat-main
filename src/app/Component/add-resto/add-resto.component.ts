import { Component, OnInit } from '@angular/core';
import { RestoService } from '../../Services/resto/resto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-resto',
  templateUrl: './add-resto.component.html',
  styleUrls: ['./add-resto.component.css']
})

export class AddRestoComponent implements OnInit {
  data: any = {};
  form: any = {
    name: null,
    email: null,
    address: null,
    logo: null,
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
    this.form.logo = fileBase64;
  }

  constructor(private resto: RestoService, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(): void {
    const { name, email, address, logo } = this.form;

      this.resto
      .saveResto(name, email, address, logo)
      .subscribe({
        next: (data) => {
          this.data = data;
          console.log(this.data);
        },
        error: (e) => {
          console.log(e);
        },
        complete: () => {

        },
      });
  }

}










