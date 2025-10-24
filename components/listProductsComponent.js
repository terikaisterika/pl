import { expect, test } from '@playwright/test';
import { BaseComponent } from './baseComponent';
export class ListProductsComponent extends BaseComponent {
  name = 'Список товаров';
  /**
   * Перенести в список товаров. Список элементов содержащих цену для товаров
   * которые можно добавить в корзину (доступные товары)
   */
  listPriceItemsAvailableProducts;
  constructor(page) {
    super(page);
    this.listPriceItemsAvailableProducts = this.page.locator(
      `//a[@data-id]/parent::div//div[@class="oneprice"]`
    );
    this.listAddButtonAvailableProducts = page.locator('//a[@data-id]//i');
    this.listProductNameAvailableProducts = page.locator(
      '//a[@data-id]/ancestor::div[contains(@class, "col-md-3")]//a[@class="prdocutname"]'
    );
    this.listAvailableProductCards = page.locator(
      '//a[@data-id]/ancestor::div[@class="thumbnail"]'
    );
  }
  async checkCountSearchResult(searchPhrase) {
    let resultSearchCount = await this.page
      .getByRole('link', { name: new RegExp(searchPhrase, 'i') })
      .count();
    expect(
      resultSearchCount > 1,
      `Количество результатов поиска больше 1. Количество результатов в тесте ${resultSearchCount}`
    ).toBeTruthy();
  }
  /**
   *
   * @returns {string} возвращает цену первого товара.
   * Подходит для сверки в корзине в шапке сайта
   *  и в корзине (checkout)
   */
  async getPriceFirstProduct() {
    return await this.listPriceItemsAvailableProducts.first().textContent();
  }
  async getNameFirstProduct() {
    return await this.listProductNameAvailableProducts.first().textContent();
  }
  async addProductToCart() {
    await this.listAddButtonAvailableProducts.first().click();
  }
  async clickOnFirstAvailableProductCard() {
    await test.step(`Нажатие на карточку товара в списке для перехода на страницу товара`, async () => {
      await this.listAvailableProductCards.first().click();
    });
  }
}
