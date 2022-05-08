import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AddProductComponent } from './add-product/add-product.component';
import { TestFormComponent } from './form/form.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeScreenComponent,
  },
  {
    path: 'welcomescreen',
    component: WelcomeScreenComponent,
  },
  {
    path: 'productlist',
    component: ProductListComponent,
  },
  {
    path: 'productdetails/:id',
    component: ProductDetailsComponent,
  },
  // {
  //   path:'**',
  //   component:ProductListComponent
  // },
  {
    path: 'addproduct',
    component: AddProductComponent,
  },
  {
    path: 'editproduct/:id',
    component: EditProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
