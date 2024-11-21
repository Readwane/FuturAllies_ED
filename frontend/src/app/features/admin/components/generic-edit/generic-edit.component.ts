import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-generic-edit',
  templateUrl: './generic-edit.component.html',
  styleUrls: ['./generic-edit.component.css']
})
export class GenericEditComponent implements OnInit {
  @Input() fieldsConfig: {
    name: string;
    label: string;
    type: string;
    required?: boolean;
    options?: { value: any; label: string }[];
    placeholder?: string;
    multiple?: boolean;
    readonly?: boolean;
  }[] = [];

  @Input() resourceData: Record<string, any> = {};
  @Input() submitButtonLabel: string = 'Modifier';
  @Output() onSubmit = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    const formControls: any = {};

    this.fieldsConfig.forEach(field => {
      formControls[field.name] = [
        this.resourceData[field.name] || '',
        field.required ? [Validators.required] : []
      ];

      if (field.type === 'email') {
        formControls[field.name][1].push(Validators.email);
      }

      if (field.type === 'password') {
        formControls[field.name][1].push(Validators.minLength(6));
      }
    });

    this.form = this.fb.group(formControls);
  }

  handleSubmit(): void {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  handleCancel(): void {
    this.onCancel.emit();
  }

  handleFileInput(event: Event, fieldName: string): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement?.files) {
      this.form.get(fieldName)?.setValue(inputElement.files);
    }
  }
}
