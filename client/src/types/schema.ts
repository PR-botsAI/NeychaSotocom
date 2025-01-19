export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  image?: string;
  category: string;
}

export interface Case {
  id: number;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  collageImage: string;
  serviceId?: number;
  category: string;
  createdAt: string;
}
