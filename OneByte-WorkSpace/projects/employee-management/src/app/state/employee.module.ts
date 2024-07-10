import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { employeeReducer } from "./employee.reducer";
import { EffectsModule, EffectsRootModule } from "@ngrx/effects";
import { EmployeeEffects } from "./employee.effects";

@NgModule({

  imports:[
    // StoreModule.forFeature('employees',employeeReducer),
    // EffectsModule.forRoot([EmployeeEffects])
  ],

}
)


export class EmployeeModule{}
