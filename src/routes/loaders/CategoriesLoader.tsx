import { actGetCategories } from "@store/categories/categoriesSlice";
import store from "@store/index";

export const CategoriesLoader = async () => {
  const state = store.getState();
  const categories = state.categories.records;

  if (categories.length === 0) {
    console.log("fetch for the first time")
    await store.dispatch(actGetCategories());
}
return null;
};
