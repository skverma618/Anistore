import React from 'react';
import { Link } from 'react-router-dom';
import { FaCartPlus, FaStar } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';

function ProductCard({ product, handleAddToCart, handleWishlistClick, wishList, scrollToTop }) {
  return (
    <div className="lpContainer">
      <div className="lpImageContainer">
        <Link to="/Product" onClick={scrollToTop}>
          <img
            src={product?.frontImg}
            alt={product?.productName}
            className="lpImage"
          />
        </Link>
        <h4 onClick={() => handleAddToCart(product)}>
          Add to Cart
        </h4>
      </div>
      <div
        className="lpProductImagesCart"
        onClick={() => handleAddToCart(product)}
      >
        <FaCartPlus />
      </div>
      <div className="limitedProductInfo">
        <div className="lpCategoryWishlist">
          <p>Dresses</p>
          <FiHeart
            onClick={() => handleWishlistClick(product?.productID)}
            style={{
              color: wishList[product.productID] ? "red" : "#767676",
              cursor: "pointer",
            }}
          />
        </div>
        <div className="productNameInfo">
          <Link to="/Product" onClick={scrollToTop}>
            <h5>{product?.productName}</h5>
          </Link>
          <p>${product?.productPrice}</p>
          <div className="productRatingReviews">
            <div className="productRatingStar">
              <FaStar color="#FEC78A" size={10} />
              <FaStar color="#FEC78A" size={10} />
              <FaStar color="#FEC78A" size={10} />
              <FaStar color="#FEC78A" size={10} />
              <FaStar color="#FEC78A" size={10} />
            </div>
            <span>{product?.productReviews}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard; 