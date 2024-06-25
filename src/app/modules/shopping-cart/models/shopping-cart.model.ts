/**
 * INterface para los products que se listan en el carrito de compra
 */
export interface ProductVariantModel {
    productName:     string;
    brand:           string;
    description:     string;
    amount:          number;
    extraAmount:     number;
    characteristics: string[];
    type:            string;
    category:        string[];
    discount:        number;
    image:           string[];
    visible:         boolean;
    status:          string;
    idProduct:       string;
    name:            string;
    color:           string;
    startDate:       null;
    endDate:         null;
    idVariant:       string;
    variant:         boolean;
    quantity:        string | number;
    template:        string;
    cupon:           string;
}
