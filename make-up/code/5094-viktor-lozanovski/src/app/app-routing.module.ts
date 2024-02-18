import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { AboutComponent } from './about/about.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  { path: 'recipes', component: RecipeListComponent },
  { path: 'about', component: AboutComponent},
  { path: 'recipes/edit/:id', component: RecipeEditComponent }, // Route for edit page with recipe ID parameter
  { path: 'recipes/view/:id', component: RecipeDetailsComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: '', redirectTo: '/recipes', pathMatch: 'full' } , // Corrected path
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
