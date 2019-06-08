import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HomeComponent } from "./home.component";
import { RouterTestingModule } from "@angular/router/testing";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HomeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create home component", () => {
    expect(component).toBeTruthy();
  });

//   // TODO: WIP
//   it('should navigate to /products route', () => {
//       let spy = spyOn(component,"onGoToProducts")
//       expect(spy).toHaveBeenCalled()
//   })

});
