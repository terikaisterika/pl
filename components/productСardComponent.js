import { expect, test } from '@playwright/test';
import { BaseComponent } from './baseComponent';
export class ProductCardComponent extends BaseComponent {
  name = 'Карточка товара';
  constructor(page) {
    super(page);
    //this.page = page;
    this.nameProductH1 = this.page.locator('#product_details h1 span');
    this.priceProductDiv = this.page.locator('div.productfilneprice');
    this.addToCartButton = this.page.getByRole('link', { name: /Add to Cart/ });
  }
  async checkProductName(productName) {
    let message = `Текст в h1 (название товара) равен названию искомого товара. В тесте искали ${productName}`;
    expect(await this.nameProductH1.textContent(), message).toBe(productName);
    message = `На странице видно название товара.`;
    await expect(await this.nameProductH1, message).toBeVisible();
  }

  async clickAddToCartButton() {
    await test.step(`Нажатие на кнопку добавления в корзину в карточке товара`, async () => {
      await this.addToCartButton.click();
    });
  }
}
