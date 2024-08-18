import { Control, Controller, FieldValues } from "react-hook-form";
import { FileField, SelectField } from "./input";

interface SelectFieldControllerProps {
  control: Control<any, any>;
  options: { label: string; value: string }[];
  label: string;
  name: string;
}

export function SelectFieldController({
  control,
  options,
  label,
  name,
}: SelectFieldControllerProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <SelectField
          label={label}
          name={name}
          handleChange={(selectedOption) => {
            field.onChange(selectedOption?.value);
          }}
          required
          value={options.find((option) => option.value === field.value)}
          options={options}
          errorMessage={fieldState.error?.message}
        />
      )}
    />
  );
}
