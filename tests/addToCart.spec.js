import { test } from './fixtures/resources.fixture';
test.describe('Добавление товара в корзину', () => {
  let priceFirstProduct, nameFirstProduct;
  test.beforeEach(async ({ page, headerComponent, listProductComponent }) => {
    await page.goto('/');
    await headerComponent.checkCountAndAmountInCartHeader(0, '$0.00');
    priceFirstProduct = await listProductComponent.getPriceFirstProduct();
    nameFirstProduct = await listProductComponent.getNameFirstProduct();
    await listProductComponent.getInfoComponentStart();
  });

  test('Добавление товара в корзину на главной странице', async ({
    headerComponent,
    listProductComponent,
    cartComponent,
  }) => {
    await listProductComponent.addProductToCart();

    await headerComponent.checkCountAndAmountInCartHeader(1, priceFirstProduct);
    await headerComponent.clickCartButton();

    await cartComponent.checkProductNameAndPriceInCart(
      nameFirstProduct,
      priceFirstProduct
    );
  });

  test('Добавление товара в корзину на странице товара', async ({
    headerComponent,
    listProductComponent,
    productCardComponent,
    cartComponent,
  }) => {
    await listProductComponent.clickOnFirstAvailableProductCard();

    await productCardComponent.getInfoComponentStart();
    await productCardComponent.checkUrl('product');
    await productCardComponent.clickAddToCartButton();

    await cartComponent.checkProductNameAndPriceInCart(
      nameFirstProduct,
      priceFirstProduct
    );

    await headerComponent.checkCountAndAmountInCartHeader(1, priceFirstProduct);
  });
});
