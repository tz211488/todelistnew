import React from 'react';
import { MenuFoldOutlined } from '@ant-design/icons';

import styles from './index.less';

export interface SubPageHeaderProps {
  right?: React.ReactNode;
}
const collapseBtn = React.createRef();

export { collapseBtn };
const SubPageHeader: React.FC<SubPageHeaderProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <span>
          <MenuFoldOutlined />
        </span>
        <span className={styles.title}>今天</span>
      </div>
      <div className={styles.right}>{props.right}</div>
    </div>
  );
};

export default SubPageHeader;
