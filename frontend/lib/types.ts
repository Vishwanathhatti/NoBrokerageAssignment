export interface Property {
  _id: string;
  project_name: string;
  builder_name: string;
  location: string;
  price: number;
  main_image: string;
  gallery_images: string[];
  description: string;
  highlights: string;
  createdAt: string;
}

export interface CreatePropertyDTO {
  project_name: string;
  builder_name: string;
  location: string;
  price: number;
  description: string;
  highlights: string;
  main_image?: File;
  gallery_images?: File[];
}

export interface Admin {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}
