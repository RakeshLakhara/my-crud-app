import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../category';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

id:number;
category: Category;
form: FormGroup;
message = '';

  constructor(
    public categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.message = '';
    this.id = this.route.snapshot.params['Id'];
    this.categoryService.find(this.id).subscribe((data: Category)=>{
      this.category = data;
    });
    
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required])
    });
  }

  get f(){
    return this.form.controls;
  }
     
  submit(){
    console.log(this.form.value);
    this.categoryService.update(this.id, this.form.value).subscribe(res => {
         console.log('Category updated successfully!');
         this.message = res.message;
         this.router.navigateByUrl('category/index');
    },
    error => {
      console.log(error);
    }
    )
  }

}
