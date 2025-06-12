import React from 'react';

const NetMovementPopup = ({ purchases, transfers, onClose }) => {
  const totalPurchases = purchases.reduce((sum, p) => sum + Number(p.quantity), 0);
  const totalTransfersIn = transfers.filter(t => t.type === 'in').reduce((sum, t) => sum + Number(t.quantity), 0);
  const totalTransfersOut = transfers.filter(t => t.type === 'out').reduce((sum, t) => sum + Number(t.quantity), 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        <h2 className="text-xl mb-2">Net Movement Details</h2>
        <p>Purchases: {totalPurchases}</p>
        <p>Transfers In: {totalTransfersIn}</p>
        <p>Transfers Out: {totalTransfersOut}</p>
        <button 
          className="mt-4 p-2 bg-blue-500 text-white" 
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NetMovementPopup;