import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  public categoryList: string[] = ['冷蔵庫', '洗濯機', 'キッチン', '掃除機', '空調機器', 'テレビ', 'その他'];
  public productList: Product[] = [
    { productId: 1, rating: 4, productName: 'French Door Fridge', category: '冷蔵庫', price: 222000, isSale: false, releaseDate: '2024-02-01', availableQty: 3, imageUrl: 'assets/images/1.jpg' },
    { productId: 2, rating: 5, productName: 'Side-by-Side Fridge', category: '冷蔵庫', price: 170000, isSale: false, releaseDate: '2023-03-22', availableQty: 0, imageUrl: 'assets/images/2.jpg' },
    { productId: 3, rating: 3, productName: 'Top-Freezer Fridge', category: '冷蔵庫', price: 110000, isSale: true, releaseDate: '2023-01-10', availableQty: 5, imageUrl: 'assets/images/3.jpg' },
    { productId: 4, rating: 5, productName: 'Front Load Washer', category: '洗濯機', price: 80000, isSale: false, releaseDate: '2022-12-30', availableQty: 0, imageUrl: 'assets/images/4.jpg' },
    { productId: 5, rating: 3, productName: 'Top Load Washer', category: '洗濯機', price: 70000, isSale: true, releaseDate: '2023-02-14', availableQty: 2, imageUrl: 'assets/images/5.jpg' },
    { productId: 6, rating: 1, productName: 'OTR Microwave', category: 'キッチン', price: 25000, isSale: false, releaseDate: '2023-04-08', availableQty: 8, imageUrl: 'assets/images/6.jpg' },
    { productId: 7, rating: 3, productName: 'Stand Mixer', category: 'キッチン', price: 35000, isSale: true, releaseDate: '2023-05-28', availableQty: 3, imageUrl: 'assets/images/7.jpg' },
    { productId: 8, rating: 2, productName: 'High-Power Vacuum', category: '掃除機', price: 45000, isSale: false, releaseDate: '2023-01-17', availableQty: 0, imageUrl: 'assets/images/8.jpg' },
    { productId: 9, rating: 5, productName: 'Robot Vacuum', category: '掃除機', price: 65000, isSale: true, releaseDate: '2023-03-11', availableQty: 1, imageUrl: 'assets/images/9.jpg' },
    { productId: 10, rating: 1, productName: 'Air Purifier & Heater', category: '空調機器', price: 40000, isSale: false, releaseDate: '2022-11-25', availableQty: 2, imageUrl: 'assets/images/10.jpg' },
    { productId: 11, rating: 2, productName: 'Evaporative Cooler', category: '空調機器', price: 30000, isSale: false, releaseDate: '2023-02-05', availableQty: 4, imageUrl: 'assets/images/11.jpg' },
    { productId: 12, rating: 4, productName: '65 Inch 4K TV', category: 'テレビ', price: 110000, isSale: false, releaseDate: '2024-04-21', availableQty: 7, imageUrl: 'assets/images/12.jpg' },
    { productId: 13, rating: 3, productName: 'OLED TV', category: 'テレビ', price: 200000, isSale: false, releaseDate: '2023-01-03', availableQty: 2, imageUrl: 'assets/images/13.jpg' },
    { productId: 14, rating: 2, productName: 'Mini TV', category: 'テレビ', price: 25000, isSale: true, releaseDate: '2023-01-10', availableQty: 5, imageUrl: 'assets/images/14.jpg' },
    { productId: 15, rating: 5, productName: 'Compact TV', category: 'テレビ', price: 30000, isSale: true, releaseDate: '2023-01-10', availableQty: 5, imageUrl: 'assets/images/15.jpg' }
  ];

  public filteredProducts: Product[] = [];
  public selectedCategory: string = '';

  constructor() {
    this.productList = this.markNewProducts(this.productList);
    this.filteredProducts = this.productList;
  }

  public trackByIndex(index: number, item: any): number {
    return index;
  }

  private markNewProducts(productList: Product[]): Product[] {
    const referenceDate = new Date('2024-04-01');
    const threeMonthAgo = new Date(referenceDate);
    threeMonthAgo.setMonth(threeMonthAgo.getMonth() - 3);

    return productList.map(product => {
      const releaseDate = new Date(product.releaseDate);
      product.isNew = releaseDate > threeMonthAgo;
      return product;
    });
  }

  public filterCategory(category: string): void {
    if (this.selectedCategory === category) {
      this.selectedCategory = '';
      this.filteredProducts = this.productList;
    } else {
      this.selectedCategory = category;
      this.filteredProducts = this.productList.filter(product => product.category === category);
    }
  }

  public sortProducts(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    if (target) {
      const sortOption = target.value;
      switch (sortOption) {
        case 'priceAsc':
          this.filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'priceDesc':
          this.filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'ratingDesc':
          this.filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        default:
          this.filteredProducts.sort((a, b) => a.productId - b.productId);
          break;
      }
    }
  }
}
