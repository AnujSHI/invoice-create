import React from 'react';
import InvoiceForm from './InvoiceForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Invoice Generator</h1>
        <InvoiceForm />
      </div>
    </div>
  );
}

export default App;
