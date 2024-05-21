/**
 * Interface de todods los productos que puede tener el usuario
 */
export interface ProductCatalogModel {
    productName:     string;
    brand:           string;
    description:     string;
    amount:          number | null;
    extraAmount:     number | null;
    characteristics: string[];
    image:        string[];
    category:        string[];
    status:         'Activo' | 'Inactivo';
    visible:         boolean;
    variant:         boolean;
    stock:           string;
    limitStock:      string;
    discount:        number | null;
    idProduct?:       string;
    variants:        VariantModel[] | [];
}

/**
 * Interface de las distintas variantes de un producto
 */
export interface VariantModel {
    idProduct?:   string;
    name:         string;
    color:        string;
    startDate:    string;
    endDate:      string;
    stock:        string;
    variantPrice: string;
    image:        string[];
    idVariant?:    string;
    infoSelect:    any
}
