export const formatArticleCategory = (category: string | undefined) => {
  return category ? category.replace(/-/g, " ").toUpperCase() : "General";
};

export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};
