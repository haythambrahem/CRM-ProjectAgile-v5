export interface Produit {
    id: any;
    codeProduit: string;
    libelleProduit: string;
    categorie: string;
    poids: number| null;
    typeProduit: string;
    actif: boolean;
    packagee: boolean;
    codeEmballage : string;
    ecozit: boolean;
    prixgrox: number| null;
    prixgdetail: number| null;
    prixgerant: number| null;
    description: string;
    date_creation: Date| null;
    date_modification: Date| null;
    emballage: any; // Adjust according to your Emballage model
    client: any; // Adjust according to your Client model
    devis: any[]; // Adjust according to your Devis model
  }
  