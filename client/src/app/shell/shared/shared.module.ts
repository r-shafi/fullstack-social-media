import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PostComponent } from './post/post.component';
import { SharedRoutingModule } from './shared-routing.module';

@NgModule({
  declarations: [PostComponent],
  imports: [CommonModule, SharedRoutingModule, MatButtonModule, MatIconModule],
  exports: [PostComponent],
})
export class SharedModule {}
