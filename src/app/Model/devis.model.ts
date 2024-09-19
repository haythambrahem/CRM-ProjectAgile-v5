import { Client } from "./client.model";
import { Produit } from "./produit.model";

export enum DelaiLivraison {
    IMMEDIATE = 'IMMEDIATE',
    UN_JOUR = 'UN_JOUR',
    TROIS_JOURS = 'TROIS_JOURS',
    UNE_SEMAINE = 'UNE_SEMAINE',
    DEUX_SEMAINES = 'DEUX_SEMAINES',
    UN_MOIS = 'UN_MOIS'
  }
  
  export enum ModeLivraison {
    STANDARD = 'STANDARD',
    EXPRESS = 'EXPRESS',
    RELEVE_SUR_PLACE = 'RELEVE_SUR_PLACE'
  }
  
  export enum ModePaiement {
    COMPTANT = 'COMPTANT',
    CHEQUE = 'CHEQUE',
    VIREMENT = 'VIREMENT',
    CARTE_CREDIT = 'CARTE_CREDIT',
    TRAITE = 'TRAITE',
    ESPECES = 'ESPECES'
  }
  
  export interface Devis {
    id: number;
    sujet: string;
    nomClient: string;
    assigneA: string;
    echeance: string;
    delaiLivraison: DelaiLivraison;
    modeLivraison: ModeLivraison;
    modePaiement: ModePaiement;
    description: string;
    date_creation: string;
    date_modification: string;
    client: Client;
    produits: Produit[];
    deleted: boolean;
  }

  