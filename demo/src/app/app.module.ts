// ng
import { BrowserModule } from '@angular/platform-browser'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// material
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material'
import {MatRadioModule} from '@angular/material/radio'

// ngrx
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

// app
import { AppComponent } from './app.component'
import { DataService } from './data.service'
import {
  programReducer,
  activityReducer,
  uiReducer
} from './reducers'


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // forms
    FormsModule,
    ReactiveFormsModule,
    // http
    HttpClientModule,
    HttpModule,
    // material
    MatNativeDateModule,
    MatDatepickerModule,
    MatRadioModule,
    // store setup
    StoreModule.forRoot({
      programs: programReducer,
      activities: activityReducer,
      ui: uiReducer,
    }),
    // dev tools
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
  ],
  providers: [
    DataService,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
