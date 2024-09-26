import React, { Component, useRef, useState } from 'react';
import { Card, Carousel, message } from 'antd';
import ReactDOM from 'react-dom';
import BaseController from '../../base/base-controller';
import { Swiper, SwiperSlide } from 'swiper/react';
import { PageRoutes } from '../../../constants/routeConstants';

import { launchGetFactoryInfo } from '../../../redux/factory-model';

import '../../../styles/web/home/home.css'

import ARROW_LEFT from '../../../../resources/arrow_left.png';
import ARROW_RIGHT from '../../../../resources/arrow_right.png';
import { scaleSize } from '../../../utils/helper/ui-helper';

export default class FactoryPageController extends BaseController {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        };

        // const scrollContainerRef = useRef(null);

        this.weburi = props.weburi;
    }

    componentDidMount() {
        // this.requestFactoryInfo();
        window.addEventListener('resize', () => {
            this.setState({
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight
            });
        });
    }

    requestFactoryInfo() {
        this.changeLoadingState(true);

        // launchGetFactoryInfo(
        //     { weburi: this.weburi },
        //     res => {
        //         let { factory, samplerepolist } = res;

        //         if (factory.preview) factory.preview = JSON.parse(factory.preview);
               
        //         this.setState({
        //             factory,
        //             samplerepolist
        //         });
        //     },
        //     fail => {
        //         message.error(fail);
        //         this.changeLoadingState(false);
        //     }
        // );
    }

    render() {
        let { windowHeight, windowWidth } = this.state;
        let { factory, samplerepolist } = this.props;
        
        let categoryStr = undefined;
        if (factory.category) {
            let categoryArr = JSON.parse(factory.category);
            categoryStr = `主营类目：${categoryArr.join('、')}`;
        }

        let preview = undefined;
        if (factory.preview && factory.preview.length > 0) {
            preview = factory.preview[0];
        }

        if (!factory) return null;

        return (
            <div style={Styles.Container}>

                <div style={Styles.Content}>

                    {/* Banner */}
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                        {
                            factory.webpageview ?
                                <img src={factory.webpageview} style={{ width: '100%', height: windowWidth / 750. * 350, overflow: 'hidden', objectFit: 'cover' }} />
                                :
                                <img src={preview} style={{ width: '100%', height: windowWidth / 750. * 350, overflow: 'hidden', objectFit: 'cover' }} />
                        }
                    </div>

                    {/* 工厂信息 */}
                    <div style={Styles.InfoView}>
                        {
                            factory ?
                                <img style={Styles.InfoBg} src="https://qiniu-media.soso-code.com/factory/app/4ef9f1d3cf804f6da5c1dc06cf4f4f8f.png" mode="cover" />
                                :
                                null
                        }
                        

                        <div style={Styles.TitleBar}>
                            <div style={Styles.TitleLeftBox}>
                                {
                                    factory.logo ?
                                        <img style={Styles.FactoryLogoPlaceholder} src={ factory.logo + '?imageView2/2/w/400/h/400/q/75' } />
                                        :
                                        <img style={Styles.FactoryLogoPlaceholder} src="https://qiniu-media.soso-code.com/factory/app/10d9bd40de62448ba5ad6488abcd8c17.png" />
                                }
                                
                            </div>

                            <div style={Styles.TitleRightBox}>
                                <div style={Styles.FactoryNameBox}>
                                    <span style={Styles.FactoryName}>{ factory.title }</span>
                                </div>
                            </div>
                        </div>

                        {
                            factory.address ?
                                <div style={Styles.AddressBar}>
                                    <div style={Styles.AddressLeftbox}>
                                        <span style={Styles.FactoryAddress}>{ factory.address }</span>
                                    </div>

                                    <div style={Styles.AddressRightBox}>
                                        <div style={Styles.NavBtn} onClick={() => {
                                            window.location.href = `weixin://dl/business/?appid=wx0c4e83d1ef823755&path=pages/factory/factory-home/factory-home&query=id=${factory.id}`;
                                            
                                        }}>
                                            <img style={Styles.NavBtnIcon} src="https://qiniu-media.soso-code.com/factory/app/8db0e10afdf14a6aac8e2b4a31531ac5.png" />
                                        </div>

                                        <div style={Styles.PhoneBtn} onClick={() => {
                                            window.location.href = `weixin://dl/business/?appid=wx0c4e83d1ef823755&path=pages/factory/factory-home/factory-home&query=id=${factory.id}`;
                                        }}>
                                            <img style={Styles.PhoneBtnIcon} src="https://qiniu-media.soso-code.com/factory/app/41fd73b013c9430b8745fa4e469a39a6.png" />
                                        </div>
                                    </div>
                                </div>
                                :
                                null
                        }
                        

                        <div style={Styles.ViewSep} />

                        {
                            factory.category ?
                                <div style={Styles.CategoryBar}>
                                    <span style={Styles.FactoryCategory}>主营类目：{ categoryStr }</span>
                                </div>
                                :
                                null
                        }

                        <div style={Styles.ViewSep} />

                        {
                            factory.factorybrief ?
                                <div style={Styles.CategoryBar}>
                                    <span style={Styles.FactoryCategory}>{ factory.factorybrief }</span>
                                </div>
                                :
                                null
                        }
                        
                        
                    </div>
                    
                    {/* 样品库 */}
                    <div style={Styles.Sampleview}>
                        <div style={Styles.SegBar}>
                            <div style={Styles.SegItem}>
                                <img style={Styles.SegTitleBg} src="https://qiniu-media.soso-code.com/factory/app/c719085b2d154097b215274dd687c069.png" />
                                <span style={Styles.SegTitle}>样品间</span>
                                <img style={Styles.SegTitleBg} src="https://qiniu-media.soso-code.com/factory/app/a194256b3a374040b5603aa990fc1a1f.png" />
                            </div>
                        </div>
                    </div>

                    <div style={Styles.RepoView}>
                        {
                            samplerepolist && samplerepolist.map((aRepo, repoIndex) => {
                                return (
                                    <div key={`repo_${repoIndex}`} style={Styles.RepoItem}>
                                        <div style={Styles.RepoItemHeader}>
                                            <div style={Styles.RepoItemHeaderLeftBox}>
                                                <span style={Styles.RepoItemTitle}>{ aRepo.title }</span>
                                            </div>
        
                                            <div style={Styles.RepoItemHeaderRightBox}>
                                                <div style={Styles.CheckAllBtn}  onClick={() => {
                                                        // window.location.href = `${window.location}/${PageRoutes.MAIN.children.SAMPLE_REPO.path}?srid=${aRepo.id}`;
                                                        // window.open(`${window.location}/${PageRoutes.MAIN.children.SAMPLE_REPO.path}?srid=${aRepo.id}`, '__samplerepo');
                                                        window.location.href = `weixin://dl/business/?appid=wx0c4e83d1ef823755&path=pages/factory/factory-home/factory-home&query=id=${factory.id}`;
                                                    }}>
                                                    <span style={Styles.RepoItemTip}>查看全部</span>
                                                    <img style={Styles.RepoItemTipArrow} src="https://qiniu-media.soso-code.com/factory/app/c372ee69e5a146a9905ce41186a256f7.png" mode="aspectFit" />
                                                </div>
                                            </div>
                                        </div>
        
                                        <div style={Styles.RepoItemDescBox}>
                                            <span style={Styles.RepoItemDesc}>{ aRepo.brief }</span>
                                        </div>
        
                                        <div style={Styles.SampleList}>

                                            {
                                                aRepo.samples && aRepo.samples.map((aSample, sampleIndex) => {
                                                    return (
                                                        <div style={Styles.SampleItem} onClick={() => {
                                                            window.location.href = `weixin://dl/business/?appid=wx0c4e83d1ef823755&path=pages/factory/factory-home/factory-home&query=id=${factory.id}`;
                                                            // window.open(`${window.location}/${PageRoutes.MAIN.children.SAMPLE_DETAIL.path}?sid=${aSample.id}`, '__sample');
                                                            // window.location.href = `${window.location}/${PageRoutes.MAIN.children.SAMPLE_DETAIL.path}?sid=${aSample.id}`;
                                                        }}>
                                                            <div style={Styles.SampleImgBox}>
                                                                <img style={Styles.SampleImg} src={ aSample.logo ? aSample.logo + '?imageView2/2/w/400/h/400/q/75' : 'https://qiniu-media.soso-code.com/factory/app/10d9bd40de62448ba5ad6488abcd8c17.png' } mode="aspectFill" />
                                                            </div>
                
                                                            <div style={Styles.SampleTitleBox}>
                                                                <span style={Styles.SampleTitle}>{ aSample.title }</span>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
        
                                        </div>
                                    </div>
                                )
                                
                            })
                        }
                    </div>

                    <div style={Styles.Gap} />
                </div>

                <div style={{ position: 'fixed', zIndex: 999, bottom: 40, width: scaleSize(300), height:40, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#C0A98C', boxShadow: '1px 5px 5px 0px rgba(0, 0, 0, 0.2)',  }} 
                    onClick={() => {
                        window.location.href = `weixin://dl/business/?appid=wx0c4e83d1ef823755&path=pages/factory/factory-home/factory-home&query=id=${factory.id}`;
                    }}
                >
                    <span style={{ fontSize: 14, color: '#fff' }}>在微信小程序中打开</span>
                </div>
            </div>
        );
    }
}

const Styles = {
    Container: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', position: 'relative', 
        // backgroundColor: '#FAF8F4'
        backgroundColor: '#fff'
    },
    Content: { display: 'flex', width: '100%', height: '100%', flexDirection: 'column', alignItems: 'center', position: 'relative' },
    InfoBox: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    FactoryLogoAndName: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    FactoryLogo: {
        width: 50,
        height: 50,  
    },
    FactoryName: {
        fontSize: 26,
        fontWeight: 500,
        color: '#000',
        marginLeft: 10
    },
    BannerItem: {
        display: 'flex',
        with: scaleSize(750),
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 350,
        overflow: 'hidden'
    },
    BannerImg: {
        width: scaleSize(750),
        height: 350,
        objectFit: 'cover',
        overflow: 'hidden'
    },
    InfoView: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        zIndex: 1,
    },
    InfoBg: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        bottom: 0,
        zIndex: 0,
        opacity: 0.3,
        objectFit: 'cover'
    },
    TitleBar: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        zIndex: 10
    },
    TitleLeftBox: {
        display: 'flex',
        flexDirection: 'column'
    },
    FactoryLogoPlaceholder: {
        width: scaleSize(110),
        height: scaleSize(110),
        borderRadius: scaleSize(55),
        /* margin-top: 20rpx; */
        marginLeft: 10
    },
    TitleRightBox: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    },
    FactoryNameBox: {
        display: 'flex',
        flexDirection: 'row',
        width: scaleSize(620),
    },
    FactoryName: {
        fontSize: 19,
        color: '#000',
        /* color: #fff; */
        marginLeft: scaleSize(30),
        marginRight: scaleSize(20),
    },
    AddressBar: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        zIndex: 10,
    },
    AddressLeftbox: {
        width: scaleSize(450),
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
    },
    FactoryAddress: {
        fontSize: 13,
        fontWeight: 600,
        color: '#000',
        width: scaleSize(500),
        marginLeft: scaleSize(30),
        marginRight: scaleSize(20),
        wordRreak: 'break-all',
    },
    AddressRightBox: {
        display: 'flex',
        width: scaleSize(200),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    NavBtn: {
        display: 'flex',
        width: scaleSize(60),
        height: scaleSize(60),
        marginRight: scaleSize(40),
        alignItems: 'center',
        justifyContent: 'center'
    },
    NavBtnIcon: {
        width: scaleSize(45),
        height: scaleSize(45)
    },
    PhoneBtn: {
        display: 'flex',
        width: scaleSize(60),
        height: scaleSize(60),
        marginRight: scaleSize(40),
        alignItems: 'center',
        justifyContent: 'center'
    },
    PhoneBtnIcon: {
        width: scaleSize(45),
        height: scaleSize(45)
    },
    ViewSep: {
        width: scaleSize(710),
        marginLeft: scaleSize(20),
        height: 0.5,
        backgroundColor: '#fff',
        opacity: 0.1,
    },
    CategoryBar: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10
    },
    FactoryCategory: {
        fontSize: 13,
        fontWeight: 600,
        color: '#000',
        /* color: #fff; */
        marginLeft: scaleSize(30),
        marginRight: scaleSize(30)
    },
    Sampleview: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    SegBar: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    SegItem: {
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40
    },
    SegTitleBg: {
        width: scaleSize(200),
        height: 23.5,
        zIndex: 0,
    },
    SegTitle: {
        fontSize: 16,
        color: '#000',
        zIndex: 1,
        marginLeft: scaleSize(20),
        marginRight: scaleSize(20),
    },
    RepoView: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    RepoItem: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#fff',
        paddingTop: 15,
        paddingBottom: 15,
    },
    RepoItemHeader: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
    RepoItemHeaderLeftBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    RepoItemTitle: {
        fontSize: 16,
        color: '#000',
        marginLeft: scaleSize(40)
    },
    RepoItemHeaderRightBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    CheckAllBtn: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    RepoItemTip: {
        fontSize: 11,
        color: '#999',
        marginRight: scaleSize(10)
    },
    RepoItemTipArrow: {
        width: scaleSize(22),
        height: scaleSize(22),
        marginRight: scaleSize(20)
    },
    RepoItemDescBox: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginTop: 5
    },
    RepoItemDesc: {
        fontSize: 11,
        color: '#666',
        marginLeft: scaleSize(40),
        marginRight: scaleSize(40),
        wordBreak: 'break-all'
    },
    SampleList: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        marginTop: 20
    },
    SampleItem: {
        display: 'flex',
        flexDirection: 'column',
        width: scaleSize(250),
        marginBottom: 10
    },
    SampleImgBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: scaleSize(250),
        height: scaleSize(250)
    },
    SampleImg: {
        width: scaleSize(230),
        height: scaleSize(230),
    },
    SampleTitleBox: {
        display: 'flex',
        flexDirection: 'row',
        width: scaleSize(250)
    },
    SampleTitle: {
        fontSize: 13,
        color: '#333',
        marginLeft: scaleSize(20),
        marginRight: scaleSize(20)
    },

    Gap: {
        width: '100%',
        height: 5,
        backgroundColor: '#F5F4F8'
    }
}