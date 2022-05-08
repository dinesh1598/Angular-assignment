import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validator,
  Validators,
} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  maxDate: any = '2022-04-19';

  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private toaster: ToastrService,
    private activeRouter : ActivatedRoute
  ) {}


    //Form group created for data binding
    newFormValue = new FormGroup({
      productid: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]+$'),
      ]),
      name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      category: new FormControl(''),
      price: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]+$'),
      ]),
      serialnumber: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]+$'),
      ]),
      releasedate: new FormControl(''),
      stockunit: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]+$'),
      ]),
      description: new FormControl(''),
    });

    //getters for validations
    get productidValid() {
      return this.newFormValue.get('productid');
    }
    get validateName() {
      return this.newFormValue.get('name');
    }
    get validateSerialNumber() {
      return this.newFormValue.get('serialnumber');
    }
    get validateStock() {
      return this.newFormValue.get('stockunit');
    }
    get validPrice() {
      return this.newFormValue.get('price');
    }

  ngOnInit(): void {
    this.pid=this.activeRouter.snapshot.params['id'];
    // console.log(this.pid)
    this.getSingleProduct();

  }
  //variables created for appending data in edit modal
  pid: any;
  productId: any;
  name: any;
  category: any;
  price: any;
  serialnumber: any;
  releasedate: any;
  stockunit: any;
  description: any;

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


    //disable future dates
    disableFutureDate() {
      var date: any = new Date();
      var todayDate: any = date.getDate();
      var month: any = date.getMonth() + 1;
      var year: any = date.getFullYear();
      if (todayDate < 10) {
        todayDate = '0' + todayDate;
      }
      if (month < 10) {
        month = '0' + month;
      }
      this.maxDate = year + '-' + month + '-' + todayDate;
      // console.log(this.maxDate);
    }
}
