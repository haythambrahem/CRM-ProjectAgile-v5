import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedDetail: string | null = null;

  selectDetail(detail: string): void {
    this.selectedDetail = detail;
  }

  isSelected(detail: string): boolean {
    return this.selectedDetail === detail;
  }
}
