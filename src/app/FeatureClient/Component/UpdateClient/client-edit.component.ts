import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/Model/client.model';
import { ClientService } from '../../service/client.service';
import { ModeFacturation, ConditionPayement, Blocage, Gouvernorat, Localite, ZoneGeographique } from 'src/app/Model/enums';
import { SecteurActivite } from 'src/app/Model/secteur-activite.model';
import { SecteurActiviteService } from '../../service/secteur-activite.service';
import { ReportService } from '../../service/report.service';
import { UserService } from 'src/app/Authantication/service/user.service';
import { ProfileService } from 'src/app/Authantication/service/profile.service';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {
  clientForm: FormGroup;
  clientId?: number;
  client?: Client;
  error: string | null = null;
  
  user: any;
  token: string = '';
  isLoggedIn: boolean = false;

  clients: Client[] = [];
  selectedClient: Client | null = null; // For updating an existing client
  selectedClientDetails: Client | null = null; // For displaying selected client details
  clientDiscounts: any[] = []; // For storing client discounts
  newDiscount: any = {}; // For adding a new discount

  modeFacturations = Object.values(ModeFacturation);
  conditions = Object.values(ConditionPayement);
  blocages = Object.values(Blocage);
  gouvernorats = Object.values(Gouvernorat);
  localites = Object.values(Localite);
  zones = Object.values(ZoneGeographique);
  secteurs: SecteurActivite[] = []; // List of SecteurActivite for dropdown

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private clientService: ClientService,
    private secteurActiviteService: SecteurActiviteService,    
    private reportService: ReportService,
    private userService: UserService,
    private service: ProfileService
  ) {
    this.clientForm = this.fb.group({
      nomClient: ['', Validators.required],
      numeroCompte: ['', Validators.required],
      numeroSousCompte: ['', Validators.required],
      matriculeFiscal: ['', Validators.required],
      chiffreAffaires: [''],
      effectif: [''],
      exonere: [false],
      dateLimiteExoneration: [''],
      modeFacturation: ['', Validators.required],
      conditionPaiement: ['', Validators.required],
      blocage: ['', Validators.required],
      prixAchats: [''],
      gouvernorat: ['', Validators.required],
      localite: ['', Validators.required],
      zoneGeographique: ['', Validators.required],
      mobile: ['', Validators.required],
      telephone: ['', Validators.required],
      autreTelephone: [''],
      fax: [''],
      email: ['', [Validators.required, Validators.email]],
      autreEmail: [''],
      siteWeb: [''],
      rue: ['', Validators.required],
      codePostal: ['', Validators.required],
      ville: ['', Validators.required],
      pays: ['', Validators.required],
      secteurActivite: this.fb.group({
        idSectActivite: ['', Validators.required]
      }),
      description: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => { 
      this.clientId = +params['id'];
      if (this.clientId) {
        this.loadClient();
        this.loadSecteurs();
      } else {
        this.router.navigate(['/clients']);
      }
    });
    this.userService.getLoggedInUser().subscribe(user => {
      this.user = user;
      if (user) {
          // Check user role
          console.log('Logged in user role:', this.user.role);
      } else {
          console.error('User is null');
      }
  }, error => {
      console.error('Failed to load user:', error);
  });
  this.service.getUserProfile().subscribe(
    data => {
      this.user = data;
      this.token = data.token;
      console.log("User profile loaded:", data);
    },
    error => {
      console.error('Error loading user profile:', error);
    }
  );
  }
  
  loadClient(): void {
    if (this.clientId !== undefined) {
      this.clientService.getClientById(this.clientId).subscribe(client => {
        this.client = client;
        console.log('Loaded Client:', client);

        // Patch the form value including the secteurActivite ID
        this.clientForm.patchValue({
          ...client,
          secteurActivite: {
            idSectActivite: client.secteurActivite?.idSectActivite || ''
          }
        });
        console.log('Patched Form Value:', this.clientForm.value);
      });
    }
  }

  loadSecteurs(): void {
    this.secteurActiviteService.getAll().subscribe(
      (secteurs: SecteurActivite[]) => {
        this.secteurs = secteurs;
        console.log('Loaded Secteurs:', secteurs);
      },
      error => {
        this.error = 'Failed to load secteurs';
        console.error('Error loading secteurs:', error);
      }
    );
  }
  onSubmit(): void {
    if (this.clientForm.valid && this.clientId !== undefined) {
      console.log('Form Values:', this.clientForm.value);
      console.log('Client ID:', this.clientId);
  
      // Extract the secteurActivite ID from the form value and convert to number
      const secteurActiviteId = Number(this.clientForm.value.secteurActivite.idSectActivite);
  
      // Log the secteurs array to debug
      console.log('Available Secteurs:', this.secteurs);
  
      // Find the corresponding SecteurActivite object, ensuring ID comparison is consistent
      const selectedSecteurActivite = this.secteurs.find(
        secteur => Number(secteur.idSectActivite) === secteurActiviteId
      );
  
      if (!selectedSecteurActivite) {
        console.error('Selected secteurActivite not found:', secteurActiviteId);
        this.error = 'Invalid secteur d\'activité selected';
        return;
      }
  
      const updatedClient: Client = {
        ...this.clientForm.value,
        secteurActivite: selectedSecteurActivite
      };
  
      console.log('Updated Client:', updatedClient);
  
      this.clientService.updateClient(this.clientId, updatedClient).subscribe(
        () => {
          this.router.navigate(['/clients']);
        },
        error => {
          this.error = 'Failed to update client';
          console.error('Error updating client:', error);
        }
      );
    } else {
      this.error = 'Please fill out all required fields.';
      console.log('Form is invalid or clientId is undefined.');
    }
  }
  
/* 
  onSubmit(): void {
    if (this.clientForm.valid && this.clientId !== undefined) {
      console.log('Form Values:', this.clientForm.value);
      console.log('Client ID:', this.clientId);

      // Extract the secteurActivite ID from the form value
      const secteurActiviteId = this.clientForm.value.secteurActivite.idSectActivite;

      // Find the corresponding SecteurActivite object
      const selectedSecteurActivite = this.secteurs.find(
        secteur => secteur.idSectActivite === secteurActiviteId
      );

      if (!selectedSecteurActivite) {
        console.error('Selected secteurActivite not found:', secteurActiviteId);
        this.error = 'Invalid secteur d\'activité selected';
        return;
      }

      const updatedClient: Client = {
        ...this.clientForm.value,
        secteurActivite: selectedSecteurActivite
      };

      console.log('Updated Client:', updatedClient);

      this.clientService.updateClient(this.clientId, updatedClient).subscribe(
        () => {
          this.router.navigate(['/clients']);
        },
        error => {
          this.error = 'Failed to update client';
          console.error('Error updating client:', error);
        }
      );
    } else {
      this.error = 'Please fill out all required fields.';
      console.log('Form is invalid or clientId is undefined.');
    }
  } */

  updateClient(): void {
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
  }
  /* navigateToRemis(): void {
      this.router.navigate(['/remis/:clientId']);
    
  } */
      selectClient(client?: Client): void {
        // Check if client is defined
        if (client) {
          this.router.navigate(['/remis', client.id]);
        } else {
          console.error('Client is undefined');
          this.error = 'Client is undefined';
        }
      }
      /* downloadReport(clientId:number ,fileType: string): void {
        this.reportService.getSpecificClientReport(clientId ,fileType).subscribe((response: Blob) => {
          const url = window.URL.createObjectURL(response);
          const link = document.createElement('a');
          link.href = url;
          link.download = `ClientListe.${fileType.toLowerCase()}`;
          link.click();
          window.URL.revokeObjectURL(url);
        }, error => {
          console.error('Error downloading the report', error);
        });
      } */

        downloadReport(clientId: number | undefined, fileType: string): void {
          if (clientId === undefined) {
            console.error('Client ID is undefined');
            this.error = 'Client ID is undefined';
            return;
          }
          
          this.reportService.getSpecificClientReport(clientId, fileType).subscribe((response: Blob) => {
            const url = window.URL.createObjectURL(response);
            const link = document.createElement('a');
            link.href = url;
            link.download = `ClientDetails.${fileType.toLowerCase()}`;
            link.click();
            window.URL.revokeObjectURL(url);
          }, error => {
            console.error('Error downloading the report', error);
          });
        }
        
}
