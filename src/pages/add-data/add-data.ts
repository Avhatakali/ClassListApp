import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-add-data',
  templateUrl: 'add-data.html',
})
export class AddDataPage {

  data = { name:"",  surname:"",identity:"", gender:"", email:"", address:"" };

  constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        private sqlite: SQLite,
        private toast: Toast) {}

  saveData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO class_list VALUES(NULL,?,?,?,?,?,?)',[this.data.name,this.data.surname,this.data.identity,this.data.gender, this.data.email, this.data.address])
        .then(res => {
          console.log(res);

          const alert = this.alertCtrl.create({
            title: ' CONFIRMATION  !',
            subTitle: 'class mate successfully added !',
            buttons: ['OK']
          });
          alert.present();
        })
     })
  }

}