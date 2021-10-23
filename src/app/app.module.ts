import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BucketListComponent} from './bucket-list/bucket-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ApiService} from './shared/services/api.service';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { BucketComponent } from './bucket/bucket.component';
import { BucketFilesComponent } from './bucket/bucket-files/bucket-files.component';
import { BucketDetailsComponent } from './bucket/bucket-details/bucket-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddBucketComponent } from './bucket-list/add-bucket/add-bucket.component';
import { ToUnitsPipe } from './shared/pipes/toUnits.pipe';
import {ErrorInterceptor} from "./error-interceptor";
import { ModalComponent } from './shared/components/modal/modal.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    BucketListComponent,
    BucketComponent,
    BucketFilesComponent,
    BucketDetailsComponent,
    AddBucketComponent,
    ToUnitsPipe,
    ModalComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      }
    }),
    NgbModule,
  ],
  providers: [ApiService, {provide:HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
