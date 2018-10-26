import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewTextComponent } from './component/add-new-text/add-new-text.component';
import { AllTextComponent } from './component/all-text/all-text.component';
import { AddTextCategoryComponent } from './component/add-text-category/add-text-category.component';
import { AllTextCategoriesComponent } from './component/all-text-categories/all-text-categories.component';
import { TextRoutingRoutingModule } from './text-routing/text-routing-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AjaxService } from 'src/app/services/ajax/ajax.service';
import { MatButtonModule, MatRadioModule, MatCardModule, MatInputModule, MatSelectModule, MatIconModule, MatProgressBarModule, MatPaginatorModule, MatTooltipModule, MatSortModule, MatTableModule, MatChipsModule, MatAutocompleteModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { PortalService } from 'src/app/services/portal/portal.service';

@NgModule({
  imports: [
    TextRoutingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatChipsModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    HttpClientModule
  ],
  providers: [AjaxService, PortalService],
  declarations: [AddNewTextComponent, AllTextComponent, AddTextCategoryComponent, AllTextCategoriesComponent],
  exports: [TextRoutingRoutingModule]
})
export class TextModule { }
