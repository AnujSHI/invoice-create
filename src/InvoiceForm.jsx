// src/InvoiceForm.js
import React, { useState } from 'react';
import Invoice from './Invoice';
import { PDFDownloadLink } from '@react-pdf/renderer';

const InvoiceForm = () => {
  const [formValues, setFormValues] = useState({
    logo: '',
    sellerDetails: {
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      pan: '',
      gst: ''
    },
    placeOfSupply: '',
    billingDetails: {
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      stateCode: ''
    },
    shippingDetails: {
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      stateCode: ''
    },
    placeOfDelivery: '',
    orderDetails: {
      orderNo: '',
      orderDate: ''
    },
    invoiceDetails: {
      invoiceNo: '',
      invoiceDate: '',
      invoiceDetails: ''
    },
    reverseCharge: false,
    items: [
      {
        description: '',
        unitPrice: 0,
        quantity: 0,
        discount: 0
      }
    ],
    signatureImage: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    if (keys.length > 1) {
      setFormValues((prev) => {
        const updated = { ...prev };
        let obj = updated;
        for (let i = 0; i < keys.length - 1; i++) {
          obj = obj[keys[i]];
        }
        obj[keys[keys.length - 1]] = value;
        return updated;
      });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    setFormValues((prev) => {
      const items = [...prev.items];
      items[index] = { ...items[index], [name]: value };
      return { ...prev, items };
    });
  };

  const addItem = () => {
    setFormValues((prev) => ({
      ...prev,
      items: [...prev.items, { description: '', unitPrice: 0, quantity: 0, discount: 0 }]
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4 p-6 bg-white rounded shadow-md">
      {/* Logo */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Logo URL</label>
        <input
          type="text"
          name="logo"
          value={formValues.logo}
          onChange={handleInputChange}
          className="p-2 border rounded w-full"
        />
      </div>

      {/* Seller Details */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Seller Details</h2>
        {Object.keys(formValues.sellerDetails).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700">{key.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type="text"
              name={`sellerDetails.${key}`}
              value={formValues.sellerDetails[key]}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
            />
          </div>
        ))}
      </div>

      {/* Place of Supply */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Place of Supply</label>
        <input
          type="text"
          name="placeOfSupply"
          value={formValues.placeOfSupply}
          onChange={handleInputChange}
          className="p-2 border rounded w-full"
        />
      </div>

      {/* Billing Details */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Billing Details</h2>
        {Object.keys(formValues.billingDetails).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700">{key.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type="text"
              name={`billingDetails.${key}`}
              value={formValues.billingDetails[key]}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
            />
          </div>
        ))}
      </div>

      {/* Shipping Details */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Shipping Details</h2>
        {Object.keys(formValues.shippingDetails).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700">{key.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type="text"
              name={`shippingDetails.${key}`}
              value={formValues.shippingDetails[key]}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
            />
          </div>
        ))}
      </div>

      {/* Place of Delivery */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Place of Delivery</label>
        <input
          type="text"
          name="placeOfDelivery"
          value={formValues.placeOfDelivery}
          onChange={handleInputChange}
          className="p-2 border rounded w-full"
        />
      </div>

      {/* Order Details */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Order Details</h2>
        {Object.keys(formValues.orderDetails).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700">{key.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type="text"
              name={`orderDetails.${key}`}
              value={formValues.orderDetails[key]}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
            />
          </div>
        ))}
      </div>

      {/* Invoice Details */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Invoice Details</h2>
        {Object.keys(formValues.invoiceDetails).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700">{key.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type="text"
              name={`invoiceDetails.${key}`}
              value={formValues.invoiceDetails[key]}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
            />
          </div>
        ))}
      </div>

      {/* Reverse Charge */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Reverse Charge</label>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="reverseCharge"
            checked={formValues.reverseCharge}
            onChange={(e) => setFormValues({ ...formValues, reverseCharge: e.target.checked })}
            className="mr-2"
          />
          <label className="block text-sm font-medium text-gray-700">Yes</label>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Items</h2>
        {formValues.items.map((item, index) => (
          <div key={index} className="space-y-2 border p-4 rounded">
            {Object.keys(item).map((key) => (
              <div key={key} className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700">{key.replace(/([A-Z])/g, ' $1')}</label>
                <input
                  type="text"
                  name={key}
                  value={item[key]}
                  onChange={(e) => handleItemChange(index, e)}
                  className="p-2 border rounded w-full"
                />
              </div>
            ))}
          </div>
        ))}
        <button type="button" onClick={addItem} className="px-4 py-2 bg-blue-500 text-white rounded">
          Add Item
        </button>
      </div>

      {/* Signature Image */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Signature Image URL</label>
                <input
          type="text"
          name="signatureImage"
          value={formValues.signatureImage}
          onChange={handleInputChange}
          className="p-2 border rounded w-full"
        />
      </div>

      {/* Generate Invoice Button */}
      <div className="flex justify-center">
        <PDFDownloadLink
          document={<Invoice {...formValues} />}
          fileName={`Invoice_${formValues.invoiceDetails.invoiceNo}.pdf`}
          className="px-4 py-2 bg-green-500 text-white rounded mt-4"
        >
          {({ loading }) => (loading ? 'Loading document...' : 'Generate Invoice')}
        </PDFDownloadLink>
      </div>
    </form>
  );
};

export default InvoiceForm;
