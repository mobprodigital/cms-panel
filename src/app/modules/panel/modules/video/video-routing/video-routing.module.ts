import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewVideoComponent } from '../components/add-new-video/add-new-video.component';
import { ViewAllVideosComponent } from '../components/view-all-videos/view-all-videos.component';
import { AddNewVideoCategoryComponent } from '../components/add-new-video-category/add-new-video-category.component';
import { ViewAllVideoCategoriesComponent } from '../components/view-all-video-categories/view-all-video-categories.component';

const videoRoutes: Routes = [
  {
    path: 'add-new-video',
    component: AddNewVideoComponent
  },
  {
    path: 'view-all-videos',
    component: ViewAllVideosComponent
  },
  {
    path: 'add-new-video-category',
    component: AddNewVideoCategoryComponent
  },
  {
    path: 'view-all-video-categories',
    component: ViewAllVideoCategoriesComponent
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(videoRoutes)
  ],
  exports: [RouterModule]
})
export class VideoRoutingModule { }
