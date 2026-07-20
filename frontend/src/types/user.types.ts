export type UserType = {
  full_name: string;
  role: string;
  _id: string;
  username: string;
  email: string;
  age?: string;
  allergies: string[];
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  last_login?: string;
  specialty?: {
    _id: string;
    name: string;
  }
};