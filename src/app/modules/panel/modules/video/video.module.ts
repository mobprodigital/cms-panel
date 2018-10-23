import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewVideoComponent } from './components/add-new-video/add-new-video.component';
import { ViewAllVideosComponent } from './components/view-all-videos/view-all-videos.component';
import { AddNewVideoCategoryComponent } from './components/add-new-video-category/add-new-video-category.component';
import { ViewAllVideoCategoriesComponent } from './components/view-all-video-categories/view-all-video-categories.component';
import { VideoRoutingModule } from './video-routing/video-routing.module';
import { MatButtonModule, MatCardModule, MatRadioModule, MatInputModule, MatSelectModule, MatIconModule, MatProgressBarModule, MatPaginatorModule, MatSortModule, MatTableModule, MatTooltipModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    VideoRoutingModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    HttpClientModule
  ],
  declarations: [
    AddNewVideoComponent,
    ViewAllVideosComponent,
    AddNewVideoCategoryComponent,
    ViewAllVideoCategoriesComponent,
  ],
  exports: [VideoRoutingModule, HttpClientModule]
})
export class VideoModule { }
