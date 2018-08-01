import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { AddDataPage } from '../add-data/add-data';
import { EditDataPage } from '../edit-data/edit-data';

/**
 * Generated class for the ClassHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-class-home',
  templateUrl: 'class-home.html',
})
export class ClassHomePage {

  expenses: any = [];
  totalIncome = 0;
  totalExpense = 0;
  balance = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private sqlite: SQLite) { }



  ionViewDidLoad() {
    this.getData();
  }
  
  ionViewWillEnter() {
    this.getData();
  }
  
  getData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS class_list(rowid INTEGER PRIMARY KEY, name TEXT, surname TEXT, identity INT, gender TEXT, email TEXT, address TEXT)', null)
      .then(res => console.log('Executed SQL'))
      .catch(e => console.log(e));
      db.executeSql('SELECT * FROM class_list ORDER BY rowid DESC', null)
      .then(res => {
        this.expenses = [];
        for(var i=0; i<res.rows.length; i++) {
          this.expenses.push({rowid:res.rows.item(i).rowid,
            name:res.rows.item(i).name,
            surname:res.rows.item(i).surname,
            identity:res.rows.item(i).identity,
            gender:res.rows.item(i).gender,
            email:res.rows.item(i).email,
            address:res.rows.item(i).address
          })
        }
      })

      // .catch(e => console.log(e));
      // db.executeSql('SELECT SUM(amount) AS totalIncome FROM expense WHERE type="Income"', null)
      // .then(res => {
      //   if(res.rows.length>0) {
      //     this.totalIncome = parseInt(res.rows.item(0).totalIncome);
      //     this.balance = this.totalIncome-this.totalExpense;
      //   }
      // })
      // .catch(e => console.log(e));
      // db.executeSql('SELECT SUM(amount) AS totalExpense FROM expense WHERE type="Expense"', null)
      // .then(res => {
      //   if(res.rows.length>0) {
      //     this.totalExpense = parseInt(res.rows.item(0).totalExpense);
      //     this.balance = this.totalIncome-this.totalExpense;
      //   }
      // })

    }).catch(e => console.log(e));
  }
  
  addData() {
    this.navCtrl.push(AddDataPage);
  }
  
  editData(rowid) {
    this.navCtrl.push(EditDataPage, {
      rowid:rowid
    });
  }
  
  deleteData(rowid) {
    this.navCtrl.push(EditDataPage, {
      rowid:rowid
    });
  }

  // deleteData(rowid) {
  //   this.sqlite.create({
  //     name: 'ionicdb.db',
  //     location: 'default'
  //   }).then((db: SQLiteObject) => {
  //     db.executeSql('DELETE FROM class_list WHERE rowid=?', [rowid])
  //     .then(res => {
  //       console.log(res);
  //       this.getData();
  //     })
  //     .catch(e => console.log(e));
  //   }).catch(e => console.log(e));
  // }  

}
