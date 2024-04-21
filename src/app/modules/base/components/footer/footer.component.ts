import { Component } from '@angular/core';
import { NerdsWebIsotipo, emailIcon, footer, instagramIcon } from 'src/assets/images/images-routes';

@Component({
  selector: 'cmp-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  /**
   * Imagenes
   */
  nerdsWebIsotipo: string = NerdsWebIsotipo;
  emailIcon: string = emailIcon;
  instagramIcon: string = instagramIcon;

  /**
   * Url de las imagenes
   */
  footer: string = footer;
}
