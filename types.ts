
export type CarCategory = 'Sedan' | 'SUV' | 'Hypercar' | 'Electric' | 'Classic';

export interface CarSpecs {
  acceleration: string;
  topSpeed: string;
  range?: string;
  power: string;
  driveType: string;
}

export interface Car {
  id: string;
  name: string;
  model: string;
  year: number;
  price: number;
  category: CarCategory;
  image: string;
  description: string;
  specs: CarSpecs;
  featured?: boolean;
}

export interface CartItem extends Car {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (car: Car) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalPrice: number;
}

export enum View {
  Home = 'HOME',
  Models = 'MODELS',
  About = 'ABOUT',
  Cart = 'CART',
  Checkout = 'CHECKOUT',
  Concierge = 'CONCIERGE',
  ProductDetail = 'PRODUCT_DETAIL'
}
