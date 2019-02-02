import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColorDemoComponent } from './color-picker/color-demo.component';
import { ModalDemoComponent } from './modal-demo/modal-demo.component';

/**
 * Route to the navigation
 */
const routes: Routes = [
  { path: 'modal', component: ModalDemoComponent },
  { path: 'color', component: ColorDemoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }