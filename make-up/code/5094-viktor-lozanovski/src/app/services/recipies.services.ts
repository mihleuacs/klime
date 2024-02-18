import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"; 
import {Recipe} from '../models/recipe';
import { Observable, map} from 'rxjs';



const BASE_URL = 'http://localhost:3000/';

@Injectable({
providedIn: 'root'
})
export class RecipeService {
    apiUrl:any;

    constructor(private http:HttpClient) {}
getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${BASE_URL}recipes`);

}
getRecipe(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${BASE_URL}recipes/${id}`);
  }
getCuisines(): Observable<string[]> {
    return this.http.get<string[]>(`${BASE_URL}cuisines`);
  }
updateBand(recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`${BASE_URL}/bands/${recipe.id}`, recipe);
}
deleteRecipe(RecipeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/recipes/${RecipeId}`);
  }
  saveRecipe(recipe: Recipe): Observable<Recipe> {
    if (recipe.id) {
      return this.http.put<Recipe>(`${BASE_URL}recipes/${recipe.id}`, recipe);
    } else {
      return this.http.post<Recipe>(`${BASE_URL}recipes`, recipe);
    }
  }
  updateRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`${BASE_URL}recipes/${recipe.id}`, recipe);
  }
  getIngredients(): Observable<string[]> {
    // Assuming the API endpoint for ingredients is '/api/ingredients'
    return this.http.get<string[]>('/api/ingredients');
  }
}