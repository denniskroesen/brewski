import {BrowserModule} from "@angular/platform-browser";
import {ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";
import {BluetoothSerial} from "@ionic-native/bluetooth-serial";
import {MyApp} from "./app.component";
import {HomePage} from "../pages/home/home";
import {TabbingPage} from "../pages/tabbing/tabbing";
import { KetelDataProvider } from '../providers/ketel-data/ketel-data';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        TabbingPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        TabbingPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        BluetoothSerial,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        KetelDataProvider
    ]
})
export class AppModule {
}
