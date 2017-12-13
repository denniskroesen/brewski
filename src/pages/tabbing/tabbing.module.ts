import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabbingPage } from './tabbing';

@NgModule({
  declarations: [
    TabbingPage,
  ],
  imports: [
    IonicPageModule.forChild(TabbingPage),
  ]
})
export class TabbingPageModule {}
