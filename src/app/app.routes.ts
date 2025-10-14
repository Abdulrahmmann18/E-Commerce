import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { BrandsComponent } from './features/products/brands/brands.component';
import { CartComponent } from './features/products/cart/cart.component';
import { CategoriesComponent } from './features/products/categories/categories.component';
import { HomeComponent } from './features/products/home/home.component';
import { ProductDetailsComponent } from './features/products/product-details/product-details.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { authGaurdGuard } from './core/guards/authGaurd/auth-gaurd.guard';
import { ProductsComponent } from './shared/products/products.component';
import { OrderComponent } from './features/products/order/order/order.component';
import { AllordersComponent } from './features/products/order/allorders/allorders.component';
import { BrandDetailsComponent } from './features/products/brand-details/brand-details.component';
import { WishListComponent } from './features/products/wish-list/wish-list.component';
import { ForgetPasswordComponent } from './features/auth/forget-password/forget-password.component';
import { ResetPassCodeComponent } from './features/auth/reset-pass-code/reset-pass-code.component';
import { ResetPassComponent } from './features/auth/reset-pass/reset-pass.component';

export const routes: Routes = [
    {path : "", redirectTo : "home", pathMatch : "full"},
    {path : "register", component : RegisterComponent, title : "Register"},
    {path : "login", component : LoginComponent, title : "Login"},
    {path : "forgetPassword", component : ForgetPasswordComponent , title : "Forget Password"},
    {path : "resetPassCode", component : ResetPassCodeComponent , title : "Reset Password Code"},
    {path : "resetPass", component : ResetPassComponent , title : "Reset Password"},
    {path : "brands", component : BrandsComponent, title : "Brands", canActivate : [authGaurdGuard]},
    {path : "brand-details/:brandtId", component : BrandDetailsComponent, title : "Brand-Details", canActivate : [authGaurdGuard]},
    {path : "cart", component : CartComponent, title : "Cart", canActivate : [authGaurdGuard]},
    {path : "wishList", component : WishListComponent, title : "Wish List", canActivate : [authGaurdGuard]},
    {path : "categories", component : CategoriesComponent, title : "Categories", canActivate : [authGaurdGuard]},
    {path : "home", component : HomeComponent, title : "Home", canActivate : [authGaurdGuard]},
    {path : "product-details/:productId", component : ProductDetailsComponent, title : "Product-Details", canActivate : [authGaurdGuard]},
    {path : "products", component : ProductsComponent, title : "Products", canActivate : [authGaurdGuard]},
    {path : "order/:cartId", component : OrderComponent, title : "Order", canActivate : [authGaurdGuard]},
    {path : "allorders", component : AllordersComponent, title : "All Orders", canActivate : [authGaurdGuard]},
    {path : "**", component : NotFoundComponent, title : "Not-Found"}
];
