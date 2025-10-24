import { test as baseTest } from '@playwright/test';
import { HeaderComponent } from '../../components/headerComponent';
import { ListProductsComponent } from '../../components/listProductsComponent';
import { CartComponent } from '../../components/cartComponent';
import { ProductCardComponent } from '../../components/productСardComponent';

export const test = baseTest.extend({
  headerComponent: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },
  listProductComponent: async ({ page }, use) => {
    await use(new ListProductsComponent(page));
  },
  cartComponent: async ({ page }, use) => {
    await use(new CartComponent(page));
  },
  productCardComponent: async ({ page }, use) => {
    await use(new ProductCardComponent(page));
  },
});
