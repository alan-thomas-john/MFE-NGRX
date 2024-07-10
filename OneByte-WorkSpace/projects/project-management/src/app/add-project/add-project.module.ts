import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddProjectComponent } from './add-project.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProjectEffects } from '../state/project.effects';
import { projectReducer } from '../state/project.reducer';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('project', projectReducer),
    EffectsModule.forFeature([ProjectEffects]),
  //   RouterModule.forChild([
  //     {
  //       path:'',
  //       component:AddProjectComponent
  //     }
  //   ]),
   ]
})
export class AddProjectModule { }
