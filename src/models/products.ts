export interface Product {
  id: number;
  isArchived: boolean;
  icon: string;
  title: string;
  description: string;
  productLink: string;
  productType: string;
  image: string;
  link: string;
  customLink: CustomLink;
}

interface CustomLink {
  id: number;
  isArchived: boolean;
  icon: string;
  title: string;
  description: string;
  productLink: string;
  productType: string;
  image: string;
  link: string;
}
