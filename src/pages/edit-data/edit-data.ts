import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { ClassHomePage } from '../class-home/class-home';


@IonicPage()
@Component({
  selector: 'page-edit-data',
  templateUrl: 'edit-data.html',
})

export class EditDataPage {

  expenses: any = [];

  data = { rowid:0, name:"", surname:"", identity:"", gender:"", email:"", address:""};

  constructor(public navCtrl: NavController,
      public navParams: NavParams,
      public alertCtrl: AlertController,
      private sqlite: SQLite,
      private toast: Toast) {
      this.getCurrentData(navParams.get("rowid"));
  }

  getCurrentData(rowid){
      this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM class_list WHERE rowid=?', [rowid])
        .then(res => {
          if(res.rows.length > 0) {
            this.data.rowid = res.rows.item(0).rowid;
            this.data.name = res.rows.item(0).name;
            this.data.surname = res.rows.item(0).surname;
            this.data.identity = res.rows.item(0).identity;
            this.data.gender = res.rows.item(0).gender;
            this.data.email = res.rows.item(0).email;
            this.data.address = res.rows.item(0).address;
         }
        })
        
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }


  updateData() {

      this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('UPDATE class_list SET name=?,surname=?,identity=?,gender=?, email=?, address=? WHERE rowid=?',[this.data.name,this.data.surname,this.data.identity,this.data.gender, this.data.email, this.data.address, this.data.rowid])
        .then(res => {
          console.log(res);

          const alert = this.alertCtrl.create({
            title: ' CONFIRMATION  !',
            subTitle: 'details updated !',
            buttons: ['OK']
          });
          alert.present();
        }  
      );
    });
    this.navCtrl.setRoot(ClassHomePage);
  }
  
  
  deleteData(rowid){

  const confirm = this.alertCtrl.create({
    title: 'Delete',
    message: ' are you sure you want to delete class mate ?',
    buttons: [
      {
        text: 'Disagree',
        handler: () => {
          console.log('Disagree clicked');
          this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
          }).then((db: SQLiteObject) => {
            db.executeSql('SELECT* FROM class_list WHERE rowid=?', [this.data.rowid])
            .then(res => {
              console.log(res);
              this.getCurrentData(rowid);
            })
            .catch(e => console.log(e));
          }).catch(e => console.log(e));
        }
      },

      {
        text: 'Agree',
        handler: () => {
          console.log('Agree clicked');
         
          this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
          }).then((db: SQLiteObject) => {
            db.executeSql('DELETE FROM class_list WHERE rowid=?', [this.data.rowid])
            .then(res => {
              console.log(res);
              this.getCurrentData(rowid);
            })
            .catch(e => console.log(e));
          }).catch(e => console.log(e));
          this.navCtrl.setRoot(ClassHomePage);
        }  
      }
    ]
  });
  confirm.present();    
  }

}