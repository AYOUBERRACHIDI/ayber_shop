import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from "../common/API";
import { useCart } from '../context/CartContext';

const useAddToCart = () => {
  const navigate = useNavigate();
  const { countCartProducts } = useCart();

  const addToCart = async (e, productId, stock) => {
    e.stopPropagation();
    e.preventDefault();

    // Vérifie si le stock est disponible avant d'ajouter au panier
    if (stock <= 0) {
      toast.error("This product is out of stock.");
      return;
    }

    const apiResponse = await fetch(SummaryApi.addToCart.url, {
      method: SummaryApi.addToCart.method,
      credentials: "include",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        productId: productId
      })
    });

    const data = await apiResponse.json();

    console.log(data);

    if (apiResponse.status === 401 || apiResponse.status === 403) {
      navigate('/signin');
      toast.error("Please log in first.");
      return;
    }

    if (data.success) {
      countCartProducts();
      toast.success(data.message);
    } else if (data.error) {
      toast.error(data.message);
    } else {
      toast.error("An unexpected error occurred");
    }
  };

  return addToCart;
};

export default useAddToCart;
