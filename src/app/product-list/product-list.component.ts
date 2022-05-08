import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validator,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  formValue!: FormGroup;
  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  today = new Date();
  maxDate: any = '2022-04-19';

  dataSaved = false;

  fetchedProductsData: any;

  //variables created for appending data in edit modal
  pid:any;
  productId : any;
  name:any;
  category:any;
  price:any;
  serialnumber:any;
  releasedate:any;
  stockunit:any;
  description:any;

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
    this.disableFutureDate();
    this.getAllProducts();
  }

  //adding products in json server
  addProducts() {
    this.api.postProducts(this.newFormValue.value).subscribe((res) => {
      this.dataSaved = true;
      let ref = document.getElementById('cancel');
      ref?.click();
      this.newFormValue.reset();
      this.getAllProducts();
      this.toaster.success('Product Added', 'Success', {
        progressBar: true,
      });
    });
  }

  //fetch products data on modal to edit
  getProductDetailsToEdit(product:any){
    this.api.getProducts().subscribe((data)=>{
      // console.log(data[product]['productid'])
      this.productId = data[product]['productid'];
      this.name = data[product]['name'];
      this.category = data[product]['category'];
      this.price = data[product]['price'];
      this.serialnumber = data[product]['serialnumber'];
      this.releasedate = data[product]['releasedate'];
      this.stockunit = data[product]['stockunit'];
      this.description = data[product]['description'];
    })
  }

  // edit product function
  editProducts(){

  }



  //fetching all products from json server using services(api)
  getAllProducts() {
    this.api.getProducts().subscribe((data) => {
      this.fetchedProductsData = data;
      // console.log(data);
    });
  }

  //delete data
  deleteData(product_id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // this.api.deleteProduct(product_id).subscribe((res)=>{
        //   this.toaster.success("Product Deleted","Success",{
        //     progressBar:true
        //   })
        // })
        this.api.deleteProduct(product_id).subscribe((res) => {
          Swal.fire('Deleted!', 'Product has been deleted', 'success');
          this.getAllProducts();
        });
      }
    });
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
