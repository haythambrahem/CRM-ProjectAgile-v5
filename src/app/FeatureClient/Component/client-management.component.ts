import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../service/client.service';
import { Client } from 'src/app/Model/client.model';
import { ModeFacturation, ConditionPayement, Blocage, ZoneGeographique, Localite, Gouvernorat } from 'src/app/Model/enums';
import { SecteurActivite } from 'src/app/Model/secteur-activite.model';
import { SecteurActiviteService } from '../service/secteur-activite.service';
import { ReportService } from '../service/report.service';

@Component({
  selector: 'app-client-management',
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.css']
})
export class ClientManagementComponent implements OnInit {
  clients: Client[] = [];
  newClient: Client = this.initializeClient(); // For creating a new client
  selectedClient: Client | null = null; // For updating an existing client
  selectedClientDetails: Client | null = null; // For displaying selected client details
  clientDiscounts: any[] = []; // For storing client discounts
  newDiscount: any = {}; // For adding a new discount
  error: string | null = null;

  modeFacturations = Object.values(ModeFacturation);
  conditions = Object.values(ConditionPayement);
  blocages = Object.values(Blocage);
  gouvernorats = Object.values(Gouvernorat);
  localites = Object.values(Localite);
  zones = Object.values(ZoneGeographique);
  secteurs: SecteurActivite[] = []; // List of SecteurActivite for dropdown
  selectedSecteurId: number | null = null; // New property for tracking selected SecteurActivite ID

  constructor(
    private clientService: ClientService,
    private secteurActiviteService: SecteurActiviteService,
    private router: Router,
    private reportService: ReportService,
  ) { }

  

  ngOnInit(): void {
    this.loadClients();
    this.loadSecteurs();
  }

  loadClients(): void {
    this.clientService.getAllClients().subscribe(
      (clients: Client[]) => {
        this.clients = clients;
      },
      error => {
        this.error = 'Failed to load clients';
        console.error('Error loading clients:', error);
      }
    );
  }

  loadSecteurs(): void {
    this.secteurActiviteService.getAll().subscribe(
      (secteurs: SecteurActivite[]) => {
        this.secteurs = secteurs;
      },
      error => {
        this.error = 'Failed to load secteurs';
        console.error('Error loading secteurs:', error);
      }
    );
  }
  createClient(): void {
    // Log to verify selectedSecteurId and secteurs
    console.log('Selected Secteur ID:', this.selectedSecteurId);
    console.log('Secteurs Array:', this.secteurs);
  
    // Ensure selectedSecteurId is a number and find the corresponding secteur
    const selectedSecteurId = Number(this.selectedSecteurId);
    const selectedSecteur = this.secteurs.find(s => s.idSectActivite === selectedSecteurId) || null;
    
    console.log('Selected Secteur:', selectedSecteur);
  
    this.newClient.secteurActivite = selectedSecteur;
  
    console.log('Client Data before sending:', this.newClient);
  
    this.clientService.createClient(this.newClient).subscribe(
      client => {
        this.clients.push(client);
        this.newClient = this.initializeClient(); // Clear the form
        this.selectedSecteurId = null; // Reset selectedSecteurId
      },
      error => {
        this.error = 'Failed to create client';
        console.error('Error creating client:', error);
      }
    );
  }
  
  /* createClient(): void {
    // Log to verify selectedSecteurId and secteurs
    console.log('Selected Secteur ID:', this.selectedSecteurId);
    console.log('Secteurs Array:', this.secteurs);

    // Find the secteurActivite based on selected ID
    const selectedSecteur = this.secteurs.find(s => s.idSectActivite === this.selectedSecteurId) || null;
    console.log('Selected Secteur:', selectedSecteur);

    this.newClient.secteurActivite = selectedSecteur;

    console.log('Client Data before sending:', this.newClient);

    this.clientService.createClient(this.newClient).subscribe(
      client => {
        this.clients.push(client);
        this.newClient = this.initializeClient(); // Clear the form
        this.selectedSecteurId = null; // Reset selectedSecteurId
      },
      error => {
        this.error = 'Failed to create client';
        console.error('Error creating client:', error);
      }
    );
  } */
  

  /* createClient(): void {
    this.clientService.createClient(this.newClient).subscribe(
      client => {
        this.clients.push(client);
        this.newClient = this.initializeClient(); // Clear the form
      },
      error => {
        this.error = 'Failed to create client';
        console.error('Error creating client:', error);
      }
    );
  } */

  selectClient(client: Client): void {
    /* this.selectedClient = { ...client }; // Copy the client to prevent direct modifications
    this.loadClientDetails(client.id!); */
    if (client.id !== undefined) {
      this.router.navigate(['/clients/edit', client.id]);
    }
  }

  loadClientDetails(clientId: number): void {
  this.clientService.getClientById(clientId).subscribe(
    client => {
      this.selectedClientDetails = client;
      if (client.secteurActivite) {
        // Perform any additional operations or checks with secteurActivite
      }
    },
    error => {
      this.error = 'Failed to load client details';
      console.error('Error loading client details:', error);
    }
  );

  this.loadClientDiscounts(clientId);
}


  loadClientDiscounts(clientId: number): void {
    this.clientService.getClientDiscounts(clientId).subscribe(
      discounts => {
        this.clientDiscounts = discounts;
      },
      error => {
        this.error = 'Failed to load client discounts';
        console.error('Error loading client discounts:', error);
      }
    );
  }

  addDiscount(): void {
    if (this.selectedClientDetails) {
      this.clientService.addClientDiscount(this.selectedClientDetails.id!, this.newDiscount).subscribe(
        discount => {
          this.clientDiscounts.push(discount);
          this.newDiscount = {}; // Clear the form
        },
        error => {
          this.error = 'Failed to add discount';
          console.error('Error adding discount:', error);
        }
      );
    }
  }

  /* updateClient(): void {
    if (this.selectedClient) {
      this.clientService.updateClient(this.selectedClient.id, this.selectedClient).subscribe(
        updatedClient => {
          const index = this.clients.findIndex(c => c.id === updatedClient.id);
          if (index !== -1) {
            this.clients[index] = updatedClient;
          }
          this.selectedClient = null; // Clear the form
        },
        error => {
          this.error = 'Failed to update client';
          console.error('Error updating client:', error);
        }
      );
    }
  } */

  deleteClient(id: number): void {
    this.clientService.deleteClient(id).subscribe(
      () => {
        this.clients = this.clients.filter(client => client.id !== id);
      },
      error => {
        this.error = 'Failed to delete client';
        console.error('Error deleting client:', error);
      }
    );
  }

  private initializeClient(): Client {
    return {
      id: null,
      nomClient: '',
      numeroCompte: '',
      numeroSousCompte: '',
      matriculeFiscal: '',
      chiffreAffaires: null,
      effectif: null,
      exonere: null,
      dateLimiteExoneration: null,
      modeFacturation: ModeFacturation.MODE_FACTURATION_1,
      conditionPaiement: ConditionPayement.CONDITION_PAYEMENT_1,
      blocage: Blocage.BLOCAGE_TYPE1,
      prixAchats: '',
      gouvernorat: Gouvernorat.TUNIS,
      localite: Localite.TUNIS,
      zoneGeographique: ZoneGeographique.ZONE_01,
      mobile: '',
      telephone: '',
      autreTelephone: '',
      fax: '',
      email: '',
      autreEmail: '',
      siteWeb: '',
      rue: '',
      codePostal: '',
      ville: '',
      pays: '',
      deleted: false,
      description: '',
      date_creation: null,
      date_modification: null,
      devis: [],
      secteurActivite:{
        idSectActivite: null, 
        nomSectActivite: '', 
        date_creation: undefined,
        date_modification: undefined, 
      }
    };
  }
  
  downloadReport(fileType: string): void {
    this.reportService.getClientReport(fileType).subscribe((response: Blob) => {
      const url = window.URL.createObjectURL(response);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ClientListe.${fileType.toLowerCase()}`;
      link.click();
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Error downloading the report', error);
    });
  }
}
