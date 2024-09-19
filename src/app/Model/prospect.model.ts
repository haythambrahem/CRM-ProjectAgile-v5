// prospect.model.ts
export interface Prospect {
  id?: number;
  nom: string;
  prenom: string;
  titre: string;
  societe: string;
  chiffreAffaires: number;
  effectif: number;
  secteur: string;
  sourceProspection?: string;
  mobile?: string;
  telephone?: string;
  fax?: string;
  email?: string;
  emailSecondaire?: string;
  siteWeb?: string;
  statut: string;
  rue?: string;
  codePostal?: string;
  ville?: string;
  pays?: string;
  deleted?: boolean;
  description?: string;
  date_creation?: string; // Consider using a Date object if necessary
  date_modification?: string; // Consider using a Date object if necessary
  
}
