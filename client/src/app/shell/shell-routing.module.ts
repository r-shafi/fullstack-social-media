import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full',
      },
      {
        path: 'feed',
        loadChildren: () =>
          import('./pages/feed/feed.module').then((m) => m.FeedModule),
      },
      {
        path: 'public',
        loadChildren: () =>
          import('./pages/feed/feed.module').then((m) => m.FeedModule),
      },
      {
        path: 'people',
        loadChildren: () =>
          import('./pages/people/people.module').then((m) => m.PeopleModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./pages/profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'user/:id',
        loadChildren: () =>
          import('./pages/profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'search',
        loadChildren: () =>
          import('./pages/search/search.module').then((m) => m.SearchModule),
      },
      {
        path: 'post/:id',
        loadChildren: () =>
          import('./pages/post/post.module').then((m) => m.PostModule),
      },
      {
        path: '**',
        loadChildren: () =>
          import('./pages/not-found/not-found.module').then(
            (m) => m.NotFoundModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShellRoutingModule {}
