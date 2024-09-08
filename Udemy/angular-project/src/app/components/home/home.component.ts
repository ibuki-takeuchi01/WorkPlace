import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  public categoryList: string[] = ['冷蔵庫', 'トイレ', 'キッチン', '掃除機', '空調機器', 'テレビ', 'その他'];

  public trackByIndex(index: number, item: any): number {
    return index;
  }
}
