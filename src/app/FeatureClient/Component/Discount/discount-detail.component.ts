import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiscountDetailService } from '../../service/discount-detail.service';
import { Discount } from 'src/app/Model/discount.model';
import { DiscountType } from 'src/app/Model/enums';

@Component({
  selector: 'app-discount-detail',
  templateUrl: './discount-detail.component.html',
  styleUrls: ['./discount-detail.component.css']
})
export class DiscountDetailComponent implements OnInit {
  clientId: number | null = null;
  discounts: Discount[] = [];
  newDiscount: Partial<Discount> = {
    type: DiscountType.MOUNTANT,
    amount: 0
  };
  error: string | null = null;
  discountTypes = Object.values(DiscountType);
  amountLabel: string = 'Amount:';
  amountPlaceholder: string = 'Remis Amount';
  isEditMode: boolean = false; // To track if in edit mode
  editIndex: number | null = null; // To store the index of the discount being edited


  constructor(
    private discountService: DiscountDetailService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('clientId');
      if (id) {
        this.clientId = +id; // Convert to number
        if (isNaN(this.clientId)) {
          this.error = 'Invalid Client ID';
        } else {
          this.getDiscountsByClientId();
        }
      } else {
        this.error = 'Client ID is not available';
      }
    });
  }

  getDiscountsByClientId(): void {
    if (this.clientId != null) {
      this.discountService.getDiscountsByClientId(this.clientId).subscribe(
        data => {
          console.log('Discounts received:', data); // Inspect the API response
          this.discounts = data;
        },
        error => {
          this.error = 'Failed to load discounts';
          console.error('Error loading discounts:', error);
        }
      );
    } else {
      this.error = 'Client ID is not available';
    }
  }

  addDiscount(): void {
    if (this.clientId && this.newDiscount.type && this.newDiscount.amount != null) {
      const discountToAdd: Discount = {
        idClient: this.clientId,
        type: this.newDiscount.type as DiscountType,
        amount: this.newDiscount.amount,
        client: { id: this.clientId } as any
      };

      this.discountService.addDiscount(this.clientId, discountToAdd).subscribe(
        discount => {
          this.discounts.push(discount);
          this.newDiscount = { type: DiscountType.MOUNTANT, amount: 0 }; // Clear the form
        },
        error => {
          this.error = 'Failed to add discount';
          console.error('Error adding discount:', error);
        }
      );
    } else {
      this.error = 'Please provide valid discount details';
    }
  }
  editDiscount(index: number): void {
    // Populate the form with the discount details for editing
    const discountToEdit = this.discounts[index];
    this.newDiscount = { ...discountToEdit }; // Populate the form with the discount details
    this.isEditMode = true; // Set edit mode
    this.editIndex = index; // Store the index of the discount being edited
   }

  deleteDiscount(index: number): void {
    if (confirm('Are you sure you want to delete this discount?')) {
      this.discounts.splice(index, 1);
      if (this.isEditMode && this.editIndex === index) {
        this.isEditMode = false; // Exit edit mode if the edited discount was deleted
        this.editIndex = null; // Clear edit index
        this.newDiscount = { type: DiscountType.MOUNTANT, amount: 0 }; // Reset the form
      }
    }
  }
  cancelEdit(): void {
    this.resetForm(); // Reset the form and exit edit mode
  }
  resetForm(): void {
    this.isEditMode = false;
    this.editIndex = null;
    this.newDiscount = { type: DiscountType.MOUNTANT, amount: 0 }; // Reset the form
    this.amountLabel = 'Amount:';
    this.amountPlaceholder = 'Remis Amount';
  }

  goBack(): void {
    this.router.navigate(['/clients']); // Adjust path as needed
  }
  onTypeChange(): void {
    if (this.newDiscount.type === 'POURCENTAGE') {
      this.amountLabel = 'Pourcentage (%):';
      this.amountPlaceholder = 'Enter Percentage';
    } else {
      this.amountLabel = 'Amount (TND):';
      this.amountPlaceholder = 'Enter Amount';
    }
  }

  get formTitle(): string {
    return this.isEditMode ? 'Edit Remis' : 'Add Remis';
  }
}
