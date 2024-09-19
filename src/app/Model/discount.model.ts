import { Client } from "./client.model";
import { DiscountType } from "./enums";

export interface Discount {
    idClient: number;
    type: DiscountType; // Adjust this if you're using a specific type for DiscountType
    amount: number;
    client: Client
    /* {
      id: number;
      
    } */;
  }
  