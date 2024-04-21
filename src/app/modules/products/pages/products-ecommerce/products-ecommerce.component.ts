import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CmmDialogService } from 'src/app/common/services/dialogs.service';
import { laptopGif, laptopTemplateImg, whatsappIcon, whomanWhitPhoneImg } from 'src/assets/images/images-routes';
import { Productservice } from '../../services/product.service';
import { VariantModel } from '../../models/products.model';

@Component({
  selector: 'pag-products-ecommerce',
  templateUrl: './products-ecommerce.component.html',
  styleUrls: ['./products-ecommerce.component.scss']
})
export class ProductsEcommerceComponent implements OnInit{
  /**
   * Desactiva la subscripción de observables
   */
  $unsubscribe: Subject<void> =  new Subject();

  /**
   * Url de las imagenes
   */
  whatsappIcon: string = whatsappIcon;
  laptopGif: string = laptopGif;
  whomanWhitPhoneImg: string = whomanWhitPhoneImg;
  laptopTemplateImg: string = laptopTemplateImg;

  /**
   * Variable que contiene el arreglo de de imagenes
   */
  templateArray: VariantModel[] = [];

  /**
   * Variable que contiene el id de la imagen seleccionada
   */
  imageSelected: number = 0;

  constructor(
    private productservice: Productservice,
    private cmmDialogsService: CmmDialogService,
  ){}

  ngOnInit(): void {}

  /**
   * Funcion para seleccionar el siguiente elemento del carrucel
   */
  nextElement() {
    // selecciono el ultimo elemento de mi arreglo de imagenes
    const last: number = this.templateArray.length - 1;

    // selecciono la imagen que corresponde
    const nextImg = ++this.imageSelected;
    if(nextImg > last){
      this.selectTemplate(0);
    }
    else{
      this.selectTemplate(nextImg);
    }
  }

  /**
   * Funcion para seleccionar el anterior elemento del carrucel
   */
  prevElement() {
    // selecciono el ultimo elemento de mi arreglo de imagenes
    const last: number = this.templateArray.length - 1;

    // selecciono la imagen que corresponde
    const nextImg = this.imageSelected - 1;
    if(nextImg < 0){
      this.selectTemplate(last);
    }
    else{
      this.selectTemplate(nextImg);
    }
  }

  /**
   * Funcion que selescciona el Templateo que se muestra en detalle segun la imagen que se seleccione
   * @param idImg
   */
  selectTemplate(idImg: number) {

    // Guardo el id de la imagen seleccionada
    this.imageSelected = idImg;

  }

  /**
   * Funcion que identifica si la imagen que se indica es la seleccionada o no
   * @param idImg
   * @returns
   */
  checkImg(idImg: number): boolean{
    if(this.imageSelected == idImg) {
      return true
    }
    return false
  }

}
