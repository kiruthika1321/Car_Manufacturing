
import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

const Cart: React.FC<CartProps> = ({ items, updateQuantity, removeFromCart, onCheckout, onContinueShopping }) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-4 text-center">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Your garage is empty.</h2>
        <p className="text-slate-500 mb-10">It seems you haven't reserved any vehicles yet. Explore our fleet to find your dream car.</p>
        <button 
          onClick={onContinueShopping}
          className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors"
        >
          Explore Models
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-serif font-bold text-slate-900 mb-12">Your Reservations</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row bg-white rounded-2xl p-4 shadow-sm border border-slate-100 items-center">
              <img src={item.image} alt={item.name} className="w-full sm:w-48 h-32 object-cover rounded-xl mb-4 sm:mb-0 sm:mr-6" />
              <div className="flex-grow text-center sm:text-left">
                <h3 className="text-xl font-bold text-slate-900">{item.name}</h3>
                <p className="text-slate-500 text-sm mb-2">{item.model} — {item.year}</p>
                <div className="text-indigo-600 font-bold">${item.price.toLocaleString()}</div>
              </div>
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <div className="flex items-center bg-slate-100 rounded-lg">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-2 hover:text-indigo-600 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <span className="w-8 text-center font-bold">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-2 hover:text-indigo-600 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 transition-colors p-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 h-fit">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Reservation Summary</h3>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>${total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Security Deposit (5%)</span>
              <span>${(total * 0.05).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Concierge Delivery</span>
              <span className="text-green-600">Complimentary</span>
            </div>
            <div className="pt-4 border-t border-slate-100 flex justify-between text-xl font-bold text-slate-900">
              <span>Total Deposit</span>
              <span className="text-indigo-600">${(total * 0.05).toLocaleString()}</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-2">
              The remaining balance of ${(total * 0.95).toLocaleString()} is payable upon final inspection and delivery.
            </p>
          </div>
          <button 
            onClick={onCheckout}
            className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20"
          >
            Confirm Reservation
          </button>
          <button 
            onClick={onContinueShopping}
            className="w-full mt-4 py-4 text-slate-500 font-bold hover:text-indigo-600 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
