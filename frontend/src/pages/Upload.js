import React from 'react';

const Upload = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-teal-700 mb-6 text-center">About DrugTrack</h1>

        <p className="text-lg mb-6 leading-relaxed">
          <strong>DrugTrack</strong> is a powerful solution designed to enhance transparency and accountability in the pharmaceutical supply chain. Our goal is to help manufacturers, distributors, and pharmacies track drug batches efficiently and prevent counterfeit or expired drugs from entering the market.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mt-10 mb-4">Why DrugTrack?</h2>
        <ul className="list-disc list-inside space-y-2 text-base text-gray-700">
          <li>Track each drug's lifecycle from manufacturing to end-user.</li>
          <li>Prevent counterfeit drugs with batch-level authentication.</li>
          <li>Real-time alerts before drug expiry for safer pharmacy operations.</li>
          <li>User-friendly portal for easy access and scanning via QR codes.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-700 mt-10 mb-4">Our Mission</h2>
        <p className="text-base text-gray-700 leading-relaxed">
          We are committed to building a transparent healthcare system by leveraging technology to eliminate drug fraud and ensure safety at every level of the supply chain. DrugTrack brings together innovation, reliability, and simplicity in one powerful tool.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mt-10 mb-4">Meet the Team</h2>
        <p className="text-base text-gray-700 leading-relaxed">
          Our team consists of passionate developers and problem solvers who believe in using tech for good. We’re always looking to improve and collaborate with industry experts to make DrugTrack smarter and safer.
        </p>
      </div>
    </div>
  );
};

export default Upload;

