import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// create the api

export const appApi=createApi({
    reducerPath:'appApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:3000'}),
    endpoints:(builder)=>({
        signup:builder.mutation({
            query:user=>({
                url:'/users/signup',
                method:'POST',
                body:user,
            })
        }),
        login:builder.mutation({
            query:user=>({
                url:'/users/login',
                method:'POST',
                body:user
            }),
        }),
        // creating product
        createProduct:builder.mutation({
            query:(product)=>({
                url:'/products',
                body:product,
                method:"POST",
            })
        }),

        deleteProduct:builder.mutation({
            query:({product_id,user_id})=>({
                url:`/products/${product_id}`,
                body:{user_id},
                method:"DELETE"
            })
        }),

        updateProduct:builder.mutation({
            query:(product)=>({
                url:`/products/${product.id}`,
                body:product,
                method:"PATCH"
            })
        }),

        // add to Cart
        addToCart:builder.mutation({
            query:(cartInfo)=>({
                url:"/products/add-to-cart",
                body:cartInfo,
                method:"POST",
            })
        }),
        // remove from Cart
        removeFromCart:builder.mutation({
            query:(cartInfo)=>({
                url:"/products/remove-from-cart",
                body:cartInfo,
                method:"POST",
            })
        }),
         // increase Cart product
        increaseCartProduct:builder.mutation({
            query:(body)=>({
                url:"/products/increase-cart",
                body,
                method:"POST",
            })
        }),
        // decrease Cart product
        decreaseCartProduct:builder.mutation({
            query:(body)=>({
                url:"/products/decrease-cart",
                body,
                method:"POST",
            })
        }),
        createOrder:builder.mutation({
            query:(body)=>({
                url:'/orders',
                body,
                method:"POST",
            })
        })

    })
})


export const {useSignupMutation,useLoginMutation,useCreateProductMutation,useAddToCartMutation,useDecreaseCartProductMutation,useIncreaseCartProductMutation,useRemoveFromCartMutation,useCreateOrderMutation,useDeleteProductMutation,useUpdateProductMutation}=appApi;

export default appApi;