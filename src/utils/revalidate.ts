import { revalidatePath as nextRevalidatePath } from "next/cache";

export function revalidatePath(...paths: string[]) {
  paths.forEach((path) => nextRevalidatePath(path));
}
