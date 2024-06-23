// Register Types
export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  user_type: number;
}

// Login Types
export interface LoginData {
  email: string;
  password: string;
  user_type: number | undefined;
}

// Search Types
export interface SearchData {
  location: string;
  bedrooms: string;
  search_data: string; // price, area, title
}

// Property Type
export interface PropertyDetailsType {
  id?:number;
  title: string;
  description: string;
  location: string;
  area: string;
  bedrooms: string;
  bathrooms: string;
  price: number;
  near_by: string;
  seller_id: number;
}

export interface AlertsProps {
  alertMessage: string | null;
  alertVariant?: string | undefined;
  setAlertMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface propertyProps{
  id:number;
    title:string;
    description:string;
    location:string;
    area:string;
    bedrooms:string;
    bathrooms:string;
    price:number;
    near_by:string;
    seller_id: Number;
};