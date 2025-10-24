import { test } from './fixtures/resources.fixture';
test.describe('Поиск товаров', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Поиск по частичному совпадению. Результатов больше одного', async ({
    headerComponent,
    listProductComponent,
  }) => {
    let searchPhrase = 'bronzer';
    await headerComponent.searchWithInfo(searchPhrase);

    await listProductComponent.getInfoComponentStart();
    await listProductComponent.checkCountSearchResult(searchPhrase);
  });
  test('Поиск единственного товара с переходом на страницу товара', async ({
    productCardComponent,
    headerComponent,
  }) => {
    let searchPhrase = 'Brunette expressions Conditioner';
    await headerComponent.searchWithInfo(searchPhrase);

    await productCardComponent.getInfoComponentStart();
    await productCardComponent.checkProductName(searchPhrase);
  });
  test.afterAll(async ({ page }) => {
    await page.close();
  });
});
