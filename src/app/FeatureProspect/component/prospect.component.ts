import { Component, OnInit } from '@angular/core';
import { Prospect } from 'src/app/Model/prospect.model';
import { ProspectService } from '../service/prospect.service';
import { ReportService } from 'src/app/FeatureClient/service/report.service';

@Component({
    selector: 'app-prospect',
    templateUrl: './prospect.component.html',
    styleUrls: ['./prospect.component.css']
  })
  export class ProspectComponent implements OnInit {
    prospects: Prospect[] = [];
    selectedProspect: Prospect | null = null;
    newProspect: Prospect = {} as Prospect;
    error: string | null = null;

    statutOptions: string[] = [
      'ATTENTE_DE_CONTACT',
      'FROID',
      'A_CONTACTER',
      'CONTACTE',
      'CHAUD',
      'EN_SOMMEIL',
      'PERDU',
      'NON_CONTACTE',
      'PRE_QUALIFIE',
      'QUALIFIE'
    ];
    secteurActiviteOptions: string[] = [
      'RAFFINAGE_DE_PETROLE',
    'DISTRIBUTION_DE_CARBURANTS',
    'PETROCHIMIE',
    'EXTRACTION_DE_PETROLE',
    'STOCKAGE_ET_LOGISTIQUE_DE_CARBURANTS',
    'PRODUCTION_DE_LUBRIFIANTS',
    'SERVICES_DE_FORAGE',
    'RECHERCHE_ET_DEVELOPPEMENT_EN_ENERGIE',
    'ENERGIES_ALTERNATIVES_ET_CARBURANTS_PROPRES',
    'COMMERCE_DE_DETAIL_DE_CARBURANTS'
    ];
  
    constructor(private prospectService: ProspectService,
      private reportService: ReportService,

    ) {}
  
    ngOnInit(): void {
      this.getProspects();
    }
  
    getProspects(): void {
      this.prospectService.getAllProspects().subscribe(
        (data: Prospect[]) => this.prospects = data,
        (error) => console.error('Error fetching prospects', error)
      );
    }
  
    selectProspect(prospect: Prospect): void {
      this.selectedProspect = { ...prospect };
    }
  
    /* createProspect(): void {
      if (this.newProspect.secteurActivite) {
        this.prospectService.createProspect(this.newProspect).subscribe(
          (prospect: Prospect) => {
            this.prospects.push(prospect);
            this.newProspect = {} as Prospect;  // Clear form
          },
          (error) => console.error('Error creating prospect', error)
        );
      }
    } */

      createProspect(): void {
        console.log('New Prospect:', this.newProspect); // Debugging line
        if (this.newProspect.secteur) {
          this.prospectService.createProspect(this.newProspect).subscribe(
            (prospect: Prospect) => {
              this.prospects.push(prospect);
              this.newProspect = {} as Prospect;  // Clear form
            },
            (error) => console.error('Error creating prospect', error)
          );
        }
      }
      
      
  
    updateProspect(): void {
      if (this.selectedProspect) {
        this.prospectService.updateProspect(this.selectedProspect.id!, this.selectedProspect).subscribe(
          (prospect: Prospect) => {
            const index = this.prospects.findIndex(p => p.id === prospect.id);
            if (index > -1) {
              this.prospects[index] = prospect;
            }
            this.selectedProspect = null;  // Clear form
          },
          (error) => console.error('Error updating prospect', error)
        );
      }
    }
  
    deleteProspect(id: number): void {
      this.prospectService.deleteProspect(id).subscribe(
        () => this.prospects = this.prospects.filter(prospect => prospect.id !== id),
        (error) => console.error('Error deleting prospect', error)
      );
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
