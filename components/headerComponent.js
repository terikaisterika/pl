import { expect, test } from '@playwright/test';
import { BaseComponent } from './baseComponent';
export class HeaderComponent extends BaseComponent {
  name = 'Шапка сайта';
  constructor(page) {
    //this.page = page;
    super(page);
    this.searchInput = this.page.getByRole('textbox', {
      name: 'Search Keywords',
    });
    this.searchIconButton = this.page.locator('//*[@id="search_form"]//i');
    this.buttonGoInCartMenu = this.page.locator(
      '//div[@id="topnav"]//li[@data-id="menu_cart"]//i'
    );
  }
  /**
   * Проверка количество товаров в корзине в шапке сайта (Header)
   * @param {*} expectedCount количество товаров, которое должно быть в корзине
   * по умолчанию 0. Со значением по умолчанию проверять, когда товар еще не добавили
   * или уже удалили
   */
  async checkCountInCartHeader(expectedCount = 0) {
    let message = `количество товаров в корзине должно быть ${expectedCount}`;
    expect(
      await this.page
        .locator(`//header//ul//li//span[text() ="${expectedCount}"]`)
        .textContent(),
      message
    ).toBe(String(expectedCount));
  }

  /**
   * Проверка суммы в корзине в шапке сайта (Header)
   * @param {*} expectedAmount сумма передается в виде строки
   * в формате '$0.00'
   * по умолчанию '$0.00'. Значение по умолчанию можно использовать
   * до добавления товаров и после удаления товаров из корзины
   */
  async checkAmountInCartHeader(expectedAmount = '$0.00') {
    const message = `сумма в корзине равна ${expectedAmount}`;
    expect(
      await this.page
        .locator(`//header//ul//li//a//span[text()="${expectedAmount}"]`)
        .textContent(),
      message
    ).toBe(expectedAmount);
  }
  async searchProduct(searchPhrase = 'Brunette expressions Conditioner') {
    let searchWord = searchPhrase.match(/[a-zA-Z]+/)[0];
    await this.searchInput.click();
    await this.searchInput.fill(searchWord);
    await this.searchIconButton.click();
  }
  async clickCartButton() {
    await test.step(`Нажата кнопка перехода в корзину в шапке сайта`, async () => {
      await this.buttonGoInCartMenu.click();
    });
  }
  /**
   * Проверка количества и суммы в шапке сайта в блоке корзины
   * @param {number} count
   * @param {string} price в формате, который используется в зависимости
   * от выбранной валюты на сайте. Пример '$0.00'
   */
  async checkCountAndAmountInCartHeader(count, price) {
    await this.getInfoComponentStart();
    await this.checkCountInCartHeader(count);
    await this.checkAmountInCartHeader(price);
  }
  async searchWithInfo(phrase) {
    await this.getInfoComponentStart();
    await this.searchProduct(phrase);
    await this.checkUrl('product');
  }
}
