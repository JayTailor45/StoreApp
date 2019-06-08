import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from "@angular/core/testing";

import { ProductsComponent } from "./products.component";
import { FormsModule } from "@angular/forms";
import { SearchProducts } from "../pipes/search-products.pipe";
import { RouterTestingModule } from "@angular/router/testing";
import { ProductsService } from "../services/products.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Routes, Router } from "@angular/router";
import { ProductFormComponent } from "../product-form/product-form.component";
import { ProductDetailComponent } from "../product-detail/product-detail.component";
import { Location } from "@angular/common";
import { Product } from "../models/product";

const routes: Routes = [
  { path: "products", component: ProductsComponent },
  { path: "products/new", component: ProductFormComponent },
  { path: "products/:id", component: ProductDetailComponent },
  { path: "products/:id/edit", component: ProductFormComponent }
];

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
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [
        ProductsComponent,
        SearchProducts,
        ProductFormComponent,
        ProductDetailComponent
      ],
      providers: [ProductsService]
    }).compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(ProductsComponent);
    router.initialNavigation();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create Product Component", () => {
    expect(component).toBeTruthy();
  });

  it("should route to product/new", fakeAsync(() => {
    router.navigate(["products/new"]).then(() => {
      expect(location.path()).toBe("/products/new");
      tick(50);
    });
  }));

  it("should route to product/1/edit", fakeAsync(() => {
    router.navigate(["products/1/edit"]).then(() => {
      expect(location.path()).toBe("/products/1/edit");
      tick(50);
    });
  }));

  it("Should fetch data successfully from service", fakeAsync(() => {
    let app = fixture.debugElement.componentInstance;
    let service = fixture.debugElement.injector.get(ProductsService);

    spyOn(service, "getProducts").and.returnValue(mockProducts);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(app.products).toBe(mockProducts);
    });
  }));
});
