
import React, { useState } from 'react';

interface CheckoutProps {
  onSuccess: () => void;
  onCancel: () => void;
  totalAmount: number;
}

const Checkout: React.FC<CheckoutProps> = ({ onSuccess, onCancel, totalAmount }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '',
    cardNum: '', expiry: '', cvc: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        <div className="flex border-b border-slate-100">
          <div className={`flex-1 p-6 text-center font-bold ${step === 1 ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>1. Details</div>
          <div className={`flex-1 p-6 text-center font-bold ${step === 2 ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>2. Delivery</div>
          <div className={`flex-1 p-6 text-center font-bold ${step === 3 ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>3. Payment</div>
        </div>

        <div className="p-8 md:p-12">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Reservation Details</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                  <input name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500" placeholder="John" />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                  <input name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500" placeholder="Doe" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                  <input name="email" value={formData.email} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500" placeholder="john@example.com" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                  <input name="phone" value={formData.phone} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
              <div className="flex justify-between pt-8">
                <button onClick={onCancel} className="text-slate-500 font-bold hover:text-slate-700">Cancel</button>
                <button onClick={nextStep} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20">Continue to Delivery</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Delivery Address</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Street Address</label>
                  <input name="address" value={formData.address} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">City</label>
                  <input name="city" value={formData.city} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="col-span-1 flex gap-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">State</label>
                    <input name="state" value={formData.state} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">ZIP</label>
                    <input name="zip" value={formData.zip} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>
              </div>
              <div className="flex justify-between pt-8">
                <button onClick={prevStep} className="text-slate-500 font-bold hover:text-slate-700">Back</button>
                <button onClick={nextStep} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20">Continue to Payment</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Payment Method</h2>
              <div className="bg-indigo-50 p-6 rounded-2xl mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-indigo-700 font-bold">Total Security Deposit</span>
                  <span className="text-2xl font-bold text-indigo-900">${(totalAmount * 0.05).toLocaleString()}</span>
                </div>
                <p className="text-xs text-indigo-600">The deposit secures your manufacturing slot and is fully refundable within 14 days.</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Card Number</label>
                  <input name="cardNum" value={formData.cardNum} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500" placeholder="0000 0000 0000 0000" />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Expiry Date</label>
                  <input name="expiry" value={formData.expiry} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500" placeholder="MM/YY" />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">CVC</label>
                  <input name="cvc" value={formData.cvc} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500" placeholder="123" />
                </div>
              </div>
              <div className="flex justify-between pt-8">
                <button onClick={prevStep} className="text-slate-500 font-bold hover:text-slate-700">Back</button>
                <button 
                  onClick={onSuccess} 
                  className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20"
                >
                  Pay Deposit & Finalize
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
