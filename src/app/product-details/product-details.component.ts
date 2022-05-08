import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {



  constructor(private api:ApiService,private router : ActivatedRoute) { }
  fetchedProductsData: any;
  pid:any;
  productId : any;
  name:any;
  category:any;
  price:any;
  serialnumber:any;
  releasedate:any;
  stockunit:any;
  description:any;
  ngOnInit(): void {
    this.pid=this.router.snapshot.params['id'];
    // console.log(this.pid)
    this.getSingleProduct();

  }
  getSingleProduct(){
    this.api.getProducts().subscribe((data)=>{
      // console.log(data[this.pid]['productid'])
      this.productId = data[this.pid]['productid'];
      this.name = data[this.pid]['name'];
      this.category = data[this.pid]['category'];
      this.price = data[this.pid]['price'];
      this.serialnumber = data[this.pid]['serialnumber'];
      this.releasedate = data[this.pid]['releasedate'];
      this.stockunit = data[this.pid]['stockunit'];
      this.description = data[this.pid]['description'];
    })
  }

}
