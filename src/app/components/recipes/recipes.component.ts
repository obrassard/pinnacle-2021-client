import { Component, OnInit } from '@angular/core';
import { Inventory, InventoryService, InventoryItem, InventoryDetails } from 'src/app/services/inventory.service';
import { Recipe, RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  recipes: Recipe[] = [];
  inventories: Inventory[] = [];
  selectedInventory: string = "all";
  items: InventoryItem[] = [];
  searchString: string = "";
  
  private uncheckedItems: string[] = [];

  constructor(private recipeService: RecipeService,
              private inventoryService: InventoryService) { }

  ngOnInit(): void {
    //TODO get ingredients in search
    this.inventoryService.getUsersInventories().subscribe(v => {
      this.inventories = v;
      // this.selectedInventory = this.inventories[0] ? this.inventories[0].id : "";
      this.onInventoryChange(this.selectedInventory)
    });
    // this.recipeService.getRecipes('tomato').subscribe(recipes => this.recipes = recipes);
  }

  onInventoryChange(event: string) {
    console.log(event);
    if (event == "all") {
      this.items = [];
      const promises: Promise<void | InventoryDetails>[] = [];
      this.inventories.forEach(invent => {
        promises.push(this.inventoryService.getInventoryDetails(invent.id).toPromise().then(inv => {
          this.items = this.items.concat(inv.items);
        }));
      });

      Promise.all(promises).then(() => {
        this.searchString = this.items.map(item => item.title).join(" ");
        this.searchForRecipes();
      });

    } else {
      this.inventoryService.getInventoryDetails(event).subscribe(inv => {
        this.items = inv.items;
        this.searchString = this.items.map(item => item.title).join(" ");
        this.searchForRecipes();
      });
    }
  }

  onCheckboxClick(itemId: string, event: any) {

    const index = this.uncheckedItems.indexOf(itemId);
    if (index > -1) {
      this.uncheckedItems.splice(index, 1);
    }

    if (event.target.checked) {
      this.uncheckedItems.push(itemId);
    }

    this.searchString = this.items.map(item => this.uncheckedItems.includes(item.itemId) ? item.title : "").join(" ");
    this.searchForRecipes();
  }

  searchForRecipes(): void {
    this.recipeService.getRecipes(this.searchString).subscribe(recipes => {
      this.recipes = recipes;
      console.log("Recipes", recipes)
    });
  }
}
