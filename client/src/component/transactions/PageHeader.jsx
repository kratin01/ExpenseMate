// src/component/transactions/PageHeader.js
import React from 'react';

const PageHeader = ({ title, description }) => (
  <header className="mb-8">
    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
      {title}
    </h1>
    <p className="mt-2 text-lg text-gray-600">
      {description}
    </p>
  </header>
);

export default PageHeader;