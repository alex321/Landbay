import {ApplicationRef, NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {createNewHosts, removeNgStyles} from '@angularclass/hmr';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {SuccessDialogComponent} from './home/success-dialog.component';

@NgModule({
  imports: [
    BrowserModule, HttpModule, FormsModule, ReactiveFormsModule,
    MaterialModule.forRoot(), FlexLayoutModule.forRoot()
  ],
  declarations: [AppComponent, HomeComponent, SuccessDialogComponent],
  entryComponents: [SuccessDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor(public appRef: ApplicationRef) {}
    hmrOnInit(store) { console.log('HMR store', store); }
    hmrOnDestroy(store) {
      let cmpLocation =
          this.appRef.components.map(cmp => cmp.location.nativeElement);
      // recreate elements
      store.disposeOldHosts = createNewHosts(cmpLocation);
      // remove styles
      removeNgStyles();
    }
    hmrAfterDestroy(store) {
      // display new elements
      store.disposeOldHosts();
      delete store.disposeOldHosts;
    }
  }
