import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { arrowIcon, bullStadisticsIcon, cameraIcon, cameraImg, instagramPhoneImg, instagramPostsImg, listIcon, loudspeakerIcon, penIcon, rocketIcon, socialmediaAlly1, socialmediaAlly2, socialmediaAlly3, socialmediaAlly4, socialmediaAlly5, socialmediaAlly6, socialmediaAlly7, whatsappIcon, writeIcon } from 'src/assets/images/images-routes';

@Component({
  selector: 'pag-products-socialmedia',
  templateUrl: './products-socialmedia.component.html',
  styleUrls: ['./products-socialmedia.component.scss']
})
export class ProductsSocialmediaComponent {

  /**
   * Url de las imagenes
   */
  penIcon: string = penIcon;
  bullStadisticsIcon: string = bullStadisticsIcon;
  cameraImg: string = cameraImg;
  cameraIcon: string = cameraIcon;
  arrowIcon: string = arrowIcon;
  instagramPhoneImg: string = instagramPhoneImg;
  instagramPostsImg: string = instagramPostsImg;
  whatsappIcon: string = whatsappIcon;
  loudspeakerIcon: string = loudspeakerIcon;
  listIcon: string = listIcon;
  rocketIcon: string = rocketIcon;
  writeIcon: string = writeIcon;
  /**
   * Variable que contiene el arreglo de de imagenes
   */
  socialmediaAllyArray: string[] = [
    socialmediaAlly1,
    socialmediaAlly2,
    socialmediaAlly3,
    socialmediaAlly4,
    socialmediaAlly5,
    socialmediaAlly6,
    socialmediaAlly7,
  ];

  /**
   * Variable que contiene el id de la imagen seleccionada
   */
  allyImageSelected: number = 0;

  constructor(
    private viewportScroller: ViewportScroller
  ) { }

  /**
   * Funcion que selescciona el Templateo que se muestra en detalle segun la imagen que se seleccione
   * @param idImg
   */
  selectTemplate(idImg: number) {

    // Guardo el id de la imagen seleccionada
    this.allyImageSelected = idImg;

  }

  /**
   * Me scrollea hasta el formulario de contacto
   */
  scrollToForm() {

    this.viewportScroller.scrollToAnchor('contactForm')

  }
}
