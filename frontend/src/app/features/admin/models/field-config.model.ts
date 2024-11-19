interface FieldConfig {
    name: string;
    type: string;
    label: string;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    options?: { value: string; label: string }[];
  }
  