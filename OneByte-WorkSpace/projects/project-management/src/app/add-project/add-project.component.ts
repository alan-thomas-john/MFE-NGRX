import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Project } from '../state/project.model';
import { ProjectState } from '../state/project.reducer';
import { addProject } from '../state/project.actions';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit{
  projectForm!: FormGroup;
  openDialog: boolean = false;

  constructor(private fb: FormBuilder,private store: Store<ProjectState>) { }

  ngOnInit() {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      duration: ['', [Validators.required]],
    });
 }

  onSubmit() {
    if (this.projectForm.valid) {
      this.openDialog = true;
    }
    else {
      alert("form not valid");
    }
  }

  onDialogConfirmed() {
    if (this.projectForm.valid)
    {
      const newProject: Project = this.projectForm.value;
      console.log('Dispatching addProject action with: ', newProject);
      this.store.dispatch(addProject({ project: newProject }));
      this.openDialog = false
      this.projectForm.reset();
      alert("registertion succesfull");
    }
  }

  onDialogCancelled() {
    this.openDialog = false
    alert("something went wrong");
  }

}
