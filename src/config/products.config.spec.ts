import { productsConfig } from './products.config';

describe('ProductsConfig', () => {
  it('should have 3 products', () => {
    expect(productsConfig.products).toHaveLength(3);
  });

  it('should have packaging for CE and HM', () => {
    expect(productsConfig.packaging.CE).toBeDefined();
    expect(productsConfig.packaging.HM).toBeDefined();
    expect(productsConfig.packaging.SS).toEqual([]);
  });
});