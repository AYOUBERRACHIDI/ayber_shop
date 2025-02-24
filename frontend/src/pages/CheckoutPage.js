import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

// Styles avec styled-components
const CheckoutContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: bold;
  color: #555;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

// Composant Checkout
const CheckoutPage = () => {


  const location = useLocation();
  const { cartData, totalPrice } = location.state || { cartData: [], totalPrice: 0 };
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Order placed successfully!');
  };

  return (
    <CheckoutContainer>
      <Title>Checkout</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Full Name</Label>
          <Input type="text" placeholder="John Doe" required />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input type="email" placeholder="john.doe@example.com" required />
        </FormGroup>
        <FormGroup>
          <Label>Shipping Address</Label>
          <Input type="text" placeholder="123 Main St, City, Country" required />
        </FormGroup>

        {/** Afficher les produits du panier */}
        <div>
          <h3>Order Summary</h3>
          {cartData.map((product) => (
            <div key={product.productId._id}>
              <p>{product.productId.productName} - {product.quantity} x {product.productId.sellingPrice}</p>
            </div>
          ))}
          <p><strong>Total:</strong> {totalPrice}</p>
        </div>

        <Button type="submit">Place Order</Button>
      </Form>
    </CheckoutContainer>
  );
};

export default CheckoutPage;