import { IStatus } from './IPropertyDetail';

export interface ISchoolDetail {
  OBInstID?: string;
  InstitutionName: string;
  GSTestRating?: string;
  gradelevel1lotext: string;
  gradelevel1hitext: string;
  gradelevel1?: string;
  Filetypetext?: string;
  geocodinglatitude?: string;
  geocodinglongitude?: string;
  distance: string;
  students?: string;
  isGoodGrade?: boolean;
}

export interface ISchoolDetailResponse {
  Response: {
    status: IStatus;
    property?: {
      school: ISchoolDetail[];
    };
  };
}
