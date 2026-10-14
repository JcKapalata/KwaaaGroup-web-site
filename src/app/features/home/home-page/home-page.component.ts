import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroSectionComponent } from '../hero-section/hero-section.component';
import { StatsBandComponent } from '../stats-band/stats-band.component';
import { NameSectionComponent } from '../name-section/name-section.component';
import { BranchesSectionComponent } from '../branches-section/branches-section.component';
import { ImpactSectionComponent } from '../impact-section/impact-section.component';
import { CircularitySectionComponent } from '../circularity-section/circularity-section.component';
import { ValuesSectionComponent } from '../values-section/values-section.component';
import { PartnersSectionComponent } from '../partners-section/partners-section.component';
import { CareersSectionComponent } from '../careers-section/careers-section.component';
import { ContactSectionComponent } from '../contact-section/contact-section.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeroSectionComponent,
    StatsBandComponent,
    NameSectionComponent,
    BranchesSectionComponent,
    ImpactSectionComponent,
    CircularitySectionComponent,
    ValuesSectionComponent,
    PartnersSectionComponent,
    CareersSectionComponent,
    ContactSectionComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {}
