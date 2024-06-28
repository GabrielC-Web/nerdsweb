import { Component } from '@angular/core';
import { orderIcon, productIcon } from 'src/assets/images/images-routes';

@Component({
  selector: 'cmp-dashboard-backoffices-options',
  templateUrl: './dashboard-backoffices-options.component.html',
  styleUrls: ['./dashboard-backoffices-options.component.scss']
})
export class DashboardBackofficesOptionsComponent {

  /**
   * imagenes para la vista
   */
  productIcon = productIcon;
  orderIcon = orderIcon;
  single: {
    name: string,
    value: number
  }[] = [
      {
        "name": "Germany",
        "value": 8940000
      },
      {
        "name": "USA",
        "value": 5000000
      },
      {
        "name": "France",
        "value": 7200000
      },
      {
        "name": "UK",
        "value": 5200000
      },
      {
        "name": "Italy",
        "value": 7700000
      },
      {
        "name": "Spain",
        "value": 4300000
      }
    ];
  view: [number, number] = [700, 400];

  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  cardColor: string = '#28285B';

  windowMatchMedia = window.matchMedia('(min-width: 767px)')
  windowMatchMedia1 = window.matchMedia('(max-width: 500px)')
  windowMatchMedi2 = window.matchMedia('(min-width: 767px)')

  constructor() {
  }

  ngOnInit() {

    if (window.innerWidth <= 500) {
      this.view = [300, 400];
    }

    if (window.innerWidth <= 767 && window.innerWidth > 500) {
      this.view = [500, 400];
    }

    this.windowMatchMedia.addEventListener('change', (event) => {
      if (event.matches) {
        this.view = [500, 400];
      }
    })

    this.windowMatchMedia1.addEventListener('change', (event) => {
      if (event.matches) {
        this.view = [300, 400];
      }
    })

  }

  onSelect(event: any) {
    console.log(event);
  }
}
