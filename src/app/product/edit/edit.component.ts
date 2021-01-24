import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  id: number;
  product: Product;
  form: FormGroup;
  message = '';

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.message = '';
    this.id = this.route.snapshot.params['Id'];
    this.productService.find(this.id).subscribe((data: Product) => {
      this.product = data;
    });

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      categoryId: new FormControl('', Validators.required)
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.productService.update(this.id, this.form.value).subscribe(
      (res) => {
        console.log('Product updated successfully!');
        this.message = res.message;
        this.router.navigateByUrl('product/index');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
