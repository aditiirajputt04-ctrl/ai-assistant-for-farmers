
import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { MandiPrice } from '../types';

interface Props {
  item: MandiPrice;
}

const MandiRow: React.FC<Props> = ({ item }) => {
  return (
    <div className="bg-white p-4 rounded-2xl border border-green-100 flex items-center justify-between shadow-sm active:bg-gray-50 transition-colors">
      <div className="flex-1">
        <h3 className="font-bold text-gray-800">{item.crop}</h3>
        <p className="text-xs text-gray-500 font-medium">{item.mandi}, {item.state}</p>
      </div>
      
      <div className="text-right flex items-center space-x-3">
        <div>
          <p className="text-lg font-black text-green-700">₹{item.price}</p>
          <p className="text-[10px] text-gray-400 uppercase font-bold">per {item.unit}</p>
        </div>
        <div className={`p-2 rounded-xl ${
          item.trend === 'up' ? 'bg-green-100 text-green-600' : 
          item.trend === 'down' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400'
        }`}>
          {item.trend === 'up' && <TrendingUp size={18} />}
          {item.trend === 'down' && <TrendingDown size={18} />}
          {item.trend === 'stable' && <Minus size={18} />}
        </div>
      </div>
    </div>
  );
};

export default MandiRow;
