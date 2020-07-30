import React from 'react';
import { MenuFoldOutlined } from '@ant-design/icons';
import { connect, Dispatch } from 'umi';

import styles from './index.less';

export interface SubPageHeaderProps {
  right?: React.ReactNode;
  dispatch: Dispatch;
}
const collapseBtn = React.createRef();

export { collapseBtn };
const SubPageHeader: React.FC<SubPageHeaderProps> = (props) => {
  const { dispatch } = props;
  const toggleCollapsed = (): void => {
    if (dispatch) {
      dispatch({
        type: 'global/toggleCollapsed',
      });
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <span>
          <MenuFoldOutlined onClick={toggleCollapsed} />
        </span>
        <span className={styles.title}>今天</span>
      </div>
      <div className={styles.right}>{props.right}</div>
    </div>
  );
};

export default connect(() => ({}))(SubPageHeader);
