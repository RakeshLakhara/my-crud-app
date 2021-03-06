import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Category } from '../category';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  categories: Category[] = [];
  name = '';
  page = 1;
  count = 0;
  pageSize = 5;

  constructor(public categoryService: CategoryService) {}

  ngOnInit(): void {
    this.retrieveCategories();
  }

  getRequestParams(searchName, page, pageSize): any {
    let params = {};

    if (searchName) {
      params[`productName`] = searchName;
    }
    if (page) {
      params[`page`] = page - 1;
    }
    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveCategories(): void {
    const params = this.getRequestParams(this.name, this.page, this.pageSize);

    this.categoryService.getAll(params)
    .subscribe(
      response => {
        const { categories, totalItems } = response;
        this.categories = categories;
        this.count = totalItems;
        console.log(response);
      },
      error => {
        console.log(error);
    });
  }

  handlePageChange(event): void {
    this.page = event;
    this.retrieveCategories();
  }

  refreshList(): void {
    this.retrieveCategories();
  }

  deleteCategory(id) {
    this.categoryService.delete(id).subscribe((res) => {
      this.categories = this.categories.filter((item) => item.id !== id);
      console.log('Category deleted successfully!');
    });
  }
}
