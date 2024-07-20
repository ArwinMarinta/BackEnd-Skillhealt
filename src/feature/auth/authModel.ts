export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type RegisterType = {
  full_name: string;
  date_birth: string;
  gender: string;
  phone_number: string;
  image_url: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  email: string;
  full_name: string;
  date_birth: string;
  gender: string;
  phone_number: string;
  image_url: string;
};

export type AuthType = {
  email: string;
  password: string;
  role_id: number;
};

export type RegisterDoctorRequest = {
  email: string;
  password: string;
  spesialis_id: number;
  instansi_id: number;
  name: string;
  phone_number: string;
  registration_certificate: string;
  experience: string;
  education: string;
  image_url: string;
  description: string;
  status: boolean;
};

export type RegisterDoctorResponse = {
  email: string;
  name: string;
  phone_number: string;
  registration_certificate: string;
};

export type RegisterInstansiRequest = {
  email: string;
  password: string;
  name: string;
  address: string;
  phone_number: string;
  image_url: string;
};

export type RegisterInstasiResponse = {
  email: string;
  name: string;
  address: string;
  phone_number: string;
  image_url: string;
};
