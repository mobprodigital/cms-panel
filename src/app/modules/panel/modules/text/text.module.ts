import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewTextComponent } from './component/add-new-text/add-new-text.component';
import { AllTextComponent } from './component/all-text/all-text.component';
import { AddTextCategoryComponent } from './component/add-text-category/add-text-category.component';
import { AllTextCategoriesComponent } from './component/all-text-categories/all-text-categories.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AddNewTextComponent, AllTextComponent, AddTextCategoryComponent, AllTextCategoriesComponent]
})
export class TextModule { }
