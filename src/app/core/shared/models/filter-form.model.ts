/**
 * Interface para los campos que se quieran utilizar en el filtro dinamico de fomularios
 */
export interface FilterObjectModel {
    nameFilter: string;
    icon:       string;
    filterType: string;
    options:    OptionFilterModel[];
}

/**
 * Interface para las opciones que pueden haber dentro de los campos en el filtro dinamico
 */
export interface OptionFilterModel {
    nameOption:  string;
    nameForm:    string;
    regex?:      string;
    onlyNumber?: boolean;
    min?:        string;
    max?:        string;
    value:       string;
    subOptions?: SubOptionFilterModel[];
}

/**
 * interface para las subOpciones que se podrian llegar a usar dentro de las opciones de los campos en el filtro dinamico
 */
export interface SubOptionFilterModel {
    nameSubOption: string;
    value:         string;
}
