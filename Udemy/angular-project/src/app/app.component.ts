import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from './services/product.service';
import { Product } from './models/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public title = 'angular-project';
  private productService = inject(ProductService);
  public isCartVisible: boolean = false;
  public cartItems: Product[] = [];
  private addToCartSubscription: Subscription;

  constructor() {
    this.addToCartSubscription = this.productService.onAddToCart$.subscribe((res: Product) => {
      this.cartItems.unshift(res);
    });
  }

  public ngOnDestroy(): void {
    if (this.addToCartSubscription) {
      this.addToCartSubscription.unsubscribe();
    }
  }

  public showCart(): void {
    this.isCartVisible = !this.isCartVisible;
  }

  public trackByIndex(index: number, item: Product): number {
    return index;
  }

  public removeProduct(index: number): void {
    this.cartItems.splice(index, 1);
  }

  public getTotalQuantity(): number {
    return this.cartItems.length;
  }
}
