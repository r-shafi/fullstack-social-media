import { Component, NgModule } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PostDataService } from 'src/app/services/post-data.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
  constructor(
    private postData: PostDataService,
    private dialogRef: MatDialogRef<any>,
    private snackbar: SnackbarService
  ) {}

  form = new FormGroup({
    body: new FormControl('', [
      Validators.required,
      Validators.maxLength(1000),
    ]),
    privacy: new FormControl('public', [Validators.required]),
  });

  createPost() {
    this.postData.createPost(this.form.value).subscribe(() => {
      this.snackbar.openSnackbar('Post Created Successfully!');
      this.dialogRef.close();
    });
  }
}

@NgModule({
  declarations: [CreatePostComponent],
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
})
export class CreatePostModule {}
