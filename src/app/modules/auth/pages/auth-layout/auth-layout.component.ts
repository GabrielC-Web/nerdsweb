import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { authTokenVariable } from 'src/app/common/data/constants/local-storage-variables';

@Component({
  selector: 'pag-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {

  isLogin: boolean = true;

  constructor(
    public router: Router
  ){}

  ngOnInit(): void {

    // BUsco el token de login de usuario par aver si esta logeado
    const token: string = sessionStorage.getItem(authTokenVariable)!;

    // Si se consigui el token
    if(token){

      // Dirijo al usuario a la vista de dashboard
      this.router.navigate(['dashboard']);

    }

  }

}
