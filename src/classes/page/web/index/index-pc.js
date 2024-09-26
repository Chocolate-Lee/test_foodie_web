import React, { Component } from 'react';
import { PageRoutes } from '../../../constants/routeConstants';

import HOME_PC from '../home/home-pc';

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';


export default class AppController_PC extends Component {
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
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            pageUri,
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

    render() {
        let { windowWidth, windowHeight } = this.state;

        return (
            <div style={{ display: 'flex', width: windowWidth, minHeight: windowHeight, flexDirection: 'column', backgroundColor: '#fff', position: 'relative', alignItems: 'center' }}>
                <div style={{ display: 'flex', width: '100%', minHeight: '100%', flexDirection: 'row', backgroundColor: '#fff', position: 'relative', alignItems: 'center', marginBottom: 60 }}>
                    <HOME_PC />

                
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', 
                    width: '100%',
                    backgroundColor: '#F5F5F5',
                    position: 'absolute', 
                    paddingBottom: 10,
                    paddingTop: 10,
                    bottom: 0 }}>
                    
                    <span style={{ fontSize: '12px', marginTop: 5, cursor: 'default' }}><span style={{ marginLeft: 30 }}></span></span>
                    <span style={{ fontSize: '12px', marginTop: 5, cursor: 'default' }}></span>
                </div>
            </div>
        );
    }
}

