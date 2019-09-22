import React from 'react';
import { observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import { productStore } from 'store';
import { ProductModal } from './ProductModal';
import { StyledProductInfo, ImageHolder } from './ProductInfo.style';

interface Props extends RouteComponentProps<{ productId: string }> {}

const ProductInfo = ({ match }: Props) => {
  const { productId } = match.params;
  const product = productStore.findProductById(Number(productId));

  if (product === undefined) {
    return null;
  }

  const { name, description, company, price, currency, color } = product;
  const priceText = `${price} ${currency}`;

  return (
    <StyledProductInfo>
      <ImageHolder style={{ backgroundColor: color }} />
      <h1 className="display-4">{name}</h1>
      <p className="text-muted">{priceText}</p>
      <p className="font-weight-bold text-uppercase">{company}</p>
      <p className="lead">{description}</p>
      <ProductModal product={product} />
    </StyledProductInfo>
  );
};

const WithObserver = observer(ProductInfo);

export { WithObserver as ProductInfo };
