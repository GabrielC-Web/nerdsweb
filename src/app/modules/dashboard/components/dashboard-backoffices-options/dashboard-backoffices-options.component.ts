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
      "name": "Ventas Totales",
      "value": 894
    },
    {
      "name": "Ventas este Mes",
      "value": 50
    },
    {
      "name": "Total de Ganancias",
      "value": 7200
    },
    {
      "name": "Inventario total",
      "value": 52000
    },
    {
      "name": "Productos Vendidos",
      "value": 8700
    },
    {
      "name": "Usuarios registrados",
      "value": 430000
    }
  ];
  view: [number, number] = [700, 400];

  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  cardColor: string = '#ffffff';

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
