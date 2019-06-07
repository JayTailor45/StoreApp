import { TestBed, ComponentFixture, async, fakeAsync, tick } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';

import { HttpModule } from "@angular/http";

import { ProductsComponent } from "./products.component";
import { ProductsService } from "../services/products.service";
import { FormsModule } from "@angular/forms";
import { SearchProducts } from "../pipes/search-products.pipe";
import { Product } from "../models/product";
import { inject } from "@angular/core/src/render3";

const data = [
  {
    name: "Test",
    description: "test",
    price: 15,
    isAvailable: false,
    id: 1
  },
  {
    name: "AAAAA",
    description: "DDDDD",
    price: 80,
    isAvailable: false,
    id: 2
  }
];

const mockProducts: Product[] = JSON.parse(JSON.stringify(data));

describe("ProductsComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, HttpModule],
      declarations: [ProductsComponent, SearchProducts],
      providers: [{ provide: ProductsService }]
    }).compileComponents();
  }));

  it("Should create the app", () => {
    let fixture: ComponentFixture<ProductsComponent> = TestBed.createComponent(
      ProductsComponent
    );
    let component = fixture.componentInstance;
    
    expect(component).toBeTruthy();
  });

  it("Should fetch data successfully from service", fakeAsync(() => {
    let fixture = TestBed.createComponent(ProductsComponent);
    let app = fixture.debugElement.componentInstance;
    let service = fixture.debugElement.injector.get(ProductsService);


    spyOn(service, "getProducts").and.returnValue(mockProducts);
    fixture.detectChanges();
    tick();
    fixture.whenStable().then(() => {
      expect(app.products).toEqual(mockProducts);
    });
  }));
});
