import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { EspfSampleApplicationSharedModule } from 'app/shared/shared.module';
import { EspfSampleApplicationCoreModule } from 'app/core/core.module';
import { EspfSampleApplicationAppRoutingModule } from './app-routing.module';
import { EspfSampleApplicationHomeModule } from './home/home.module';
import { EspfSampleApplicationEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    EspfSampleApplicationSharedModule,
    EspfSampleApplicationCoreModule,
    EspfSampleApplicationHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    EspfSampleApplicationEntityModule,
    EspfSampleApplicationAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent]
})
export class EspfSampleApplicationAppModule {}
