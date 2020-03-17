import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { TestCmpComponent } from './test/test-cmp/test-cmp.component';
import { TestDirDirective } from './test/test-dir.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { TestDirComponent } from './test/test-dir/test-dir.component';
import { TestProvComponent } from './test/test-prov/test-prov.component';
import { EmptyComponent } from './test/empty/empty.component';

@NgModule({
  declarations: [
    AppComponent,
    TestCmpComponent,
    TestDirDirective,
    TestDirComponent,
    TestProvComponent,
    EmptyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
