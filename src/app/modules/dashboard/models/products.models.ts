import { Subscription } from "rxjs";

/**
 * Interface de los productos para mostrar en el listasdo
 */
export interface ProductCatalogModel {
  name:     string;
  brand:           string;
  price:          number | null;
  extraPrice:     number | null;
  gallery:        any[];
  status:         'Activo' | 'Inactivo';
  visible:         boolean;
  stock:           string;
  discount:        number | null;
  idProduct?:       string;
}

/**
 * Interface del producto con todos sus parametros
 */
export interface ProductModel {
    name:     string;
    brand:           string;
    description:     string;
    price:          number | null;
    extraPrice:     number | null;
    characteristics: string;
    gallery:          any[];
    categories:        {
      idCategory: string;
      categoryName: string;
    }[];
    status:          'Activo' | 'Inactivo';
    visible:         boolean;
    stock:           string;
    type:            string;
    discount:        number | null;
    idProduct?:      string;
    products_variants:        VariantModel[] | [];
}

/**
 * Interface de las distintas variantes de un producto
 */
export interface VariantModel {
    name:         string;
    color:        string;
    referralStock:        string;
    referralPrice: string;
    variant_gallery:        {
      idImage: string;
      url: string;
    }[];
    idVariant?:    string;
}

/**
 * Modelo para los tipos de productos
 */
export const typeProducts = {
  digital: '66071cb992f309c9a63017d8',
  physical: '66080e2371beef4a9cc4c0e4',
}
