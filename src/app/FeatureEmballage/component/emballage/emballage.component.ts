import { Component, OnInit } from '@angular/core';
import { Emballage } from 'src/app/Model/emballage.model';
import { EmballageService } from '../../service/emballage.service';

@Component({
  selector: 'app-emballage',
  templateUrl: './emballage.component.html',
  styleUrls: ['./emballage.component.css']
})
export class EmballageComponent implements OnInit {
  emballages: Emballage[] = [];
  currentEmballage: Emballage = this.initializeEmballage();
  editing: boolean = false;

  constructor(private emballageService: EmballageService) {}

  ngOnInit(): void {
    this.getAllEmballages();
  }

  getAllEmballages(): void {
    this.emballageService.getAllEmballages().subscribe(data => {
      this.emballages = data;
    });
  }

  editEmballage(emballage: Emballage): void {
    this.currentEmballage = { ...emballage };
    this.editing = true;
  }

  saveEmballage(): void {
    if (this.editing) {
      this.emballageService.updateEmballage(this.currentEmballage.id, this.currentEmballage).subscribe(() => {
        this.getAllEmballages();
        this.clearForm();
      });
    } else {
      this.emballageService.createEmballage(this.currentEmballage).subscribe(() => {
        this.getAllEmballages();
        this.clearForm();
      });
    }
  }

  deleteEmballage(id: number): void {
    this.emballageService.deleteEmballage(id).subscribe(() => {
      this.getAllEmballages();
    });
  }

  initializeEmballage(): Emballage {
    return {
      id: 0,
      codeEmballage: '',
      libelleEmballage: '',
      poids: 0,
      prixUnitaire: 0,
      actif: false,
      description: '',
      date_creation: '',
      date_modification: '',
      produits: []
    };
  }

  clearSelection(): void {
    this.clearForm();
  }

  clearForm(): void {
    this.currentEmballage = this.initializeEmballage();
    this.editing = false;
  }
}
