import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaStripe, FaPaypal, FaMoneyBillWaveAlt } from "react-icons/fa";

const totalAmount = 800;
const totalItems = 4;

const PaymentOptions = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const handleConfirm = () => {
    if (!selectedMethod) return alert("Please select a payment method.");
    toast.success(`Proceeding with ${selectedMethod} payment`);
  };

  const methods = [
    {
      name: "Stripe",
      icon: <FaStripe className="text-indigo-600 text-4xl" />,
      desc: "Secure card payments with Stripe",
    },
    {
      name: "PayPal",
      icon: <FaPaypal className="text-blue-500 text-4xl" />,
      desc: "Pay directly using your PayPal account",
    },
    {
      name: "Razorpay",
      icon: <FaMoneyBillWaveAlt className="text-green-600 text-4xl" />,
      desc: "Pay via UPI, wallets, or netbanking",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Summary Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center border border-gray-200">
        <div className="space-y-2 text-center sm:text-left">
          <h2 className="text-xl font-semibold text-gray-700">Total Payable</h2>
          <p className="text-3xl font-bold text-indigo-700">₹{totalAmount}</p>
        </div>
        <div className="text-sm text-gray-600 mt-4 sm:mt-0 text-center sm:text-right space-y-1">
          <p>Total Items: <span className="font-medium text-gray-800">{totalItems}</span></p>
          <p>Shipping: <span className="font-medium text-green-600">Free</span></p>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center sm:text-left">
          Choose Your Payment Method
        </h3>
        <div className="grid gap-6 sm:grid-cols-3">
          {methods.map((method) => (
            <div
              key={method.name}
              onClick={() => setSelectedMethod(method.name)}
              className={`group cursor-pointer border rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-200 shadow-sm hover:shadow-md ${
                selectedMethod === method.name
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-gray-200"
              }`}
            >
              {method.icon}
              <h4 className="mt-3 text-lg font-semibold text-gray-800 group-hover:text-indigo-600">
                {method.name}
              </h4>
              <p className="text-sm text-gray-500 mt-1">{method.desc}</p>
            </div>
          ))}
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          disabled={!selectedMethod}
          className={`mt-8 w-full py-3 rounded-xl text-lg font-semibold tracking-wide transition-all duration-200 ${
            selectedMethod
              ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          {selectedMethod ? `Pay with ${selectedMethod}` : "Select a Payment Method"}
        </button>
      </div>
    </div>
  );
};

export default PaymentOptions;
