import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IProduct } from 'src/app/models/IProduct';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  public loading: boolean = false;
  public id: string | null = null;
  public product: IProduct = {} as IProduct;
  public products: IProduct[] = [];
  public errorMessage: string | null = null;

  public hero: string = 'Product Details Page';

  constructor(
    private activateRouter: ActivatedRoute,
    private productService: ProductService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.activateRouter.paramMap.subscribe((param: ParamMap) => {
      this.id = param.get('id');
    });

    if (this.id) {
      this.productService.getProduct(this.id).subscribe(
        (data: IProduct) => {
          this.product = data;
          this.loading = false;
        },
        (error) => {
          this.errorMessage = error;
          this.loading = false;
        }
      );
    }

    this.getSomeProductsFromServer();
  }

  // GET all Products
  public getSomeProductsFromServer() {
    this.loading = true;
    this.productService.getAllProducts().subscribe(
      (data: IProduct[]) => {
        this.loading = false;
        this.products = data.slice(0, 4);
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

  // Add To Cart
  addToCart(product: IProduct) {
    this.cartService.addToCart(product);
  }

  // Incerment Qunatity

  public incrQuantity(): void {
    this.product = {
      ...this.product,
      quantity: this.product.quantity + 1,
    };
  }

  // Decrement Quantity
  public decrQuantity(): void {
    this.product = {
      ...this.product,
      quantity: this.product.quantity - 1 > 0 ? this.product.quantity - 1 : 1,
    };
  }
}
