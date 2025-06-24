import { IUserRole } from './IUserRole';

export interface ILoginUserInfo {
  success: boolean;
  firstName: string;
  lastName: string;
  email: string;
  role: IUserRole;
  message: string;
  accessToken: string;
}

export const emptyILoginUserInfo: ILoginUserInfo = {
  success: true,
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  message: '',
  accessToken: '',
}
