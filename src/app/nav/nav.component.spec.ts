import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from "@angular/core/testing";

import { NavComponent } from "./nav.component";
import { RouterTestingModule } from "@angular/router/testing";
import { Router, Routes } from "@angular/router";
import { Location } from "@angular/common";
import { HomeComponent } from "../home/home.component";
import { AboutComponent } from "../about/about.component";
import { ProductsComponent } from "../products/products.component";
import { FormsModule } from "@angular/forms";
import { SearchProducts } from "../pipes/search-products.pipe";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "products", component: ProductsComponent },
  { path: "about", component: AboutComponent }
];

describe("NavComponent", () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), FormsModule],
      declarations: [
        NavComponent,
        HomeComponent,
        AboutComponent,
        ProductsComponent,
        SearchProducts
      ]
    }).compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(NavComponent);
    router.initialNavigation();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should navigate to products", fakeAsync(() => {
    router.navigate(["products"]).then(() => {
      expect(location.path()).toBe("/products");
      tick(50);
    });
  }));

  it("should navigate to about", fakeAsync(() => {
    router.navigate(["about"]).then(() => {
      expect(location.path()).toBe("/about");
      tick(50);
    });
  }));

  afterEach(() => {
    fixture.destroy();
    component = null;
  });
});
