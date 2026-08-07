export interface Order {
  id: string | number;
  title: string;
  date: string | Date;
  description?: string;
}


export interface Price {
  value: number;
  symbol: string;
  isDefault: number;
}

export interface Guarantee {
  start: string;
  end: string;
}

export interface Product {
  id: string | number;
  order: string | number;
  photo?: string;
  title: string;
  serialNumber: string | number;
  isNew: number | boolean;
  description?: string;
  price: Array<{ value: number; symbol: string; isDefault: number }>;
  guarantee?: { start: string; end: string };
  userName?: string;
  date?: string;
  type: string;
}

export interface FormattedDate {
  short: string;
  full: string;
}