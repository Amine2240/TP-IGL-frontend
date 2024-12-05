
import { Medecin , Patient , Radiologue , Infermier , Laborantin , Administratif } from './users.model';

export interface Dpi {
  id : String
  codeQr : String,
  consultations : Consultation[],
  patient : Patient
  soins : Soin[]
  certificatmedical : Certificatmedical
}

export interface Bilan {
  id : number,
  type : string,
  // resultats : Resultat[]
}



export interface BilanBiologique extends Bilan {
  // id : number,
  graphiqueTendance : GraphiqueTendance,
}

export interface BilanRadiologique extends Bilan {
  // id : number,
  imagesRadio : ImageRadio[]
}

export interface Certificatmedical {
  id : String,
  contenu : String,
  dpi : Dpi
}

export interface Consultation {
  id : number,
  resume : String,
  date : Date,
  medecin : Medecin
  patient : Patient
  outils : Outil[],
  ordonnances : Ordonnance[],
  bilan : Bilan
}



export interface ConsultationSupplementaire extends Consultation {
  // id : number,
  bilan : BilanRadiologique | BilanBiologique,
  // bilanBiologique : BilanBiologique,

}

export interface Decompte {
  id : number,
  tarifs : String,
}


export interface GraphiqueTendance {
  bilanBiologique : BilanBiologique , 
  parametres : Parametre[]
}


export interface Hopital {
  nom : String,
  lieu : String,
  administratifs :  Administratif[]
  laborantins : Laborantin[]
  infermiers : Infermier[]
  radiologues :Radiologue[]
}



export interface Hospitalisation {
  patient : Patient, 
  hopital : Hopital,
  decompte : Decompte
}

type imageRadioName = "IRM"|"Scanner"|"Radiographie"| "Echographie"
export interface ImageRadio {
  chemin : String,
  nom : imageRadioName

}


export interface Medicament {
  id : number,
  nom : String,
  // ordonnance: Ordonnance
}
export interface Ordonnance {
  id: number;
  date: string;
  contenu: string;
  // idDpi: number;
  // idMedecin: number;
  // idPatient: number;
  medicaments : Medicament[]
}

type outilName = "Stéthoscope"| "Tensiomètre"| "Thermomètre"
export interface Outil {
  id : number,
  nom : outilName,
}


type parametreName = "glycemie"|"pression_arterielle"|"niveaux_de_cholestérol"
export interface Parametre {
  id : number,
  nom : parametreName,
  valeur : String
}
type soinType = "administration_des_medicaments" | "soins_infirmiers"| "observations_etat_patient"

export interface Soin{
  id : number,
  type : String,
  observation : soinType,
  date : Date,
  heure : String,
  dpi : Dpi,
  coup : number,
  hospitalisation : Hospitalisation,
}

export interface Sgph{
  id : number,
  url : String,
  token : String,
  timer : String

}