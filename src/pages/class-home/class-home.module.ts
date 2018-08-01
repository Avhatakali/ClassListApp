import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClassHomePage } from './class-home';

@NgModule({
  declarations: [
    ClassHomePage,
  ],
  imports: [
    IonicPageModule.forChild(ClassHomePage),
  ],
})
export class ClassHomePageModule {}
