/**
 * Interface de todods los productos que puede tener el usuario
 */
export interface ProductCatalogModel {
    productName:     string;
    brand:           string;
    description:     string;
    amount:          number;
    extraAmount:     number;
    characteristics: string[];
    category:        string[];
    variant:         boolean;
    stock:           null;
    discount:        number;
    idProduct:       string;
    variants:        VariantModel[];
}

/**
 * Interface de las distintas variantes de un producto
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
