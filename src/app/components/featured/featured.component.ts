import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css'],
})
export class FeaturedComponent implements OnInit {
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
  }

  // Featured Products

  public getFeaturedProducts() {
    this.loading = true;
    this.productService.getAllProducts().subscribe((data: IProduct[]) => {
      this.loading = false;
      this.featuredProducts = data.filter((item) => item.home === true);

      this.newProducts.forEach((item) => {
        Object.assign(item, { total: item.price });
      });
    });
  }

  // Adding product to the cart
  addToCart(product: IProduct) {
    this.cartService.addToCart(product);
  }
}
