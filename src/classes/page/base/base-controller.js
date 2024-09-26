import React from 'react';

import { PageHeader } from '@ant-design/pro-layout';
import { Header } from 'antd/lib/layout/layout';

export default class BaseController extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        }

        this.isLoading = false;
        this.changeLoadingState = this.changeLoadingState.bind(this);
    }

    changeLoadingState(state) {
        this.isLoading = state;
        this.setState({ isLoading: state });
    }

    renderPageHeader(params) {
        // if (params.onBack) {
        //     return (
        //         <div style={{ position: 'fixed', zIndex: 20, width: '100%', paddingRight: '200px' }}>
        //             <PageHeader 
        //                 style={{ height: '50px', width: '100%',  }}
        //                 onBack={params.onBack}  
        //                 title={params.title}
        //                 subTitle={ params.subTitle ? params.params : '' }
        //                 tags={ params.tags ? params.tags : [] }
        //                 extra={params.extra ? params.extra : undefined}
        //             />
        //         </div>
        //     );
        // } else {
            return (
                <div style={{ position: 'fixed', zIndex: 20, width: '100%', backgroundColor: '#fff', paddingRight: '200px' }}>
                    {
                        params.onBack ? 
                            <PageHeader 
                                style={{ height: '50px', width: '100%',  }}
                                onBack={params.onBack}  
                                title={params.title}
                                subTitle={ params.subTitle ? params.params : '' }
                                tags={ params.tags ? params.tags : [] }
                                extra={params.extra ? params.extra : undefined}
                            />
                            :
                            <PageHeader 
                                style={{ height: '50px', width: '100%',  }}
                                title={params.title}
                                subTitle={ params.subTitle ? params.params : '' }
                                tags={ params.tags ? params.tags : [] }
                                extra={params.extra ? params.extra : undefined}
                            />
                    }
                </div> 
            );
        // }
    }
}