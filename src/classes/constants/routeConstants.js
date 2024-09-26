export const BCG_ROOT_Name = '/';

export const PageRoutes = {
  MAIN: {
    path: '/',
    children: {
      SAMPLE_REPO: {  
        path: 'sample-repo',
        name: '样品库',
      },
      SAMPLE_DETAIL: {  
        path: 'sample-detail',
        name: '样品详情',
      },
      HOME: {
        path: 'home',
        name: '首页',
        children: {
          SAMPLE_REPO: {  
            path: 'sample-repo',
            name: '隐私政策',
          },
          PRIVACY_POLICY: {  
            path: 'privacy',
            name: '隐私政策',
          },
          USER_AGREEMENT: {  
            path: 'user',
            name: '用户协议',
          },
          BUYER_AGREEMENT: {  
            path: 'buyer',
            name: '买家须知',
          },
        }
      },
     
    }
  },
};
