import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewTextComponent } from '../component/add-new-text/add-new-text.component';
import { AllTextComponent } from '../component/all-text/all-text.component';
import { AddTextCategoryComponent } from '../component/add-text-category/add-text-category.component';
import { AllTextCategoriesComponent } from '../component/all-text-categories/all-text-categories.component';

const textRoutes: Routes = [
  {
    path: 'add-text',
    component: AddNewTextComponent
  },
  {
    path: 'edit-text/:id',
    component: AddNewTextComponent
  },
  {
    path: 'all-texts',
    component: AllTextComponent
  },
  {
    path: 'add-text-category',
    component: AddTextCategoryComponent
  },
  {
    path: 'edit-text-category/:id',
    component: AddTextCategoryComponent
  },
  {
    path: 'all-text-categories',
    component: AllTextCategoriesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(textRoutes)],
  exports: [RouterModule]
})
export class TextRoutingRoutingModule { }
