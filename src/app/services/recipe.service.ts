import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService extends HttpService {

  constructor(http: HttpClient, private router: Router) {
    super(http, "recipes");
  }

  getRecipes(ingredients: string): Observable<Recipe[]> {
    return this.get<Recipe[]>('', {
      params: {
        ingredients
      }
    });
  }
}

export interface Recipe {
  label: string,
  image: string
}
