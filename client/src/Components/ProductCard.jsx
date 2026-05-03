import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const ProductCard = ({ product, showHeart = false }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleWishlist = () => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="card h-100 border-0 shadow-sm p-3 text-center rounded-4">
      {showHeart && (
        <div className="text-start mb-2">
          <FaHeart
            onClick={handleWishlist}
            style={{ cursor: "pointer", color: isInWishlist(product._id) ? 'red' : 'gray' }}
          />
        </div>
      )}
      <div className="bg-light rounded-4 mb-3 d-flex align-items-center justify-content-center"
        style={{ height: "220px" }}>
        <img src={product.image} alt={product.name}
          className="img-fluid h-75" style={{ objectFit: "contain" }} />
      </div>
      <h6 className="fw-bold mb-1">{product.name}</h6>
      <p className="text-muted small">{product.description || product.category}</p>
      <h5 className="fw-bold" style={{ color: "#78b933" }}>
        ${product.price.toLocaleString()}
      </h5>
      <button
        className="btn btn-success w-100 mt-2 rounded-pill py-2 d-flex align-items-center justify-content-center gap-2"
        style={{ backgroundColor: "#78b933", border: "none" }}
        onClick={() => addToCart(product)}
      >
        <FaShoppingCart /> أضف إلى السلة
      </button>
    </div>
  );
};

export default ProductCard;