import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {RouterModule, Routes} from "@angular/router";
import { ChercherComponent } from './chercher/chercher.component';
import { NouveauComponent } from './nouveau/nouveau.component';
import {ProduitService} from "./produit.service";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import { ModifierComponent } from './modifier/modifier.component';
import { TestComponent } from './test/test.component';
import {TestService} from "./test.service";
import {HttpClientModule} from "@angular/common/http";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'chercher/modifier/:id', redirectTo: 'modifier/:id', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'chercher', component: ChercherComponent },
  { path: 'nouveau', component: NouveauComponent },
  { path: 'test', component: TestComponent },
  { path: 'modifier/:id', component: ModifierComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChercherComponent,
    NouveauComponent,
    ModifierComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [ProduitService, TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
