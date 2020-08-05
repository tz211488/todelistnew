import React, { useState } from 'react';
import {
  BorderOutlined,
  CalendarOutlined,
  OrderedListOutlined,
  CheckSquareOutlined,
} from '@ant-design/icons';

const Header: React.FC<{}> = () => {
  const [isChecked, setChecked] = useState(false);

  const toggleChecked = () => {
    console.log('sad');
    setChecked(!isChecked);
  };

  return (
    <div className="flex justify-between h-16 bg-white px-8 border-bottom">
      <div className="flex items-center space-x-4 px-4">
        <span
          className="text-gray-600 hover:text-gray-800 text-xl leading-none cursor-pointer"
          onClick={toggleChecked}
        >
          {isChecked ? <BorderOutlined /> : <CheckSquareOutlined />}
        </span>
        <span className="text-gray-600 hover:text-gray-800 text-xl leading-none cursor-pointer">
          <CalendarOutlined />
        </span>
      </div>
      <div className="flex items-center space-x-4 px-4">
        <span className="text-gray-600 hover:text-gray-800 text-xl leading-none cursor-pointer">
          <OrderedListOutlined />
        </span>
      </div>
    </div>
  );
};

export default Header;
