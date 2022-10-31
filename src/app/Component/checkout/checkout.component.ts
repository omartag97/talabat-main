import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/cart/cart.service';
import { ProductService } from 'src/app/Services/product/product.service';
import { RestoService } from 'src/app/Services/resto/resto.service';
import { TokenStorageService } from 'src/app/Services/token/token-storage.service';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
creditSelected=false;
subTotal=0;
deliveryFee=0;

address:{
  address_name:any,
  address_details:any,
  mobile:any
}={
  address_name:'',
  address_details:'',
  mobile:''
};


cartArr: {
    id: any,
    count: number,
    price: number
  }[] = [
    ];

  checkOut: {
    id: any;
    image: string;
    name: string;
    price: number;
  }[] = [ ];

  constructor(    private resto: RestoService,
    private cart: CartService,
    private product: ProductService,
    private token :TokenStorageService,
    private user:UserService
) { }

  ngOnInit(): void {

    this.user.getDetails().subscribe({
      next: (data) => {
        console.log(data);
        this.address = data;
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {

      },
    });

    this.cartArr = this.cart.getCart();
    this.cartArr.forEach((element) => {
      this.product.getProduct(element.id).subscribe({
        next: (data) => {
          this.checkOut.push(data.data);
        },
        error: (e) => {
          console.log(e);
        },
        complete: () => {},
      });
    });

    this.getSubtotal();
    this.deliveryFee = this.cart.getRest().deiveryFee;

  }
  getCount(id: any) {
    let count = 0;
    this.cartArr = this.cart.getCart();
    this.cartArr.forEach((element) => {
      if (element.id == id) count = element.count;
    });
    return count;
  }

  getSubtotal():void{
    this.subTotal=0;
    this.cartArr.forEach(element =>{
      this.subTotal += element.price * element.count;
    })
  }
 getRestName():any{
  return this.cart.getRest().restName;
 }

 select(id:any):void{
  let element1 = document.getElementById(id);
  let element2 ;
  if(id == 'cash'){
    element2=document.getElementById('credit');
    this.creditSelected=false;
  }
  else{
    element2=document.getElementById('cash');
    this.creditSelected =true;

  }

  console.log(this.creditSelected);

  if(element1)
    element1.style.border='solid 2px #ff5a00';
    if(element2)
      element2.style.border='none';
 }
}
