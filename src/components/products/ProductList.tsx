import React from 'react';
import { observer } from 'mobx-react';
import { productStore } from 'store';
import { Form, FormControl } from 'react-bootstrap';
import { ProductItem } from './ProductItem';
import { ProductModal } from './ProductModal';
import { StyledProductList, Wrapper, Bar } from './ProductList.style';

const ProductList = () => {
  const { products, search } = productStore;
  const productElements = products.map((product) => (
    <ProductItem
      key={product.id}
      product={product}
    />
  ));
  const onSearch = (e: React.SyntheticEvent<HTMLInputElement>) =>
    productStore.setSearch(e.currentTarget.value);

  return (
    <Wrapper>
      <Bar>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={onSearch} value={search} />
        </Form>
        <ProductModal />
      </Bar>
      <StyledProductList>
        {productElements}
      </StyledProductList>
    </Wrapper>
  );
};

const WithObserver = observer(ProductList);

export { WithObserver as ProductList };
