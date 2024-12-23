import { Dpi , Hospitalisation , Hopital } from './dpi.model';


export interface Utilisateur{
  id: number;
  name: string;
  email: string;
  phone: string;
  photo : string
}

export interface Administratif extends Utilisateur {
  //creerDpi()
}

export interface Patient extends Utilisateur{
 nss : number,
  dateNaissance: Date, 
  adresse : String,
  mutuelle : String,
  medecinTraitant : Medecin,
  dpi : Dpi,
  hospitalisations : Hospitalisation[]


}

export interface Radiologue extends Utilisateur{
  hopitaux : Hopital[]
}


export interface Medecin extends Administratif{
  specialite : string,
  hopital : Hopital
}


export interface Laborantin extends Utilisateur{
  // id : number,
  //  he doesn't have a BilanBiologique
  hopitaux : Hopital[]
}

export interface Infermier extends Utilisateur{
  // id : number,
  hopitaux : Hopital[]
}

