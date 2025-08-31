import { Component } from '@angular/core';
import { InventoryService } from '../../../core/services/inventory.service';
import { Item } from '../../../shared/models/item.interface';
import { FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-Inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent {

  items: Item[] = [];
  selectedItem?: Item;
  itemForm: any = FormGroup;
  isEditing: boolean = false;

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  // Load all items
  loadItems() {
  this.inventoryService.getItems().subscribe({
    next: (response) => {
      this.items = response;
      console.log('Received items:', response);
    },
    error: (err) => {
      console.error('Error fetching items:', err);
    }
  });
}



  // Select an item to view details
  selectItem(item: Item) {
    this.selectedItem = item;
    this.isEditing = true;
    this.itemForm.patchValue(item);
  }

  // Clear selection / form
  clearSelection() {
    this.selectedItem = undefined;
    this.isEditing = false;
    this.itemForm.reset({ id: 0, quantity: 0 });
  }

  // Add or Update item
  saveItem() {
    const item: Item = this.itemForm.value;
    if (this.isEditing) {
      this.inventoryService.updateItem(item.id, item).subscribe(
        () => {
          this.loadItems();
          this.clearSelection();
        },
        err => console.error(err)
      );
    } else {
      this.inventoryService.addItem(item).subscribe(
        () => {
          this.loadItems();
          this.clearSelection();
        },
        err => console.error(err)
      );
    }
  }

  // Delete item
  deleteItem(id: number) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.inventoryService.deleteItem(id).subscribe(
        () => this.loadItems(),
        err => console.error(err)
      );
    }
  }



}
