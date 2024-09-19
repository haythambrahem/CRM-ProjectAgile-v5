import { Component, OnInit } from '@angular/core';
import { Devis, DelaiLivraison, ModeLivraison, ModePaiement } from 'src/app/Model/devis.model';
import { DevisService } from '../../service/devis.service';
import { Blocage, ConditionPayement, Gouvernorat, Localite, ModeFacturation, ZoneGeographique } from 'src/app/Model/enums';
import { Client } from 'src/app/Model/client.model';
import { ClientService } from 'src/app/FeatureClient/service/client.service';
import { ReportService } from 'src/app/FeatureClient/service/report.service';
import { UserService } from 'src/app/Authantication/service/user.service';
import { Produit } from 'src/app/Model/produit.model';
import { ProduitService } from 'src/app/FeatureProduit/service/produit.service';
import { ProfileService } from 'src/app/Authantication/service/profile.service';

@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.css']
})
export class DevisComponent implements OnInit {
  showDevis(_t22: Devis) {
    throw new Error('Method not implemented.');}
  [x: string]: any;
  devisList: Devis[] = [];
  selectedDevis: Devis | null = null;
  currentDevis: Devis = this.initializeDevis();
  delaiLivraisonOptions = Object.values(DelaiLivraison);
  modeLivraisonOptions = Object.values(ModeLivraison);
  modePaiementOptions = Object.values(ModePaiement);
  clients: Client[] = []; // List of clients
  currentUser: any; // Current user
  produits: Produit[] = []; // List of products
  selectedProducts: Produit[] = []; // Array for selected products
 // produitsForDevis: Produit[] = []; // Array to store products for a specific devis

  constructor(
    private devisService: DevisService,
    private produitService: ProduitService,
    private clientService: ClientService,
    private reportService: ReportService,
    private userService: UserService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.getAllDevis();
    this.getAllClients(); // Fetch clients when initializing
    this.getAllProduits(); // Fetch products when initializing
    this.getCurrentUser(); // Get current user
    this.getProductsByDevisId(10);
  }

  getAllDevis(): void {
    this.devisService.getAllDevis().subscribe(data => {
      this.devisList = data;
      console.log('Devis List:', this.devisList); // Debug log
    });
  }
  getProductsByDevisId(id: number): void {
    this.devisService.getProduitsByDevisId(id).subscribe(data => {
      this.produits = data;
      console.log('Products for Devis:', data);
    });
  }

  getAllClients(): void {
    this.clientService.getAllClients().subscribe(data => {
      this.clients = data;
    });
  }

  getAllProduits(): void {
    this.produitService.getProduits().subscribe(data => {
      this.produits = data;
      console.log('User produit loaded:', data);
    });
  }

  getCurrentUser(): void {
    this.profileService.getUserProfile().subscribe({
      next: (data) => {
        console.log('User profile loaded:', data);
        this.currentUser = data;
        this.setDefaultAssignee(); // Ensure assignee is set after fetching user data
      },
      error: (error) => {
        console.error('Error loading user profile:', error);
      }
    });
  }

  setDefaultAssignee(): void {
    if (this.currentUser && this.currentUser.email) {
      console.log('Setting default assignee:', this.currentUser.email);
      this.currentDevis.assigneA = this.currentUser.email;
    } else {
      console.warn('Current user data is not available or username is missing');
    }
  }

  selectDevis(devis: Devis): void {
    this.selectedDevis = { ...devis };
    this.currentDevis = { ...devis };
    this.selectedProducts = devis.produits || [];
    if (this.selectedDevis.id) {
      this.getProductsByDevisId(this.selectedDevis.id);
    }
    console.log('Selected Devis:', this.selectedDevis); // Debug log
  }

  saveDevis(): void {
    if (this.selectedDevis) {
      this.currentDevis.produits = this.selectedProducts; // Update the produits array in currentDevis
      this.devisService.updateDevis(this.selectedDevis.id, this.currentDevis).subscribe(() => {
        this.getAllDevis();
        this.clearSelection();
      });
    } else {
      this.setDefaultAssignee(); // Ensure assignee is set before creation
      this.currentDevis.produits = this.selectedProducts; // Update the produits array in currentDevis
      this.devisService.createDevis(this.currentDevis).subscribe(() => {
        this.getAllDevis();
        this.clearForm();
      });
    }
  }

  deleteDevis(id: number): void {
    this.devisService.deleteDevis(id).subscribe(() => {
      this.getAllDevis();
    });
  }

  initializeDevis(): Devis {
    return {
      id: 0,
      sujet: '',
      nomClient: '',
      assigneA: '',
      echeance: '',
      delaiLivraison: DelaiLivraison.IMMEDIATE,
      modeLivraison: ModeLivraison.STANDARD,
      modePaiement: ModePaiement.COMPTANT,
      description: '',
      date_creation: '',
      date_modification: '',
      client: {
        id: 0, nomClient: '',
        numeroCompte: '',
        numeroSousCompte: '',
        matriculeFiscal: '',
        modeFacturation: ModeFacturation.MODE_FACTURATION_1,
        conditionPaiement: ConditionPayement.CONDITION_PAYEMENT_1,
        blocage: Blocage.BLOCAGE_TYPE1,
        prixAchats: '',
        gouvernorat: Gouvernorat.ARIANA,
        localite: Localite.TUNIS,
        zoneGeographique: ZoneGeographique.ZONE_01,
        mobile: '',
        telephone: '',
        email: '',
        rue: '',
        codePostal: '',
        ville: '',
        pays: '',
        secteurActivite: null
      },
      produits: [],
      deleted: false
    };
  }

  clearSelection(): void {
    this.selectedDevis = null;
    this.clearForm();
  }

  clearForm(): void {
    this.currentDevis = this.initializeDevis();
    this.selectedProducts = [];
  }

  onProductChange(product: Produit, isChecked: boolean) {
    if (isChecked) {
      this.selectedProducts.push(product);
    } else {
      this.selectedProducts = this.selectedProducts.filter(p => p.id !== product.id);
    }
  }
  
  handleCheckboxChange(event: Event, produit: Produit) {
    const target = event.target as HTMLInputElement;
    this.onProductChange(produit, target.checked);
  }
  

  downloadDevisReport(id: number | null, fileType: string) {
    if (id !== null) {
      this.reportService.getDevisReport(id, fileType).subscribe((response: Blob) => {
        this.downloadFile(response, `DevisReport_${id}.${fileType.toLowerCase()}`);
      });
    } else {
      console.error('No Devis selected');
    }
  }

  private downloadFile(data: Blob, filename: string) {
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
