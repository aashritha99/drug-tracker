// src/components/DrugCard.js

import React from "react";

const DrugCard = ({ drug }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 w-full max-w-sm">
      <h2 className="text-xl font-bold text-gray-800">{drug.name}</h2>
      <p className="text-sm text-gray-600">Batch: {drug.batchNumber}</p>
      <p className="text-sm text-gray-600">Manufacturer: {drug.manufacturer}</p>
      <p className="text-sm text-gray-600">
        Expiry: {new Date(drug.expiryDate).toDateString()}
      </p>

      <div className="mt-4">
        {drug.qrCodeUrl && (
          <img
            src={drug.qrCodeUrl}
            alt="QR Code"
            className="w-32 h-32 border rounded"
          />
        )}
      </div>
    </div>
  );
};

export default DrugCard;

