import { playwright, expect } from '@playwright/test';
export class BaseComponent {
  name = 'Базовый компонент';
  constructor(page) {
    this.page = page;
  }
  async stepInfo(message) {
    expect(true, message).toBeTruthy();
  }
  async getInfoComponentStart() {
    const message = `Начало работы с компонентом ${this.name}`;
    this.stepInfo(message);
  }
  async getInfoComponentEnd() {
    const message = `Окончание работы с компонентом ${this.name}`;
    this.stepInfo(message);
  }
  async checkUrl(partUrl) {
    const message = `url страницы содержит ${partUrl}`;
    expect(this.page.url(), message).toContain(partUrl);
  }
  async closeAll() {
    await this.page.close();
  }
}
