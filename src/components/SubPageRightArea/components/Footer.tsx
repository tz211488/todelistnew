import React from 'react';
import { ReconciliationOutlined, DeleteOutlined } from '@ant-design/icons';

const Footer: React.FC<{}> = () => {
  return (
    <div className="h-12 border-top border-bottom flex justify-between items-center px-8">
      <div>
        <span className="text-sm flex space-x-2">
          <span className="flex items-center">
            <ReconciliationOutlined />
          </span>

          <span className="text-xs">收集箱</span>
        </span>
      </div>
      <div>
        <span className="flex items-center">
          <DeleteOutlined />
        </span>
      </div>
    </div>
  );
};

export default Footer;
