import { FieldValue } from '@angular/fire/firestore';

interface Base {
  createdAt: FieldValue;
}

export interface AppUser extends Base {
  email: string;
  fullName: string;
  coverImage: string;
  restaurantCode: string;
  fcmToken: string;
  lat: string;
  lng: string;
  phone: string;
  status: string;
  type: string;
  idnumber: string;
  current: string;
}
export interface CityItem extends Base {
  status: string;
  name: string;
  id: string;
  lat: string;
  lng: string;
}

export interface Restaurant extends Base {
  restaurantCode: string;
  name: string;
  email: string;
  description: string;
  address: string;
  rating: number;
  totalRating: number;
  lat: number;
  lng: number;
  cover: string;
  dishPrice: number;
  time: string;
  cusine: any[];
  owner: any;
  openTime: string;
  closeTime: string;
  isClose: boolean;
  phone: string;
  status: string;
  city: string;
  images: string[];
}


export interface FoodItem extends Base {
  name: string;
  uom: string;
  category: string;
  menuName: string;
  foodImage: string;
  description: string;
  quantity: number;
  instock: number;
  orderedQuantity: number;
  veg: boolean;
  cost: number;
  discount: number;
  reorder: number;
  tags: string[];
  supplysUsed: any[]; // Replace `any` with the actual type of `this.formData`
  accompaniments: string[];
  extras: any[];
  createdBy: {
    name: string;
    uid: string;
  };
  restaurant: {
    name: string;
    uid: string;
  };
}
