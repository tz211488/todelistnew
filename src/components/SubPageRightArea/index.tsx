import React from 'react';
import { connect } from 'umi';
import { ConnectState } from '@/models/connect';
import SubPageHeader from './components/Header';
import SubPageContent from './components/Content';
import SubPageFooter from './components/Footer';

interface SubPageRightContentProps {
  title?: string;
}

const SubPageRightContent: React.FC<SubPageRightContentProps> = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <SubPageHeader />
      <SubPageContent className="flex-auto" />
      <SubPageFooter />
    </div>
  );
};

export default connect(({ global }: ConnectState) => ({
  collapsed: global.collapsed,
}))(SubPageRightContent);
