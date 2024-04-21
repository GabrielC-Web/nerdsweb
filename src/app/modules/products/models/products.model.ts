/**
 * Interface para los productos que se muestran en las paginas de redes sociales e Ecommerce
 */
export interface ProductModel {
  productName:            string;
  brand:           string;
  description:     string;
  amount:          number;
  extraAmount:     number;
  characteristics: string[];
  lifeTime:        null;
  category:        string[];
  variant:         boolean;
  stock:           null;
  idProduct:       string;
  variants:        VariantModel[];
}

/**
 * Interface para los productos que se van a agregar al carrito de compras
 */
export interface VariantModel {
  name:         string;
  color:        null;
  startDate:    null;
  endDate:      null;
  stock:        null;
  variantPrice: null;
  image:        string[];
  idVariant:    string;
}

/**
 * Interface para los productos que se van a agregar al carrito de compras
 */
export interface AddProductToShoppingCardModel {
  idProduct: string,
  quantity: string,
  idTemplate: string
}


