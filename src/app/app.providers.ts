/**
 * Created by dennis on 30-12-17.
 */
import {ErrorHandler} from "@angular/core";
import {IonicErrorHandler} from "ionic-angular";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {BluetoothSerial} from "@ionic-native/bluetooth-serial";
import {KetelDataProvider} from "../providers/ketel-data/ketel-data";
import {KetelDataMockProvider} from "../providers/ketel-data-mock/ketel-data-mock";
import {ReceptProvider} from "../providers/recept/recept";

export class AppProviders {

    public static getProviders() {

        let providers;

        if(document.URL.includes('https://') || document.URL.includes('http://')){

            // Use browser providers
            providers = [
                StatusBar,
                SplashScreen,
                BluetoothSerial,
                ReceptProvider,
                {provide: ErrorHandler, useClass: IonicErrorHandler},
                {provide: KetelDataProvider, useClass: KetelDataMockProvider}
            ];

        } else {

            // Use device providers
            providers = [
                StatusBar,
                SplashScreen,
                BluetoothSerial,
                ReceptProvider,
                {provide: ErrorHandler, useClass: IonicErrorHandler},
                KetelDataProvider
            ];

        }

        return providers;
    }
}