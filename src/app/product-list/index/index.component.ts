import { Component, OnInit } from '@angular/core';
import { ProductListService } from '../product-list.service';
import { ProductList } from '../product-list';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  productLists: ProductList[] =[];
  name = '';
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5,10,15];

  constructor(public productListService: ProductListService) {}

  ngOnInit(): void {
    this.retrieveProductLists();
  }

  getRequestParams(searchName, page, pageSize): any {
    let params = {};

    if (searchName) {
      params[`name`] = searchName;
    }
    if (page) {
      params[`page`] = page - 1;
    }
    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveProductLists(): void {
    const params = this.getRequestParams(this.name, this.page, this.pageSize);

    this.productListService.getAll(params)
    .subscribe(
      response => {
        const { productLists, totalItems } = response;
        this.productLists = productLists;
        this.count = totalItems;
        console.log(response);
      },
      error => {
        console.log(error);
    });
  }

  handlePageChange(event): void {
    this.page = event;
    this.retrieveProductLists();
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveProductLists();
  }

  refreshList(): void {
    this.retrieveProductLists();
  }

  searchName(): void {
    const params = this.getRequestParams(this.name,this.page,this.pageSize);
    
    this.productListService.getAll(params)
      .subscribe(
        response => {
          const { productLists, totalItems } = response;
          this.productLists = productLists;
          this.count = totalItems;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

}
