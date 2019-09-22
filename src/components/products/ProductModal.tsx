import React from 'react';
import { observer } from 'mobx-react';
import noop from 'lodash/noop';
import { Formik, Field, Form as FormikForm, FormikActions, ErrorMessage } from 'formik';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Product, ProductDraft } from 'models';
import { Modal } from 'shared';
import { productStore, identityStore } from 'store';

interface Props {
  product?: Product;
}

interface State {
  isVisibleModal: boolean;
}

@observer
export class ProductModal extends React.Component<Props, State> {
  private ref = React.createRef<Formik<ProductDraft>>();

  state = {
    isVisibleModal: false
  };

  onOpen = () => this.setState({ isVisibleModal: true });

  onClose = () => this.setState({ isVisibleModal: false });

  onDone = () => this.ref.current ? this.ref.current.submitForm() : noop();

  onSubmit = (values: ProductDraft, { setSubmitting }: FormikActions<ProductDraft>) => {
    const { product } = this.props;

    if (product === undefined) {
      productStore.createProduct(values);
    } else {
      productStore.updateProduct(product.id, values);
    }

    setSubmitting(false);
    this.onClose();
  }

  validate = (values: ProductDraft) => {
    const errors: Partial<ProductDraft> = {};

    for (const [key, value] of Object.entries(values)) {
      if (value === '') {
        errors[key as keyof ProductDraft] = `${key} is required`;
      }
    }

    return errors;
  }

  render() {
    const { isVisibleModal } = this.state;
    const { product } = this.props;
    const { identity } = identityStore;
    const { isCreating, isUpdating } = productStore;
    const isDoneDisabled = isCreating || isUpdating;
    const initalValues: ProductDraft = {
      name: product ? product.name : '',
      description: product ? product.description : '',
      currency: product ? product.currency : '',
      company: product ? product.company : '',
      price: product ? product.price : '',
      color: product ? product.color : ''
    };
    const toggleButton = identity.isAuthenticated ? product ? (
      <Button variant="outline-primary" onClick={this.onOpen}>Edit</Button>
    ) : (
      <Button variant="primary" onClick={this.onOpen}>Add Product</Button>
    ) : null;
    const title = product ? 'Edit product' : 'Create product';

    return (
      <>
        {toggleButton}
        <Modal
          title={title}
          doneBtnText="Save changes"
          isVisible={isVisibleModal}
          isDoneDisabled={isDoneDisabled}
          onDone={this.onDone}
          onClose={this.onClose}
        >
          <Formik
            ref={this.ref}
            initialValues={initalValues}
            validate={this.validate}
            onSubmit={this.onSubmit}
            render={() => (
              <FormikForm>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Field id="name" name="name" placeholder="Name" type="text" className="form-control" />
                  <Form.Text className="text-danger"><ErrorMessage name="name" /></Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Field id="description" name="description" placeholder="Description" component="textarea" rows={4} type="text" className="form-control" />
                  <Form.Text className="text-danger"><ErrorMessage name="description" /></Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Field id="price" name="price" placeholder="Price" type="number" className="form-control" />
                  <Form.Text className="text-danger"><ErrorMessage name="price" /></Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Currency</Form.Label>
                  <Field id="currency" name="currency" placeholder="Currency" type="text" className="form-control" />
                  <Form.Text className="text-danger"><ErrorMessage name="currency" /></Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Company</Form.Label>
                  <Field id="company" name="company" placeholder="Company" type="text" className="form-control" />
                  <Form.Text className="text-danger"><ErrorMessage name="company" /></Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Color</Form.Label>
                  <Field id="color" name="color" placeholder="Color" type="text" className="form-control" />
                  <Form.Text className="text-danger"><ErrorMessage name="color" /></Form.Text>
                </Form.Group>
              </FormikForm>
            )}
          />
        </Modal>
      </>
    );
  }
}
