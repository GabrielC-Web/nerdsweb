/**
 * INterface para los products que se listan en el carrito de compra
 */
export interface ProductVariantModel {
  brand:           string;
  description:     string;
  characteristics: string[];
  category:        string[];
  productName:     string;
  idProduct:       string;
  name:            string;
  color:           null;
  startDate:       null;
  endDate:         null;
  image:           string[];
  idVariant:       string;
  variant:         boolean;
  quantity:        number;
  amount:          number;
  extraAmount?:          number;
  template:        string;
  cupon:           string;
}
