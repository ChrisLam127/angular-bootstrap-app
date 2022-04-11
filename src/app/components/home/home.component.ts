import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public featuredProducts: IProduct[] = [];
  public newProducts: IProduct[] = [];
  public loading: boolean = false;
  public errorMessage: string | null = null;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getFeaturedProducts();
    this.getAllProductsFromServer();
  }

  public getAllProductsFromServer() {
    this.loading = true;
    this.productService.getAllProducts().subscribe(
      (data: IProduct[]) => {
        this.loading = false;
        this.newProducts = data.filter((item) => item.newProduct === true);

        this.newProducts.forEach((item) => {
          Object.assign(item, { quantity: 1, total: item.price });
        });
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error;
      }
    );
  }

  // Featured Products

  public getFeaturedProducts() {
    this.loading = true;
    this.productService.getAllProducts().subscribe((data: IProduct[]) => {
      this.loading = false;
      this.featuredProducts = data.filter((item) => item.home === true);

      this.newProducts.forEach((item) => {
        Object.assign(item, { quantity: 1, total: item.price });
      });
    });
  }

  // Adding product to the cart
  addToCart(product: IProduct) {
    this.cartService.addToCart(product);
  }
}
