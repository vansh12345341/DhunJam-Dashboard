import React, { useEffect, useState } from 'react';
import './style.css'; 
import axios from 'axios';
import Graph from './Graph';

const AdminDashboard = () => {
  const [data, setData] = useState({});
  const [isCharging, setIsCharging] = useState(true);
  const [customSongAmount, setCustomSongAmount] = useState(99);
  const [regularSongAmounts, setRegularSongAmounts] = useState([79, 59, 39, 19]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const graphData = [customSongAmount, ...regularSongAmounts];
  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const response = await axios.get(`https://stg.dhunjam.in/account/admin/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const fetchedData = response.data.data;
      setData(fetchedData);
      setIsCharging(fetchedData.charge_customers);
      setCustomSongAmount(fetchedData.amount.category_6);
      setRegularSongAmounts([
        fetchedData.amount.category_7,
        fetchedData.amount.category_8,
        fetchedData.amount.category_9,
        fetchedData.amount.category_10,
      ]);
      setIsDataLoaded(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data');
    }
  };

  const handleSave = async () => {
    if (!isCharging) return;
    console.log("hooo")
    const updatedAmounts = {
      category_6: customSongAmount,
      category_7: regularSongAmounts[0],
      category_8: regularSongAmounts[1],
      category_9: regularSongAmounts[2],
      category_10: regularSongAmounts[3],
    };

    try {
     const response=  await axios.put(`https://stg.dhunjam.in/account/admin/${userId}`, { amount: updatedAmounts }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchDetails(); // Refresh data after update
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Error updating data');
    }
  };

  const isSaveDisabled = () => {
    if (!isCharging) return true;
    if (customSongAmount < 99) return true;
    for (let i = 0; i < regularSongAmounts.length; i++) {
      if (regularSongAmounts[i] < [79, 59, 39, 19][i]) return true;
    }
    return false;
  };

  const handleRegularAmountChange = (index, value) => {
    const updatedAmounts = [...regularSongAmounts];
    updatedAmounts[index] = value;
    setRegularSongAmounts(updatedAmounts);
  };

  if (!isDataLoaded) return <div>Loading...</div>;
  return (
    <div className="dashboard-container">
      <h1 className="venue-title">{data.name}, {data.location} on Dhun Jam</h1>
      
      <div className="charge-toggle">
        <span>Do you want to charge your customers for requesting songs?</span>
        <label>
          Yes
          <input type="radio" name="charge" checked={isCharging} onChange={() => setIsCharging(true)} />
        </label>
        <label>
          No
          <input type="radio" name="charge" checked={!isCharging} onChange={() => setIsCharging(false)} />
        </label>

      </div>
  
      <div className="amount-input">
        <label>
          Custom song request amount:
          <input type="number" value={customSongAmount} onChange={(e) => setCustomSongAmount(parseInt(e.target.value, 10))} disabled={!isCharging} min={99} />
        </label>
      </div>
  
      <div className="amount-input">
        <span>Regular song request amounts, from high to low:</span>
        {regularSongAmounts.map((amount, index) => (
          <input key={index} type="number" value={amount} onChange={(e) => handleRegularAmountChange(index, parseInt(e.target.value, 10))} disabled={!isCharging} min={[79, 59, 39, 19][index]} />
        ))}
      </div>
      {isCharging && <Graph data={graphData} />}
  
      <button className="save-button" onClick={handleSave} disabled={isSaveDisabled()}>Save</button>
    </div>
  );
  
};

export default AdminDashboard;
