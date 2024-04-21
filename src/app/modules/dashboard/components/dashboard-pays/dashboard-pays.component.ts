import { Component, OnInit } from '@angular/core';
import { cardsIcon } from 'src/assets/images/images-routes';

@Component({
  selector: 'cmp-dashboard-pays',
  templateUrl: './dashboard-pays.component.html',
  styleUrls: ['./dashboard-pays.component.scss']
})
export class DashboardPaysComponent implements OnInit {
  /**
   * Url de las imagenes
   */
  cardsIcon: string = cardsIcon;

  constructor() {}

  ngOnInit(): void {

  }


}
