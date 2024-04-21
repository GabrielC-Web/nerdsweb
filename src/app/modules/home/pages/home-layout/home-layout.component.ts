import { Component } from '@angular/core';
import { calendarIcon, folderIcon, microphoneIcon, moneyIcon, phoneIcon, smileIcon, stadisticIcon } from 'src/assets/images/images-routes';
import { whatsappIcon, cameraImg, isotipoImg, laptopImg, person1Img, person3Img, phoneImg  } from 'src/assets/images/images-routes';

@Component({
  selector: 'pag-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent {

  /**
   * Url de las imagenes
   */
  calendarIcon: string = calendarIcon;
  folderIcon: string = folderIcon;
  moneyIcon: string = moneyIcon;
  phoneIcon: string = phoneIcon;
  smileIcon: string = smileIcon;
  stadisticIcon: string = stadisticIcon;
  microphoneIcon: string = microphoneIcon;
  cameraImg: string = cameraImg;
  isotipoImg: string = isotipoImg;
  person1Img: string = person1Img;
  person3Img: string = person3Img;
  laptopImg: string = laptopImg;
  phoneImg: string = phoneImg;
  whatsappIcon: string = whatsappIcon;

}
