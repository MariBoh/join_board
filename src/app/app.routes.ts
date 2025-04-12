import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LegalNoticeComponent } from './legal/legal-notice/legal-notice.component';
import { PrivacyPolicyComponent } from './legal/privacy-policy/privacy-policy.component';

export const routes: Routes = [

    { path: '', component: HomeComponent},
    { path: 'legal-notice', component: LegalNoticeComponent},
    { path: 'privacy-policy', component: PrivacyPolicyComponent},

];
