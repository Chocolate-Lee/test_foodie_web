import React, { Component } from 'react';

import HOME from '../home/home';

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

export default class AppController extends Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,

            showWXDownlaodTip: false
        };

       
    }

    componentDidMount() {
        window.addEventListener('resize', () => {
            this.setState({
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight
            });
        });

        let u = navigator.userAgent, app = navigator.appVersion;
        this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        this.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
        var ua = navigator.userAgent.toLowerCase();  
        
        if(ua.match(/MicroMessenger/i)=="micromessenger") {  
            this.isWX = true;  
        } else {  
            this.isWX = false;
        }  
    }

    render() {
        let { windowWidth, windowHeight } = this.state;

        return (
            <div style={{ display: 'flex', width: windowWidth, minHeight: windowHeight, flexDirection: 'column', backgroundColor: '#fff', position: 'relative', alignItems: 'center' }}>
                <div style={{ display: 'flex', width: '100%', minHeight: '100%', flexDirection: 'row', backgroundColor: '#fff', position: 'relative', alignItems: 'center', marginBottom: 60 }}>
                    <HOME weburi={this.weburi} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', 
                    width: '100%',
                    backgroundColor: '#F5F5F5',
                    position: 'absolute', 
                    paddingBottom: 10,
                    paddingTop: 10,
                    bottom: 0 }}>
                </div>
            </div>
        );
    }
}