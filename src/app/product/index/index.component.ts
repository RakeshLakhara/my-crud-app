import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  products: Product[] = [];
  name = '';
  page = 1;
  count = 0;
  pageSize = 5;

  constructor(public productService: ProductService) {}

  ngOnInit(): void {
    this.retrieveProducts();
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

  retrieveProducts(): void {
    const params = this.getRequestParams(this.name, this.page, this.pageSize);

    this.productService.getAll(params)
    .subscribe(
      response => {
        const { products, totalItems } = response;
        this.products = products;
        this.count = totalItems;
        console.log(response);
      },
      error => {
        console.log(error);
    });
  }

  handlePageChange(event): void {
    this.page = event;
    this.retrieveProducts();
  }

  refreshList(): void {
    this.retrieveProducts();
  }

  deleteProduct(id) {
    this.productService.delete(id).subscribe((res) => {
      this.products = this.products.filter((item) => item.id !== id);
      console.log('Product deleted successfully!');
    });
  }

}
