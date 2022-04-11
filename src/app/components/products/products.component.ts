import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/models/IProduct';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public loading: boolean = false;
  public products: IProduct[] = [];
  public productData: IProduct = {} as IProduct;
  public errorMessage: string | null = null;

  public hero: string = 'Here Is The List Of All Our Products';

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getAllProductsFromServer();
  }

  public getAllProductsFromServer() {
    this.loading = true;
    this.productService.getAllProducts().subscribe(
      (data: IProduct[]) => {
        this.loading = false;
        this.products = data;
        this.products.forEach((item: any) => {
          Object.assign(item, { total: item.price });
        });
      },
      (error) => {
        this.errorMessage = error;
        this.loading = false;
      }
    );
  }

  // Adding Product to the Cart
  addToCart(product: IProduct) {
    this.cartService.addToCart(product);
  }
}
