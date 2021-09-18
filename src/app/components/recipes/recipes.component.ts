import { Component, OnInit } from '@angular/core';
import { Recipe, RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    //TODO get ingredients in search
    this.recipeService.getRecipes('tomato').subscribe(recipes => this.recipes = recipes);
  }

}
