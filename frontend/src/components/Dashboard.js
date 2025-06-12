import React, { useState, useEffect } from 'react';
import NetMovementPopup from './NetMovementPopup';

const Dashboard = ({ userRole, userBase }) => {
  const [assets, setAssets] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [filters, setFilters] = useState({ date: '', base: userBase, equipmentType: '' });
  const [showNetMovement, setShowNetMovement] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/api/assets', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => setAssets(data))
      .catch(err => console.error(err));

    fetch('http://localhost:3000/api/purchases', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => setPurchases(data));

    fetch('http://localhost:3000/api/transfers', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => setTransfers(data));
  }, []);

  const calculateMetrics = () => {
    const filteredAssets = assets.filter(asset => 
      (!filters.date || asset.date === filters.date) &&
      (!filters.base || asset.base === filters.base) &&
      (!filters.equipmentType || asset.equipmentType === filters.equipmentType)
    );

    const openingBalance = filteredAssets.reduce((sum, asset) => sum + Number(asset.openingBalance), 0);
    const purchases = filteredAssets.reduce((sum, asset) => sum + Number(asset.purchases || 0), 0);
    const transfersIn = filteredAssets.reduce((sum, asset) => sum + Number(asset.transfersIn || 0), 0);
    const transfersOut = filteredAssets.reduce((sum, asset) => sum + Number(asset.transfersOut || 0), 0);
    const closingBalance = openingBalance + purchases + transfersIn - transfersOut;
    const assigned = filteredAssets.reduce((sum, asset) => sum + Number(asset.assigned || 0), 0);
    const expended = filteredAssets.reduce((sum, asset) => sum + Number(asset.expended || 0), 0);

    return { openingBalance, closingBalance, netMovement: purchases + transfersIn - transfersOut, assigned, expended };
  };

  const metrics = calculateMetrics();

  return (
    <div>
      <div className="mb-4">
        <input 
          type="date" 
          className="mr-2 p-2 border" 
          value={filters.date} 
          onChange={e => setFilters({ ...filters, date: e.target.value })} 
        />
        <select 
          className="mr-2 p-2 border" 
          value={filters.base} 
          onChange={e => setFilters({ ...filters, base: e.target.value })}
          disabled={userRole === 'Base Commander' || userRole === 'Logistics Officer'}
        >
          <option value="">All Bases</option>
          <option value="Base1">Base 1</option>
          <option value="Base2">Base 2</option>
        </select>
        <select 
          className="p-2 border" 
          value={filters.equipmentType} 
          onChange={e => setFilters({ ...filters, equipmentType: e.target.value })}
        >
          <option value="">All Equipment Types</option>
          <option value="Vehicle">Vehicle</option>
          <option value="Weapon">Weapon</option>
          <option value="Ammunition">Ammunition</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-100 rounded">
          <h2 className="text-xl">Opening Balance</h2>
          <p>{metrics.openingBalance}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded">
          <h2 className="text-xl">Closing Balance</h2>
          <p>{metrics.closingBalance}</p>
        </div>
        <div 
          className="p-4 bg-gray-100 rounded cursor-pointer" 
          onClick={() => setShowNetMovement(true)}
        >
          <h2 className="text-xl">Net Movement</h2>
          <p>{metrics.netMovement}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded">
          <h2 className="text-xl">Assigned</h2>
          <p>{metrics.assigned}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded">
          <h2 className="text-xl">Expended</h2>
          <p>{metrics.expended}</p>
        </div>
      </div>
      {showNetMovement && (
        <NetMovementPopup 
          purchases={purchases} 
          transfers={transfers} 
          onClose={() => setShowNetMovement(false)} 
        />
      )}
    </div>
  );
};

export default Dashboard;