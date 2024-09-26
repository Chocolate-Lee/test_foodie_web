import React, { Component, useRef, useState } from 'react';
import { Card, Carousel, message } from 'antd';
import ReactDOM from 'react-dom';
import BaseController from '../../base/base-controller';
import { Swiper, SwiperSlide } from 'swiper/react';

import { launchGetFactoryInfo } from '../../../redux/food-truck-model';

import '../../../styles/web/home/home.css'


import { PageRoutes } from '../../../constants/routeConstants';

export default class HomeController_M extends BaseController {
    constructor(props) {
        super(props);

        let pageUri = undefined;
        if (window.location.pathname) {
            let tmp = window.location.pathname.split('/');
            if (tmp.length > 1) {
                this.weburi = tmp[1];
            }
            if (tmp.length > 2) {
                pageUri = tmp[2];
            }
            
        }

        this.state = {
            factory: {},
            pageUri
        };

        this.renderPage = this.renderPage.bind(this);
    }

    componentDidMount() {
        this.requestFactoryInfo();
        window.addEventListener('resize', () => {
            this.setState({
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight
            });
        });
    }

    requestFactoryInfo() {
        // this.changeLoadingState(true);

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
        let { windowHeight } = this.state;


        return (
            <div style={Styles.Container}>

                <div style={Styles.Content}>
                    
                  

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
    Content: { display: 'flex', width: '100%', backgroundColor: '#fff', height: '100%', flexDirection: 'column', alignItems: 'center', position: 'relative' },
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
        with: 800,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // width: 480,
        height: 374,
        
        
    },
    BannerImg: {
        
        width: 800,
        height: 374,
        objectFit: 'cover'
    }
}