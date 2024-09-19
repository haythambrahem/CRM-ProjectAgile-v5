export interface Emballage {
    id: number;
    codeEmballage: string;
    libelleEmballage: string;
    poids: number;
    prixUnitaire: number;
    actif: boolean;
    description: string;
    date_creation: string;
    date_modification: string;
    produits: any[];
  }
  