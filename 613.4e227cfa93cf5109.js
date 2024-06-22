"use strict";(self.webpackChunknerdsweb=self.webpackChunknerdsweb||[]).push([[613],{613:(D,l,n)=>{n.r(l),n.d(l,{BaseModule:()=>Q});var m=n(6814),p=n(4054),a=n(1303),h=n(8021),c=n(8645),M=n(9773),r=n(5134),u=n(6454),t=n(5879),f=n(873),j=n(2169),E=n(9613),Y=n(3651);let W=(()=>{class s{constructor(o){this.overlay=o}ngOnInit(){this.overlay.create({hasBackdrop:!0,backdropClass:"dark-backdrop",positionStrategy:this.overlay.position().global().centerHorizontally().centerVertically()})}static#t=this.\u0275fac=function(e){return new(e||s)(t.Y36(Y.aV))};static#n=this.\u0275cmp=t.Xpm({type:s,selectors:[["cmm-cmp-spinner"]],decls:5,vars:0,consts:[[1,"spinner-container","position-fixed","d-flex","justify-content-center","align-items-center",2,"top","0","bottom","0","left","0","right","0","z-index","9999","background-color","rgba(255, 255, 255, 0.94)","border-radius","0px"],[1,"spinner","three-body",2,"position","relative"],[1,"three-body__dot"]],template:function(e,i){1&e&&(t.TgZ(0,"div",0)(1,"div",1),t._UZ(2,"div",2)(3,"div",2)(4,"div",2),t.qZA()())},styles:['.spinner-container[_ngcontent-%COMP%]{position:absolute;display:flex;justify-content:center;align-items:center;border-radius:10px;top:0;bottom:0;left:0;right:50;z-index:9999}.spinner[_ngcontent-%COMP%]{flex-direction:row;display:flex;align-items:center;justify-content:center}.dot1[_ngcontent-%COMP%], .dot2[_ngcontent-%COMP%], .dot3[_ngcontent-%COMP%]{font-weight:700;color:#14c6a4;right:-30px!important}.dot1[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_jump765 1.6s -.32s linear infinite}.dot2[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_jump765 1.6s -.16s linear infinite}.dot3[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_jump765 1.6s linear infinite}@keyframes _ngcontent-%COMP%_jump765{0%,80%,to{transform:scale(0)}40%{transform:scale(1.3)}}.three-body[_ngcontent-%COMP%]{--uib-size: 35px;--uib-speed: .8s;--uib-color: #5D3FD3;position:relative;display:inline-block;height:var(--uib-size);width:var(--uib-size);animation:_ngcontent-%COMP%_spin78236 calc(var(--uib-speed) * 2.5) infinite linear}.three-body__dot[_ngcontent-%COMP%]{position:absolute;height:100%;width:30%}.three-body__dot[_ngcontent-%COMP%]:after{content:"";position:absolute;height:0%;width:100%;padding-bottom:100%;background-color:var(--uib-color);border-radius:50%}.three-body__dot[_ngcontent-%COMP%]:nth-child(1){bottom:5%;left:0;transform:rotate(60deg);transform-origin:50% 85%}.three-body__dot[_ngcontent-%COMP%]:nth-child(1):after{bottom:0;left:0;animation:_ngcontent-%COMP%_wobble1 var(--uib-speed) infinite ease-in-out;animation-delay:calc(var(--uib-speed) * -.3)}.three-body__dot[_ngcontent-%COMP%]:nth-child(2){bottom:5%;right:0;transform:rotate(-60deg);transform-origin:50% 85%}.three-body__dot[_ngcontent-%COMP%]:nth-child(2):after{bottom:0;left:0;animation:_ngcontent-%COMP%_wobble1 var(--uib-speed) infinite calc(var(--uib-speed) * -.15) ease-in-out}.three-body__dot[_ngcontent-%COMP%]:nth-child(3){bottom:-5%;left:0;transform:translate(116.666%)}.three-body__dot[_ngcontent-%COMP%]:nth-child(3):after{top:0;left:0;animation:_ngcontent-%COMP%_wobble2 var(--uib-speed) infinite ease-in-out}@keyframes _ngcontent-%COMP%_spin78236{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes _ngcontent-%COMP%_wobble1{0%,to{transform:translateY(0) scale(1);opacity:1}50%{transform:translateY(-66%) scale(.65);opacity:.8}}@keyframes _ngcontent-%COMP%_wobble2{0%,to{transform:translateY(0) scale(1);opacity:1}50%{transform:translateY(66%) scale(.65);opacity:.8}}']})}return s})();var v=n(2651),d=n(2908),P=n(2296),Z=n(1274),y=n(7988),x=n(617);const O=function(){return["home"]},b=function(){return["products/ecommerce"]},C=function(){return["products/social_media"]},_=function(){return["dashboard"]};let T=(()=>{class s{constructor(o,e){this.router=o,this.dataServices=e,this.NerdsWebLogo=d.Fm,this.subscribeRouter()}ngOnInit(){sessionStorage.getItem(r.DA)&&(this.userInfo=JSON.parse(this.dataServices.CmmB64DecodeUnicode(sessionStorage.getItem(r.DA))))}subscribeRouter(){this.router.events.subscribe(o=>{o instanceof a.m2&&window.scrollTo(0,0),o instanceof a.Q3&&window.scrollTo(0,0)})}static#t=this.\u0275fac=function(e){return new(e||s)(t.Y36(a.F0),t.Y36(f.U))};static#n=this.\u0275cmp=t.Xpm({type:s,selectors:[["cmp-base-header"]],decls:29,vars:18,consts:[[1,"w-100","cmm-bg-gradient-secondary",2,"max-height","50px"],[1,"text-white","text-center","m-0","py-3","fs-16","fw-bold"],["id","toolbar",1,"p-0",2,"height","100px"],[1,"cmm-bg-white","w-100","h-100","d-flex","justify-content-between","align-items-center"],[1,"",3,"routerLink"],["alt","",1,"ms-3",2,"width","200px","height","fit-content",3,"src"],[1,"d-none","d-md-flex","justify-content-end","align-items-center","m-0","px-4","gap-5"],[1,"cmm-txt-gradient-hover","fs-24",3,"routerLink"],[1,"cmm-txt-gradient-hover","fs-24","d-flex","gap-2","align-items-center",3,"routerLink"],[1,"fs-28",2,"width","28px !important"],["mat-button","",1,"d-block","d-md-none","h-100",3,"matMenuTriggerFor"],["xPosition","before"],["beforeMenu","matMenu"],[1,"my-2","d-flex","flex-column","px-4"],[1,"cmm-txt-gradient-hover","fs-24","text-center",3,"routerLink"],[1,"my-3","w-100","cmm-bg-gradient-secondary",2,"height","3px","border-radius","50%"],[1,"cmm-txt-gradient-hover","fs-24","mb-3",3,"routerLink"]],template:function(e,i){if(1&e&&(t.TgZ(0,"div",0)(1,"p",1),t._uU(2,"\xa1Ey, con la compra de nuestras suscripciones anuales tendr\xe1s un mes gratis! "),t.qZA()(),t.TgZ(3,"mat-toolbar",2)(4,"div",3)(5,"a",4),t._UZ(6,"img",5),t.qZA(),t.TgZ(7,"ul",6)(8,"a",7),t._uU(9,"Ecommerce"),t.qZA(),t.TgZ(10,"a",7),t._uU(11,"Redes Sociales"),t.qZA(),t.TgZ(12,"a",8),t._uU(13),t.TgZ(14,"mat-icon",9),t._uU(15,"account_circle"),t.qZA()()(),t.TgZ(16,"button",10)(17,"mat-icon"),t._uU(18,"dehaze"),t.qZA()(),t.TgZ(19,"mat-menu",11,12)(21,"div",13)(22,"a",14),t._uU(23),t.qZA(),t._UZ(24,"div",15),t.TgZ(25,"a",16),t._uU(26,"Ecommerce"),t.qZA(),t.TgZ(27,"a",16),t._uU(28,"Redes Sociales"),t.qZA()()()()()),2&e){const g=t.MAs(20);t.xp6(5),t.Q6J("routerLink",t.DdM(11,O)),t.xp6(1),t.Q6J("src",i.NerdsWebLogo,t.LSH),t.xp6(2),t.Q6J("routerLink",t.DdM(12,b)),t.xp6(2),t.Q6J("routerLink",t.DdM(13,C)),t.xp6(2),t.Q6J("routerLink",t.DdM(14,_)),t.xp6(1),t.hij(" ",null!=i.userInfo&&i.userInfo.name?null==i.userInfo?null:i.userInfo.name:"Mi Cuenta"," "),t.xp6(3),t.Q6J("matMenuTriggerFor",g),t.xp6(6),t.Q6J("routerLink",t.DdM(15,_)),t.xp6(1),t.hij(" ",null!=i.userInfo&&i.userInfo.name?"@"+(null==i.userInfo?null:i.userInfo.name):"Mi Cuenta"," "),t.xp6(2),t.Q6J("routerLink",t.DdM(16,b)),t.xp6(2),t.Q6J("routerLink",t.DdM(17,C))}},dependencies:[P.lW,Z.Ye,y.VK,y.p6,x.Hw,a.rH]})}return s})(),A=(()=>{class s{constructor(){this.nerdsWebIsotipo=d.yN,this.emailIcon=d.J2,this.instagramIcon=d.tw,this.footer=d.Mv}static#t=this.\u0275fac=function(e){return new(e||s)};static#n=this.\u0275cmp=t.Xpm({type:s,selectors:[["cmp-footer"]],decls:32,vars:10,consts:[[1,"d-flex","flex-column","align-items-center",2,"box-shadow","0px 0px 40px 40px #ffffff !important"],[1,"d-flex","flex-column","flex-sm-row","justify-content-center","align-items-center","w-100",2,"height","80%","max-width","1200px"],[1,"d-flex","flex-column","col-sm-4","px-2","my-3","border_footer","h-100"],["alt","Logo de nerdsweb",2,"max-width","230px",3,"src"],[1,"d-flex","w-100","justify-content-end"],["alt","icono de email",2,"max-width","65px",3,"src"],["alt","Icono de instagram",2,"max-width","65px",3,"src"],[1,"col-sm-4","px-2","my-3","border_footer","h-100"],[1,"d-flex","flex-column","mx-auto",2,"max-width","fit-content"],[1,"ps-3","fw-bold","fs-18","text-center","text-sm-start"],[1,"ps-3","text-decoration-none","text-center","text-sm-start","cmm-txt",3,"routerLink"],[1,"col-sm-4","px-2","my-3","h-100"],[1,"w-100","d-flex","align-items-center","position-relative","cmm-bg-gradient",2,"overflow","hidden","height","20%","min-height","50px"],[1,"position-relative",2,"box-shadow","-4em 0em 7em 14em white !important","height","20px","top","0","left","0"],[1,"position-relative",2,"box-shadow","4em 0em 7em 14em white !important","height","20px","top","0","left","100%"]],template:function(e,i){1&e&&(t.TgZ(0,"footer",0)(1,"div",1)(2,"div",2),t._UZ(3,"img",3),t.TgZ(4,"div",4),t._UZ(5,"img",5)(6,"img",6),t.qZA()(),t.TgZ(7,"div",7)(8,"div",8)(9,"p",9),t._uU(10,"Soluciones"),t.qZA(),t.TgZ(11,"a",10),t._uU(12,"Ecommerce"),t.qZA(),t.TgZ(13,"a",10),t._uU(14,"Redes sociales"),t.qZA(),t.TgZ(15,"a",10),t._uU(16,"Diseho gr\xe5fico \xbfQu\xe9 necesitas?"),t.qZA(),t.TgZ(17,"a",10),t._uU(18,"Plantillas"),t.qZA()()(),t.TgZ(19,"div",11)(20,"div",8)(21,"p",9),t._uU(22,"Compa\xf1\xeda"),t.qZA(),t.TgZ(23,"a",10),t._uU(24,"Nosotros"),t.qZA(),t.TgZ(25,"a",10),t._uU(26,"Compromisos"),t.qZA(),t.TgZ(27,"a",10),t._uU(28,"Centro de ayuda"),t.qZA()()()(),t.TgZ(29,"div",12),t._UZ(30,"div",13)(31,"div",14),t.qZA()()),2&e&&(t.xp6(3),t.Q6J("src",i.nerdsWebIsotipo,t.LSH),t.xp6(2),t.Q6J("src",i.emailIcon,t.LSH),t.xp6(1),t.Q6J("src",i.instagramIcon,t.LSH),t.xp6(5),t.Q6J("routerLink","products/ecommerce"),t.xp6(2),t.Q6J("routerLink","products/social_media"),t.xp6(2),t.Q6J("routerLink","products/social_media"),t.xp6(2),t.Q6J("routerLink","products/ecommerce"),t.xp6(6),t.Q6J("routerLink","home"),t.xp6(2),t.Q6J("routerLink","home"),t.xp6(2),t.Q6J("routerLink","home"))},dependencies:[a.rH],styles:[".border_footer[_ngcontent-%COMP%]{border-right:1px solid #6c757d}@media (max-width: 567px){.border_footer[_ngcontent-%COMP%]{border-right:none}}"]})}return s})();var N=n(8228),L=n(2596);function U(s,I){if(1&s&&(t.TgZ(0,"span",3),t._uU(1),t.qZA()),2&s){const o=t.oxw();t.xp6(1),t.hij(" ",o.productsList.length," ")}}let S=(()=>{class s{constructor(o,e){this.router=o,this.shoppingCartServices=e,this.$unsubscribe=new c.x,this.productsList=[]}ngOnInit(){this.getProductsList()}getProductsList(){this.shoppingCartServices.getCartProductsList().pipe((0,M.R)(this.$unsubscribe)).subscribe({next:o=>{this.productsList=o.data},error:o=>{}})}goToShoppingCart(){this.router.navigate(["shopping-cart"])}static#t=this.\u0275fac=function(e){return new(e||s)(t.Y36(a.F0),t.Y36(N.F))};static#n=this.\u0275cmp=t.Xpm({type:s,selectors:[["cmp-shopping-float-button"]],decls:4,vars:1,consts:[["matTooltip","Carrito de compra",1,"position-absolute","rounded-circle","cmm-bg-primary","d-flex","justify-content-center","align-items-center","w-100","shopping_cart",2,"aspect-ratio","1/1",3,"click"],["class","position-absolute top-0 start-100 translate-middle badge rounded-pill cmm-bg-secondary",4,"ngIf"],[1,"cmm-txt-white","fs-36",2,"height","auto !important","width","auto !important"],[1,"position-absolute","top-0","start-100","translate-middle","badge","rounded-pill","cmm-bg-secondary"]],template:function(e,i){1&e&&(t.TgZ(0,"div",0),t.NdJ("click",function(){return i.goToShoppingCart()}),t.YNc(1,U,2,1,"span",1),t.TgZ(2,"mat-icon",2),t._uU(3,"shopping_cart"),t.qZA()()),2&e&&(t.xp6(1),t.Q6J("ngIf",i.productsList.length))},dependencies:[m.O5,x.Hw,L.gM],styles:["[_ngcontent-%COMP%]:root{--v-dynamic-primary: #336ab2;--v-dynamic-primary-selected: #2e5f9e;--v-dynamic-secundary: #2e5f9e;--v-dynamic-tertiary: #2e5f9e;--mdc-text-button-container-shape: 20px;--mdc-protected-button-container-shape: 20px;--bs-border-radius: 10px}.shopping_cart[_ngcontent-%COMP%]{transition:all .25s ease}.shopping_cart[_ngcontent-%COMP%]:hover{transform:scale(1.2)}.shopping_cart[_ngcontent-%COMP%]:hover   mat-icon[_ngcontent-%COMP%]{color:#f3954d}"]})}return s})();function w(s,I){1&s&&t._UZ(0,"cmm-cmp-spinner",6)}function J(s,I){1&s&&t._UZ(0,"cmp-shopping-float-button",7)}const F=[{path:"",component:(()=>{class s{constructor(o,e,i,g){this.dataservice=o,this.location=e,this.store=i,this.timerSessionService=g,this.unsubscribe=new c.x,this.spinner=!1,this.actualPath="",this.actualPath=this.location.path()}ngOnInit(){this.token=sessionStorage.getItem(r.ls),this.listenSpinnerChanges()}listenSpinnerChanges(){this.store.select(u.lY).pipe((0,M.R)(this.unsubscribe)).subscribe({next:o=>{setTimeout(()=>{this.spinner=o},0)}})}logout(){this.timerSessionService.CmmCloseSession()}static#t=this.\u0275fac=function(e){return new(e||s)(t.Y36(f.U),t.Y36(m.Ye),t.Y36(j.yh),t.Y36(E.n))};static#n=this.\u0275cmp=t.Xpm({type:s,selectors:[["app-base-layout"]],decls:9,vars:2,consts:[[1,"container-full"],["class","vh-100",4,"ngIf"],["class","position-fixed","style","width: 60px; bottom: 10vh; right: 2em; z-index: 999;",4,"ngIf"],[1,"position-relative"],[1,"cmm-bg-white"],["id","page-container",1,"overflow-hidden",2,"min-height","87vh"],[1,"vh-100"],[1,"position-fixed",2,"width","60px","bottom","10vh","right","2em","z-index","999"]],template:function(e,i){1&e&&(t.TgZ(0,"div",0),t.YNc(1,w,1,0,"cmm-cmp-spinner",1),t.YNc(2,J,1,0,"cmp-shopping-float-button",2),t._UZ(3,"cmp-base-header"),t.TgZ(4,"mat-drawer-container",3)(5,"mat-drawer-content",4)(6,"div",5),t._UZ(7,"router-outlet"),t.qZA(),t._UZ(8,"cmp-footer"),t.qZA()()()),2&e&&(t.xp6(1),t.Q6J("ngIf",i.spinner),t.xp6(1),t.Q6J("ngIf",!i.actualPath.includes("shopping-cart")&&i.token))},dependencies:[m.O5,W,v.kh,v.LW,a.lC,T,A,S]})}return s})(),children:[{path:"",redirectTo:"home",pathMatch:"full"},{path:"home",loadChildren:()=>n.e(969).then(n.bind(n,969)).then(s=>s.HomeModule)},{path:"products",loadChildren:()=>Promise.all([n.e(969),n.e(875)]).then(n.bind(n,4875)).then(s=>s.ProductsModule)},{path:"auth",loadChildren:()=>Promise.all([n.e(945),n.e(592),n.e(717)]).then(n.bind(n,1717)).then(s=>s.AuthModule)},{path:"dashboard",loadChildren:()=>Promise.all([n.e(945),n.e(224),n.e(592),n.e(521)]).then(n.bind(n,3521)).then(s=>s.DashboardModule)},{path:"shopping-cart",loadChildren:()=>Promise.all([n.e(945),n.e(224),n.e(222)]).then(n.bind(n,8222)).then(s=>s.ShoppingCartModule)}]}];let B=(()=>{class s{static#t=this.\u0275fac=function(e){return new(e||s)};static#n=this.\u0275mod=t.oAB({type:s});static#s=this.\u0275inj=t.cJS({providers:[h.H],imports:[a.Bz.forChild(F),a.Bz]})}return s})(),Q=(()=>{class s{static#t=this.\u0275fac=function(e){return new(e||s)};static#n=this.\u0275mod=t.oAB({type:s});static#s=this.\u0275inj=t.cJS({imports:[m.ez,p.n,B]})}return s})()},8228:(D,l,n)=>{n.d(l,{F:()=>h});var m=n(9886),p=n(5879),a=n(9862);let h=(()=>{class c{constructor(r){this.http=r,this.gatewayUrl=m.N.CC_GATEWAY_URL}getCartProductsList(){return this.http.get(this.gatewayUrl+"/v1/profile/getCart")}getPayMethodsList(){return this.http.get(this.gatewayUrl+"/v1/profile/getCart")}postPaymentData(){return this.http.get(this.gatewayUrl+"/v1/profile/getCart")}deleteCartProductsList(r){return this.http.delete(this.gatewayUrl+"/v1/profile/deleteCart",{body:{idProducts:r}})}static#t=this.\u0275fac=function(u){return new(u||c)(p.LFG(a.eN))};static#n=this.\u0275prov=p.Yz7({token:c,factory:c.\u0275fac,providedIn:"root"})}return c})()},2908:(D,l,n)=>{n.d(l,{Au:()=>g,CH:()=>P,EV:()=>A,EW:()=>S,Fm:()=>d,GL:()=>F,Ii:()=>i,J2:()=>s,JN:()=>Q,Js:()=>k,Mv:()=>f,O4:()=>O,OP:()=>tt,PM:()=>$,R0:()=>ct,R7:()=>U,Rl:()=>L,Sk:()=>rt,T0:()=>x,Uc:()=>q,Uh:()=>e,V8:()=>J,W4:()=>b,WO:()=>it,Wj:()=>K,XS:()=>st,Xk:()=>G,_J:()=>w,bZ:()=>H,df:()=>X,kO:()=>ot,ls:()=>et,ny:()=>R,o6:()=>nt,p3:()=>z,pN:()=>at,qv:()=>C,ry:()=>_,tw:()=>I,tz:()=>T,uW:()=>y,vA:()=>o,vi:()=>Z,xV:()=>V,yN:()=>v,yn:()=>B});const f="assets/images/covers/nd_footer.svg",v="assets/images/logos/nd_isotipo.svg",d="assets/images/logos/nd_logo.svg",P="assets/images/icons/nd_candelar_icon.svg",Z="assets/images/icons/nd_folder_icon.svg",y="assets/images/icons/nd_money_icon.svg",x="assets/images/icons/nd_money_icon.svg",O="assets/images/icons/nd_smile_icon.svg",b="assets/images/icons/nd_stadistic_icon.svg",C="assets/images/icons/nd_microphone_icon.svg",_="assets/images/icons/nd_whatsapp_icon.svg",T="assets/images/icons/nd_bell_icon.svg",A="assets/images/icons/nd_cards_icon.svg",L="assets/images/icons/nd_eardphones_icon.svg",U="assets/images/icons/nd_plus_icon.svg",S="assets/images/icons/nd_ticke_icon.svg",w="assets/images/icons/nd_bull_stadistics_icon.svg",J="assets/images/icons/nd_arrow_icon.svg",R="assets/images/icons/nd_camera_icon.svg",F="assets/images/icons/nd_pen_icon.svg",B="assets/images/icons/nd_product_icon.svg",Q="assets/images/icons/nd_order_icon.svg",s="assets/images/icons/nd_email_icon.svg",I="assets/images/icons/nd_instagram_icon.svg",o="assets/images/icons/nd_loudspeaker_icon.svg",e="assets/images/icons/nd_list_icon.svg",i="assets/images/icons/nd_rocket_icon.svg",g="assets/images/icons/nd_write_icon.svg",z="assets/images/img/nd_camera_picture.png",H="assets/images/img/nd_isotipo.png",k="assets/images/img/nd_person_home_1.png",V="assets/images/img/nd_person_home_4.svg",X="assets/images/img/nd_phones_home_2.png",G="assets/images/img/nd_laptop_picture.png",K="assets/images/img/nd_instagram_phone.png",$="assets/images/img/nd_instagram_posts.png",q="assets/images/img/nd_socialmedia_ally_1.png",tt="assets/images/img/nd_socialmedia_ally_2.png",nt="assets/images/img/nd_socialmedia_ally_3.png",st="assets/images/img/nd_socialmedia_ally_4.png",et="assets/images/img/nd_socialmedia_ally_5.png",ot="assets/images/img/nd_socialmedia_ally_6.png",it="assets/images/img/nd_socialmedia_ally_7.png",at="assets/images/img/nd_laptop.gif",ct="assets/images/img/nd_whoman_phone.png",rt="assets/images/img/nd_laptop_template.png"}}]);