import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipies.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  sortedColumn: string = '';
  ascending: boolean = true;
  filterValue: { title: string, cuisine: string, ingredient: string } = { title: '', cuisine: '', ingredient: '' };
  cuisines: string[] = [];
  ingredients: string[] = [];

  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.getRecipes();
     
  }

  getRecipes(): void {
    this.recipeService.getRecipes().subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }
  
  

  

  sortBy(column: keyof Recipe): void {
    if (this.sortedColumn === column) {
      this.ascending = !this.ascending;
    } else {
      this.sortedColumn = column;
      this.ascending = true;
    }
  
    this.recipes.sort((a, b) => {
      const aValue = this.getValue(a[column]);
      const bValue = this.getValue(b[column]);
      
      if (column === 'id' || column === 'time') {
        return this.ascending ? aValue - bValue : bValue - aValue;
      } else if (column === 'ingredients') {
        const firstA = aValue.ingredients[0].name.toLowerCase();
        const firstB = bValue.ingredients[0].name.toLowerCase();
        return this.ascending ? firstA.localeCompare(firstB) : firstB.localeCompare(firstA);
      } else {
        return this.ascending ? (aValue as string).localeCompare(bValue as string) : (bValue as string).localeCompare(aValue as string);
      }
    });
  }
  
  
  getValue(value: any): any {
    if (typeof value === 'string') {
      return value.toLowerCase();
    } else {
      return value;
    }
  }
  
  
  
  displayTime(time: number): string {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    if (hours === 0) {
      return '${minutes} minutes';
    } else {
      return '${hours} hours ${minutes} minutes';
    }
  }
  filterRecipes(): void {

    let filteredRecipes = [...this.recipes];

    if (this.filterValue.title.trim() !== '') {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.title.toLowerCase().includes(this.filterValue.title.toLowerCase()));
    }

    if (this.filterValue.cuisine !== '') {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.cuisine === this.filterValue.cuisine);
    }

    if (this.filterValue.ingredient !== '') {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.ingredients.some(ingredient => ingredient.name === this.filterValue.ingredient));
    }

    this.recipes = filteredRecipes;
    if (this.filterValue.title.trim() === '') {
      this.getRecipes();
    }
  }
  

  editRecipe(recipe: Recipe): void {
    this.router.navigate(['recipes/edit/', recipe.id]);
  }
  viewRecipeDetails(recipe: Recipe): void {
    this.router.navigate(['recipes/view/', recipe.id]); 
  }
  deleteRecipe(recipe: Recipe): void {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.recipeService.deleteRecipe(recipe.id).subscribe(() => {
        this.getRecipes(); // Refresh recipes after deletion
      });
    }
  }
}
