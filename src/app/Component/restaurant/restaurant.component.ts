import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { RestoService } from '../../Services/resto/resto.service';


@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
random1 = Math.round(Math.random() * 1000);
random2 = Math.round(Math.random() /2 * 10);

  data: {
    name: string,
    type: string,
    region: string,
    minOrder: string,
    workingHours: string,
    deliveryTime: string,
    deliveryFee: number,
    cuisines: string,
    onlineTracking: string,
    image: string,
    description:string
  } = {
    name: 'Amira',
    type: 'lolo',
    region: 'Alex',
    minOrder: '25',
    workingHours: '25',
    deliveryTime: '25',
    deliveryFee: 0,
    cuisines: 'fslmm',
    onlineTracking: 'true',
    image: 'alalal',
    description:'loremkfndfs,.jbdj.fnbdj/lfnbj/dsfnb/lsjfnbj/lsdbdsjbs jdvnjnsjlcnjsbcsjcbbsfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbefmmmmmmmmmmmmmmmmmmmmmmmmffffffffffffffkkkkkkkkkkkkkkkkkkksssssssssssssssssssnnnnnnnnnnnnnnnnnffffffffffffffffffffffffffffmmmmmmmmmmmm'
  };

  menuId = 0;


  constructor(private resto: RestoService, private router: Router) {
    this.menuId = router.getCurrentNavigation()?.initialUrl.queryParams['id'];

   }

  ngOnInit(): void {
   this.resto
    .getRest(this.menuId)
    .subscribe({
      next: (data) => {
        this.data = data.data;
       },
      error: (e) => {
        console.log(e);
      },
      complete: () => {

      },
    });
   }

  routeToMenu(){
    this.router.navigate(['/menu'], { queryParams: { id: this.menuId  }});

  }

}
