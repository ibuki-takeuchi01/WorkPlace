import { Component, Input, Inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product;

  private productService = Inject(ProductService);
  public addToCart(addedProduct: Product): void {
    this.productService.onAddToCart$.next(addedProduct);
  }
}
