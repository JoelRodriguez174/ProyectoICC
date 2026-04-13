import React from 'react';
import Testing from '../components/Testing';

const TestingPage = () => {
  return (
    <div className="min-h-screen pt-24 bg-gray-100 flex items-center justify-center">
      <div className="max-w-2xl w-full p-6">
        <h1 className="text-4xl font-black text-center mb-12 uppercase tracking-tighter">
          Pestaña de Pruebas
        </h1>
        <div className="flex justify-center">
          <Testing />
        </div>
      </div>
    </div>
  );
};

export default TestingPage;
