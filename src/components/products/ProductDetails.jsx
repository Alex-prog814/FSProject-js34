import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneProduct, createReview, deleteReview, toggleFavorite } from '../../store/products/productsActions';
import { clearOneProductState } from '../../store/products/productsSlice';
import { isUserLogin } from '../../helpers/functions';

const ProductDetails = () => {
    const { loading, oneProduct } = useSelector(state => state.products);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewContent, setReviewContent] = useState('');
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOneProduct({ id }));
        return () => dispatch(clearOneProductState());
    }, []);

    console.log(oneProduct);

  return (
    <div>
        {loading ? (
            <h3>Loading...</h3>
        ) : (
            <div>
                {oneProduct && (
                    <div>
                        <img src={oneProduct.image} alt={oneProduct.title} width="250" height="250" />
                        <h3>{ oneProduct.title }</h3>
                        <h3>{ oneProduct.price }</h3>
                        {isUserLogin() && (
                            <button onClick={() => dispatch(toggleFavorite({ productId: oneProduct.id }))}>{oneProduct.favorite_by_user ? 'Remove from favorites' : 'Add to favorites'}</button>
                        )}
                        <h3>Reviews:</h3>
                        {isUserLogin() && (
                            <button onClick={() => setShowReviewForm(!showReviewForm)}>Add review</button>
                        )}

                        {showReviewForm && (
                            <div>
                                <input type="text" placeholder="Enter review content" value={reviewContent} onChange={(e) => setReviewContent(e.target.value)} />
                                <button onClick={() => {
                                    dispatch(createReview({
                                        text: reviewContent,
                                        productId: oneProduct.id
                                    }));
                                    dispatch(getOneProduct({ id: oneProduct.id }));
                                    setReviewContent('');
                                    setShowReviewForm(false);
                                }}>Create</button>
                            </div>
                        )}

                        {oneProduct.reviews.length > 0 && (
                            <>
                                {oneProduct.reviews.map(review => (
                                    <div key={review.id}>
                                        {console.log(review.is_author)}
                                        <span>{ review.text } </span>
                                        <span>{ review.author } </span>
                                        {review.is_author && (
                                            <button onClick={() => {
                                                dispatch(deleteReview({ reviewId: review.id, productId: oneProduct.id }));
                                            }}>Delete</button>
                                        )}
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                )}
            </div>
        )}
    </div>
  )
}

export default ProductDetails