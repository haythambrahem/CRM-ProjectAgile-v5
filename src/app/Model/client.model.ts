import { Blocage, ConditionPayement, ModeFacturation, Gouvernorat, Localite, ZoneGeographique } from './enums'; // Adjust the path as necessary
import { SecteurActivite } from './secteur-activite.model';

export interface Client {
  id?: any; // Optional, as it might not be present when creating a new client
  nomClient: string;
  numeroCompte: string;
  numeroSousCompte: string;
  matriculeFiscal: string;
  chiffreAffaires?: number| null; // Optional, depending on your requirements
  effectif?: number| null; // Optional, depending on your requirements
  exonere?: boolean| null; // Optional, depending on your requirements
  dateLimiteExoneration?: string| null; // Use ISO string format for dates
  modeFacturation: ModeFacturation;
  conditionPaiement: ConditionPayement;
  blocage: Blocage;
  prixAchats: string;
  gouvernorat: Gouvernorat;
  localite: Localite;
  zoneGeographique: ZoneGeographique;
  mobile: string;
  telephone: string;
  autreTelephone?: string; // Optional
  fax?: string; // Optional
  email: string;
  autreEmail?: string; // Optional
  siteWeb?: string; // Optional
  rue: string;
  codePostal: string;
  ville: string;
  pays: string;
  deleted?: boolean; // Optional, defaults to false
  description?: string; // Optional
  date_creation?: string| null; // Use ISO string format for dates
  date_modification?: string| null; // Use ISO string format for dates
  devis?: any[]; // Adjust type as necessary
  secteurActivite?: SecteurActivite | null; // ID of SecteurActivite
}
