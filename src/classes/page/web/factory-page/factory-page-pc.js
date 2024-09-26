import React, { Component, useRef, useState } from 'react';
import { Card, Carousel, message } from 'antd';
import ReactDOM from 'react-dom';
import BaseController from '../../base/base-controller';
import { Swiper, SwiperSlide } from 'swiper/react';
import { PageRoutes } from '../../../constants/routeConstants';
import {QRCodeCanvas} from 'qrcode.react';

import { launchGetFactoryInfo } from '../../../redux/factory-model';

import '../../../styles/web/home/home.css'

import ARROW_LEFT from '../../../../resources/arrow_left.png';
import ARROW_RIGHT from '../../../../resources/arrow_right.png';

export default class FactoryPageController extends BaseController {
    constructor(props) {
        super(props);

        this.state = {
            
        };
    }

    componentDidMount() {
        window.addEventListener('resize', () => {
            this.setState({
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight
            });
        });
    }

    requestFactoryInfo() {
        this.changeLoadingState(true);
    }

    render() {
        let { windowHeight, windowWidth } = this.state;

        return (
            <div style={Styles.Container}>

               
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