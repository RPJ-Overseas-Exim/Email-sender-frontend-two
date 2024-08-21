"use server";

import { revalidatePath } from "next/cache";

const revalPath = (path: string) => {
  revalidatePath(path);
};
export default revalPath;
