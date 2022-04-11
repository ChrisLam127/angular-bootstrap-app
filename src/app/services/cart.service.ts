import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../models/IProduct';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject([]);

  constructor() {}

  // Getting all products
  getProducts() {
    return this.productList.asObservable();
  }

  // Define a setter method to set new products in the cart array
  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  // adding product to the cart
  addToCart(product: any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }

  // Cart Total Price
  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((item: any) => {
      grandTotal += item.total * item.quantity;
    });
    return grandTotal;
  }

  // Increment Quantity
  increment(item: any) {
    this.cartItemList.map((product: any) => {
      if (product.id === item.id) {
        return {
          ...product,
          quantity: (product.quantity += 1),
        };
      }
      return product;
    });
    console.log(this.cartItemList);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }
  // Decrement Quantity
  decrement(item: any) {
    this.cartItemList.map((product: any) => {
      if (product.id === item.id) {
        return {
          ...product,
          quantity: product.quantity - 1 > 0 ? (product.quantity -= 1) : 1,
        };
      }
      return product;
    });
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }

  // Removing one Item from the cart
  removeCartItem(product: any) {
    this.cartItemList.map((item: any, index: any) => {
      if (product.id === item.id) {
        this.cartItemList.splice(index, 1);
      }
    });
    this.productList.next(this.cartItemList);
  }

  // removing all items from the cart
  clearCartItem() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
