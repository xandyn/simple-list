import React from 'react';
import { observer } from 'mobx-react';
import { Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Product } from 'models';
import { urls } from '../../constants';
import { ImageHolder } from './ProductItem.style';

interface Props {
  readonly product: Product;
}

const ProductItem = ({ product }: Props) => {
  const { id, name, description, price, currency, color } = product;
  const priceText = `${price} ${currency}`;
  const url = `${urls.products}/${id}`;

  return (
    <Card>
      <ImageHolder style={{ backgroundColor: color }} />
      <Card.Body>
        <Card.Title className="text-truncate">{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{priceText}</Card.Subtitle>
        <Card.Text className="text-truncate">{description}</Card.Text>
        <LinkContainer to={url}>
          <Card.Link>Show more...</Card.Link>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};

const WithObserver = observer(ProductItem);

export { WithObserver as ProductItem };
