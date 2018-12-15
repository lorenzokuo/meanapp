import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';
import { ReviewComponent } from './review/review.component';
import { EditComponent } from './edit/edit.component';
import { WriteComponent } from './write/write.component';

import { FormsModule } from '@angular/forms';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'new', component: NewComponent},
  {path: 'reviews/:id', component: ReviewComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: 'write/:id', component: WriteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
