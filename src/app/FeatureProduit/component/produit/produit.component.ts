import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../service/produit.service';
import { Produit } from 'src/app/Model/produit.model';
import { Emballage } from 'src/app/Model/emballage.model';
import { EmballageService } from 'src/app/FeatureEmballage/service/emballage.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  produits: Produit[] = [];
  emballages: Emballage[] = [];
  selectedProduit: Produit | null = null;
  newProduit: Produit = this.initNewProduit();
  errorMessage: string = '';

  constructor(
    private produitService: ProduitService,
    private emballageService: EmballageService
  ) {}

  ngOnInit(): void {
    this.getProduits();
    this.getEmballages();
  }

  // Use a single property to bind the form
  get currentProduit(): Produit {
    return this.selectedProduit || this.newProduit;
  }
  getProduits(): void {
    this.produitService.getProduits().subscribe({
      next: (data) => this.produits = data,
      error: (error) => this.errorMessage = 'Error fetching products: ' + error.message
    });
  }

  getEmballages(): void {
    this.emballageService.getAllEmballages().subscribe({
      next: (data) => this.emballages = data,
      error: (error) => this.errorMessage = 'Error fetching emballages: ' + error.message
    });
  }

  selectProduit(produit: Produit): void {
    this.selectedProduit = { ...produit };  // Clone to avoid direct mutation
  }

  saveProduit(): void {
    if (this.selectedProduit && this.selectedProduit.id) {
      // Update existing product
      this.produitService.updateProduit(this.selectedProduit.id, this.selectedProduit).subscribe({
        next: () => {
          this.getProduits();
          this.selectedProduit = null;  // Clear selection after update
        },
        error: (err) => console.error('Error updating product', err)
      });
    } else {
      // Create new product
      this.produitService.createProduit(this.newProduit).subscribe({
        next: () => {
          this.getProduits();
          this.newProduit = this.initNewProduit();  // Reset form
        },
        error: (err) => console.error('Error creating product', err)
      });
    }
  }

  deleteProduit(id: number): void {
    if (id) {
      this.produitService.deleteProduit(id).subscribe({
        next: () => this.getProduits(),
        error: (err) => console.error('Error deleting product', err)
      });
    }
  }

  editProduit(produit: Produit): void {
    this.selectedProduit = { ...produit };
  }
  cancelEdit(): void {
    this.selectedProduit = null; // Clear selection and exit edit mode
  }
  private initNewProduit(): Produit {
    return {
      id: null,
      codeProduit: '',
      libelleProduit: '',
      categorie: '',
      poids: 0,
      typeProduit: '',
      actif: true,
      packagee: false,
      codeEmballage : '',
      ecozit: false,
      prixgrox: 0,
      prixgdetail: 0,
      prixgerant: 0,
      description: '',
      date_creation: new Date(),
      date_modification: new Date(),
      emballage: null,
      client: null,
      devis: []
    };
  }

}
