import React from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { connect, Dispatch } from 'umi';
import { ConnectState } from '@/models/connect';

import styles from './index.less';

export interface SubPageHeaderProps {
  right?: React.ReactNode;
  dispatch: Dispatch;
  collapsed: boolean;
}

const SubPageHeader: React.FC<SubPageHeaderProps> = (props) => {
  const { dispatch, collapsed } = props;
  const toggleCollapsed = (): void => {
    if (dispatch) {
      dispatch({
        type: 'global/toggleCollapsed',
      });
    }
  };
  const CollapsedBtn = () => {
    if (collapsed) {
      return <MenuUnfoldOutlined />;
    }

    return <MenuFoldOutlined />;
  };

  return (
    <div className="flex justify-between h-16 bg-white">
      <div className="flex items-center space-x-4 px-4">
        <span
          className="text-gray-600 hover:text-gray-800 text-xl leading-none cursor-pointer"
          onClick={toggleCollapsed}
        >
          <CollapsedBtn />
        </span>
        <span className={styles.title}>今天</span>
      </div>
      <div className={styles.right}>{props.right}</div>
    </div>
  );
};

export default connect(({ global }: ConnectState) => ({
  collapsed: global.collapsed,
}))(SubPageHeader);
