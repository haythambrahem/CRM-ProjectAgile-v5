import { Component, OnInit } from '@angular/core';
import { SecteurActiviteService } from '../../service/secteur-activite.service';
import { SecteurActivite } from 'src/app/Model/secteur-activite.model';

@Component({
  selector: 'app-secteur-activite',
  templateUrl: './secteur-activite.component.html',
  styleUrls: ['./secteur-activite.component.css']
})
export class SecteurActiviteComponent implements OnInit {
  secteurs: SecteurActivite[] = [];
  newSecteur: SecteurActivite = { nomSectActivite: '' }; // Initialize with default values
  selectedSecteur: SecteurActivite | null = null;

  constructor(private secteurService: SecteurActiviteService) {}

  ngOnInit(): void {
    this.getAllSecteurs();
  }

  getAllSecteurs(): void {
    this.secteurService.getAll().subscribe((data) => {
      this.secteurs = data;
    });
  }

  getSecteurById(id: number): void {
    this.secteurService.getById(id).subscribe((data) => {
      this.selectedSecteur = data;
    });
  }

  createSecteur(): void {
    this.secteurService.create(this.newSecteur).subscribe((data) => {
      this.secteurs.push(data);
      this.newSecteur = { nomSectActivite: '' }; // Reset the form
    });
  }

  updateSecteur(): void {
    if (this.selectedSecteur) {
      this.secteurService.update(this.selectedSecteur.idSectActivite ?? 0, this.selectedSecteur).subscribe((data) => {
        this.getAllSecteurs();
        this.selectedSecteur = null;
      });
    }
  }

  deleteSecteur(id: number): void {
    this.secteurService.delete(id).subscribe(() => {
      this.secteurs = this.secteurs.filter((s) => s.idSectActivite !== id);
    });
  }
}
