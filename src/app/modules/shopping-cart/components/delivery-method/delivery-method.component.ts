import { environment } from "src/environments/environment";
import { Component } from '@angular/core';

@Component({
  selector: 'cmp-delivery-method',
  templateUrl: './delivery-method.component.html',
  styleUrls: ['./delivery-method.component.scss']
})
export class DeliveryMethodComponent {

  /**
   * Key de google maps
   */
  mapApiKey: string = environment.GM_APIKEY

}
