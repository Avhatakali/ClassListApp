import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ClassHomePage } from '../class-home/class-home';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

start(){
  this.navCtrl.setRoot(ClassHomePage);
}

}
