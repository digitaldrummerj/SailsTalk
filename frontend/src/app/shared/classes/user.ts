export interface IUser {
  email: string;
  firstName?: string;
  lastName?: string;
  admin: boolean;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}
