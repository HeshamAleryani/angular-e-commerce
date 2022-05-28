import { ProductModel } from './product.model';

describe('Product', () => {
  it('should create an instance', () => {
    expect(new ProductModel({})).toBeTruthy();
  });
});
