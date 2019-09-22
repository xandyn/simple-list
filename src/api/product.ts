import axios, { AxiosResponse } from 'axios';
import { Product, ProductDraft, Params } from 'models';

class ProductAPI {
  private readonly baseUrl = '/products';

  async getProducts(params?: Params): Promise<AxiosResponse<Product[]>> {
    return await axios.get<Product[]>(this.baseUrl, { params });
  }

  async updateProduct(productId: number, product: ProductDraft): Promise<AxiosResponse<Product>> {
    return await axios.patch(`${this.baseUrl}/${productId}`, product);
  }

  async createProduct(product: ProductDraft): Promise<AxiosResponse<Product>> {
    return await axios.post(this.baseUrl, product);
  }

  async deleteProduct(productId: number): Promise<AxiosResponse<{}>> {
    return await axios.delete(`${this.baseUrl}/${productId}`);
  }
}

export const productAPI = new ProductAPI();
