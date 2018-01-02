import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {MyApp} from "./app.component";
import {HomePage} from "../pages/home/home";
import {TabbingPage} from "../pages/tabbing/tabbing";
import {AppProviders} from "./app.providers";

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
    providers: AppProviders.getProviders()
})
export class AppModule {
}
