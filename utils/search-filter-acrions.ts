import { redirect } from "next/navigation";

export const applySearchFilters = (formData: FormData) => {
  const search = formData.get("search")?.toString().trim() || "";
  const category = formData.get("category")?.toString() || "all";

  const params = new URLSearchParams();

  if (search) {
    params.set("search", search);
  }

  if (category && category !== "all") {
    params.set("category", category);
  }

  redirect(`/search?${params.toString()}`);
};
