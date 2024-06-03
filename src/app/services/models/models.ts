import { FieldValue }  from '@angular/fire/firestore';

interface Base {
    uid: string;
    created_at: FieldValue;
  }


export interface AppUser  extends Base {
    email: string;
    fullname: string;
    coverImage: string;
    descriptions: string;
    fcm_token: string;
    lat: string;
    lng: string;
    phone: string;
    status: string;
    type: string;
    id: string;
    current: string;
  }
export interface CityItem  extends Base {
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
    descpritions: string;
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

  export interface FoodItem extends Base{
    name: string;
    uom: string;
    category: string;
    menu_name: string;
    food_image: string;
    description: string;
    quantity: number;
    instock: number;
    ordered_quantity: number;
    veg: boolean;
    cost: number;
    discount: number;
    reorder: number;
    tags: string[];
    supplys_used: any[]; // Replace `any` with the actual type of `this.formData`
    accompaniments: string[];
    extras: any[];
    created_by: {
      name: string;
      uid: string;
    };
    restaurant: {
      name: string;
      uid: string;
    };
  }