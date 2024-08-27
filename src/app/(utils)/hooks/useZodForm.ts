import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps, UseFormReturn } from "react-hook-form";
import { z, ZodType } from "zod";

type UseZodFormProps<T extends ZodType<any, any>> = Omit<
  UseFormProps<z.infer<T>>,
  "resolver"
> & {
  schema: T;
};

export function useZodForm<T extends ZodType<any, any>>({
  schema,
  ...formConfig
}: UseZodFormProps<T>): UseFormReturn<z.infer<T>> {
  return useForm<z.infer<T>>({
    ...formConfig,
    resolver: zodResolver(schema),
  });
}
