import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../category.service';
import {Category } from '../category';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

categories: Category[] = [];

  constructor(public categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((data: Category[])=>{
      this.categories = data;
      console.log(this.categories);
    })
  }

  deleteCategory(id){
    this.categoryService.delete(id).subscribe(res => {
         this.categories = this.categories.filter(item => id !== id);
         console.log('Category deleted successfully!');
    })
  }

}
