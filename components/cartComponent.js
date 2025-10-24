import { expect } from '@playwright/test';
import { BaseComponent } from './baseComponent';

export class CartComponent extends BaseComponent {
  name = 'Корзина';
  constructor(page) {
    super(page);
    this.cartForm = this.page.locator('#cart');
    this.productLineTr = this.page.locator(
      '#cart .product-list tbody tr:nth-child(2)'
    );
  }
  async checkProductNameInCart(name) {
    const productNameFromCart = await this.productLineTr
      .locator('td:nth-child(2) a')
      .textContent();
    let message = `Доп. инф: добавили товар ${name}, в корзине товар ${productNameFromCart}`;
    this.stepInfo(message);
    message = `Название товара в колонке Name в корзине равна добавленному товару.`;
    expect(productNameFromCart == name, message).toBeTruthy();
  }

  async checkProductPriceInCart(price) {
    const productPriceFromCart = await this.productLineTr
      .locator('td:nth-child(4)')
      .textContent();
    let message = `Доп. инф: Цена добавленного товара: ${price}, цена товара в корзине: ${productPriceFromCart}`;
    this.stepInfo(message);
    message = `Цена в колонке Unit Price равна цене товара при добавлении.`;
    expect(price === productPriceFromCart).toBeTruthy();
  }

  async checkProductNameAndPriceInCart(name, price) {
    await this.getInfoComponentStart();
    await this.checkUrl('checkout');
    await this.checkProductNameInCart(name);
    await this.checkProductPriceInCart(price);
  }
}
