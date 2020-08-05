import React from 'react';
import { PageHeaderProps } from 'antd/es/page-header';

import SubPageHeader from '@/components/SubPageHeader';
import SubContent from './components/Content';

// const HeaderRightContent: React.FC<{}> = () => {
//   return <div>asdfas</div>;
// };

// const SubHeader: React.FC<PageContainerProps> = () => {
//   return <SubPageHeader right={<HeaderRightContent />} />;
// };

const TodayList: React.FC<PageHeaderProps> = () => (
  <>
    <SubPageHeader />
    <SubContent />
  </>
);

export default TodayList;
