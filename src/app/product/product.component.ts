import {Component, OnInit} from '@angular/core';
import {ProductService} from "../service/product.service";
import {Product} from "../model/product";
import {Category} from "../model/category";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  idUpdate !: any | undefined
  products: Product[] = []
  categories: Category[] = []
  category?: number
  formCreate!: FormGroup
  productUpdate!: Product
  formUpdate!: FormGroup;
  nameDetail: string | undefined
  priceDetail : number | undefined
  amountDetail: number | undefined
  categoryDetail: string | undefined
  constructor(private productService: ProductService,
              private fromGroup: FormBuilder) {
  }

  ngOnInit(): void {
    this.formCreate = this.fromGroup.group({
      name: [""],
      price: [""],
      amount: [""],
    })

    this.formUpdate = this.fromGroup.group({
      name: [""],
      price: [""],
      amount: [""],
    })
    this.displayProduct()
  }

  displayProduct(){
    this.productService.findAll().subscribe(data => {
      this.products = data
    })

    this.productService.findAllCategory().subscribe(data => {
      this.categories = data
    })
  }

  createProduct() {
    let product = {
      name: this.formCreate.value.name,
      price: this.formCreate.value.price,
      amount: this.formCreate.value.amount,
      category: {
        id: this.formCreate.value.category
      }
    }
    this.productService.create(product).subscribe(() => {
      this.ngOnInit()
    })

  }

  update(id?: number) {
    // console.log(id)
    this.idUpdate = id
    this.productService.findOne(id).subscribe(data => {
      this.category = data.category?.id
      // console.log(data.name)
      this.productUpdate = data
      // console.log(this.idUpdate)
      this.formUpdate.patchValue(this.productUpdate)
      // @ts-ignore
      document.getElementById("categories").value = data.category?.id
    })
  }

  setFormUpdate(data?: Product){
    // @ts-ignore
  document.getElementById("name").value = data?.name
    // @ts-ignore
  document.getElementById("price").value = data?.price
    // @ts-ignore
  document.getElementById("amount").value = data?.amount
    // @ts-ignore
    document.getElementById("categories").value = this.category
  }
  updateProduct() {
    let product = {
      name: this.formUpdate.value.name,
      price: this.formUpdate.value.price,
      amount: this.formUpdate.value.amount,
      category: {
        id: this.category
      }
    }
    this.productService.update(this.idUpdate, product).subscribe(value => {
      this.displayProduct()
      // @ts-ignore
      this.setFormUpdate(value)
    })
  }

  delete(id?: number) {
    this.idUpdate = id
    this.productService.delete(id).subscribe(() => {
      this.ngOnInit()
    })
  }

  detail(id?: number) {
    this.idUpdate = id
    this.productService.findOne(id).subscribe(data => {
      this.amountDetail = data.amount
      this.priceDetail = data.price
      this.nameDetail = data.name
      this.categoryDetail = data.category?.name
    })
    // @ts-ignore
    document.getElementById("detail").hidden = false
  }

  closeDetail(){
    // @ts-ignore
    document.getElementById("detail").hidden = true
  }
}
