import { observable, action } from 'mobx';
import pull from 'lodash/pull';
import debounce from 'lodash/debounce';
import { productAPI } from 'api';
import { Product, ProductDraft } from 'models';

class ProductStore {
  @observable products: Product[] = [];
  @observable isLoading = false;
  @observable isCreating = false;
  @observable isUpdating = false;
  @observable search = '';

  @action
  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  @action
  setIsCreating(isCreating: boolean) {
    this.isCreating = isCreating;
  }

  @action
  setIsUpdating(isUpdating: boolean) {
    this.isUpdating = isUpdating;
  }

  @action
  setSearch(search: string) {
    this.search = search;
    this.debouncedList();
  }

  @action
  setProducts(products: Product[]) {
    this.products = products;
  }

  @action
  setProduct(product: Product) {
    this.products[product.id] = product;
  }

  @action
  updateProductById(id: number, product: ProductDraft) {
    this.products[id] = { id, ...product };
  }

  @action
  deleteProductByObject(product: Product) {
    pull(this.products, product);
  }

  async list() {
    this.setIsLoading(true);

    try {
      const params = this.search ? { q: this.search } : undefined;
      const result = await productAPI.getProducts(params);

      this.setProducts(result.data);
    } catch (error) {
      console.log(error);
    }

    this.setIsLoading(false);
  }

  debouncedList = debounce(this.list, 500);

  async createProduct(product: ProductDraft) {
    this.setIsCreating(true);

    try {
      const result = await productAPI.createProduct(product);

      this.setProduct(result.data);
    } catch (error) {
      console.log(error);
    }

    this.setIsCreating(false);
  }

  async updateProduct(productId: number, product: ProductDraft) {
    this.setIsUpdating(true);

    try {
      await productAPI.updateProduct(productId, product);

      this.updateProductById(productId, product);
    } catch (error) {
      console.log(error);
    }

    this.setIsUpdating(false);
  }

  async deleteProduct(product: Product) {
    try {
      await productAPI.deleteProduct(product.id);

      this.deleteProductByObject(product);
    } catch (error) {
      console.log(error);
    }
  }

  findProductById(productId: number): Product | undefined {
    return this.products.find((product) => product.id === productId);
  }
}

export const productStore = new ProductStore();
