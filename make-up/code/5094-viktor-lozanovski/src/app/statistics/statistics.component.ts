import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipies.services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  totalRecipes: number = 0;
  totalCuisines: number = 0;
  totalIngredients: number = 0;
  // Define additional properties for bonus statistics if needed

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.getTotalRecipes();
    this.getTotalCuisines();
    this.getTotalIngredients();
    // Call additional methods to retrieve bonus statistics if needed
  }

  getTotalRecipes(): void {
    // Call the appropriate service method to get the total number of recipes
    this.recipeService.getRecipes().subscribe(recipes => {
      this.totalRecipes = recipes.length;
    });
  }

  getTotalCuisines(): void {
    // Call the appropriate service method to get the total number of cuisines
    this.recipeService.getCuisines().subscribe(cuisines => {
      this.totalCuisines = cuisines.length;
    });
  }

  getTotalIngredients(): void {
    // Call the appropriate service method to get the total number of ingredients
    this.recipeService.getIngredients().subscribe(ingredients => {
      this.totalIngredients = ingredients.length;
    });
  }

  // Implement additional methods to retrieve bonus statistics if needed
}
