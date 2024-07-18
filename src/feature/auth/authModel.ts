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
