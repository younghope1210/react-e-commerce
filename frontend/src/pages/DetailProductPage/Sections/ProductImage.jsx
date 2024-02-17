// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';

// index.css에 react-image-gallery관련 css 불러들임 

const ProductImage = ({ product }) => {

    const [images, setImages] = useState([]);

    useEffect(() => {

        if (product?.images?.length > 0) { // 상품이 있고 상품 이미지가 있을 때 
            
            let images = [];

            product.images.map(imageName => {
                return images.push({
                    original: `${import.meta.env.VITE_SERVER_URL}/${imageName}`,
                    thumbnail: `${import.meta.env.VITE_SERVER_URL}/${imageName}`,
                })
            })

            setImages(images)
        }


    }, [product])

    return (
        <ImageGallery items={images} />
    )
}

export default ProductImage