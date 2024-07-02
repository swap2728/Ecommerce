import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { selectLoggedInUser } from '../../auth/authSlice';
import { fetchLoggedInUserOrdersAsync, selectUserInfo } from '../UserSlice';
import { selectUserOrders  } from '../UserSlice';
import {selectLoggedInUser} from '../../auth/authSlice'

export default function UserOrders() {
//   const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const orders = useSelector(selectUserOrders)

  useEffect(()=>{
    console.log(user )
    dispatch(fetchLoggedInUserOrdersAsync(user.id))
  },[])
// selectUserOrders

// const user = useSelector(selectLoggedInUser);
//   useEffect(()=>{
//     // if(user){
//       dispatch(fetchLoggedInUserOrdersAsync(user.id))
//     // }
//   },[dispatch,user])


  return (
  <>
      { orders.map((order=>(
        <div>
        <div className="mx-auto max-w-7xl mt-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="mt-8">
            <div className="flow-root">
              <h1 className="text-4xl my-5 font-bold tracking-tight text-white-900">
                Order : {order.id}
              </h1>
              <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                Order status : {order.status}
              </h3>
              <ul role="list" className="-my-6 divide-y divide-gray-200">

                { order.items.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
    
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={product.href}>{product.title}</a>
                          </h3>
                          <p className="ml-4">{product.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.price}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500">
                              <label
                                htmlFor="quantity"
                                className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                              >
                                Qty : {product.quantity}
                              </label>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>{order.totalAmount}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Total Items in Cart</p>
              <p>{orders.totalItems}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping Address.
            </p>
            <li
                    //   key={ind   ex}
                      className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                    >
                      <div className="flex gap-x-4">
                        
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {order.selectedAddress.name}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {order.selectedAddress.street}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {order.selectedAddress.pinCode}
                          </p>
                        </div>
                      </div>
                      <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          Phone: {order.selectedAddress.phone}
                        </p>
                        <p className="text-sm leading-6 text-gray-500">
                          {order.selectedAddress.city}
                        </p>
                      </div>
                    </li>
           
          </div>
        </div>  
          </div>
      )))}
      </>
  );
}