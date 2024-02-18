import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipies.services';
import { Observable } from 'rxjs'; 

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe | undefined;
  cuisines: Observable<string[]> | undefined; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.getRecipeDetails();
    this.getCuisines(); 
  }

  getRecipeDetails(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); 

    if (!isNaN(id)) { 
      this.recipeService.getRecipe(id).subscribe((recipe) => { 
        this.recipe = recipe;
      });
    }
  }

  getCuisines(): void {
    this.cuisines = this.recipeService.getCuisines(); 
  }

  saveRecipe(): void {
    if (this.recipe) {
      this.recipeService.saveRecipe(this.recipe).subscribe(() => {
        this.router.navigate(['/recipe-details', this.recipe!.id]);
      });
    }
  }
}

