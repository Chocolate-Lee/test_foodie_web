import React, { Component, useRef, useState } from 'react';
import { Input, Button } from 'antd';
import ReactDOM from 'react-dom';
import BaseController from '../../base/base-controller';
import { Swiper, SwiperSlide } from 'swiper/react';

import { launchGetFoodTruckList } from '../../../redux/food-truck-model';

import '../../../styles/web/home/home.css'

import LOCATION_ICON from '../../../../resources/location.png';
import FOOD_ICON from '../../../../resources/food.png';
import { SearchOutlined } from '@ant-design/icons';

import { PageRoutes } from '../../../constants/routeConstants';

export default class HomeController extends BaseController {
    constructor(props) {
        super(props);

        this.state = {
            windowHeight: window.innerHeight,
            
            foodTruckList: [],
            queryParams: {}
        };

        this.requestGetFoodTruckList = this.requestGetFoodTruckList.bind(this);
    }

    componentDidMount() {

        this.requestGetFoodTruckList();

        
        window.addEventListener('resize', () => {
            this.setState({
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight
            });
        });
    }

    requestGetFoodTruckList() {
        
        this.changeLoadingState(true);

        let { queryParams } = this.state;
        // console.log(queryParams, 'queryParams');
        launchGetFoodTruckList(
            { ...queryParams },
            res => {
                let { foodTruckList, showDistance } = res;

                for (let i = 0; i < foodTruckList.length; i++) {
                    let aFoodTruck = foodTruckList[i];
                    let foodList = [];
                    if (aFoodTruck.foodItems !== undefined && aFoodTruck.foodItems !== null) {
                        foodList = aFoodTruck.foodItems.split(': ');
                    }
                    aFoodTruck.foodList = foodList;
                }

                // console.log(foodTruckList);

                this.setState({
                    foodTruckList,
                    showDistance
                });
            },
            fail => {
                this.changeLoadingState(false);
            }
        );
    }

    render() {
        let { windowHeight, foodTruckList, queryParams, showDistance } = this.state;

        return (
            <div style={Styles.Container}>

                <div style={Styles.Content}>

                    {/* Search Bar */}
                    <div style={Styles.SearchBar}>
                        <div style={Styles.QueryItem}>
                            <span>Latitude：</span>
                            <Input placeholder="Input latitude..." style={Styles.QueryInput} 
                                onChange={(e) => {
                                    let inputText = e.target.value;
                                    this.state.queryParams.latitude = Number(inputText);
                                    this.setState({ queryParams: this.state.queryParams })
                                }} />
                        </div>
                        <div style={Styles.QueryItem}>
                            <span>Longitude：</span>
                            <Input placeholder="Input longitude：..." style={Styles.QueryInput} 
                                onChange={(e) => {
                                    let inputText = e.target.value;
                                    this.state.queryParams.longitude = Number(inputText);
                                    this.setState({ queryParams: this.state.queryParams })
                                }} />
                        </div>
                        <div style={Styles.QueryItem}>
                            <span>Food：</span>
                            <Input placeholder="Input food..." style={Styles.QueryInput} value={this.state.queryParams.food} 
                                onChange={(e) => {
                                    let inputText = e.target.value;
                                    this.state.queryParams.food = inputText;
                                    this.setState({ queryParams: this.state.queryParams })
                                }} />
                        </div>

                        <Button style={Styles.SearchBtn} type="primary" size="small" icon={<SearchOutlined />} iconPosition="start" onClick={this.requestGetFoodTruckList}>Search</Button>
                    </div>

                    {/* Truck List */}
                    <div style={Styles.FoodTruckList}>

                        <div style={Styles.FoodTruckItem}>

                            {
                                foodTruckList && foodTruckList.map((aFoodTruck, foodTruckIndex) => {
                                    
                                    return (
                                        <div key={`food_truck_${foodTruckIndex}`} style={Styles.FoodTruckItem}>
                                            <div style={Styles.FoodTruckItemContent}>
                                                {/* title */}
                                                <div style={Styles.FoodTruckTitleBox}>
                                                    <span style={Styles.Applicant}>{aFoodTruck.applicant}</span>
                                                    <span style={Styles.FacilityType}>- {aFoodTruck.facilityType}</span>
                                                    {
                                                        showDistance ?
                                                            <span style={Styles.Distance}>distance: {aFoodTruck.distance.toFixed(2)}km</span>
                                                            :
                                                            null
                                                    }
                                                </div>

                                                {/* info */}
                                                <div style={Styles.FoodTruckInfoBox}>
                                                    <div style={Styles.AddressBar}>
                                                        <img src={LOCATION_ICON} style={Styles.LocationIcon} />
                                                        <span style={Styles.Address}>{aFoodTruck.address}</span>
                                                        <span style={Styles.LocationDescription}>{aFoodTruck.locationDescription}</span>
                                                    </div>
                                                </div>

                                                {/* tag */}
                                                <div style={Styles.FoodTruckTagBox}>
                                                    <img src={FOOD_ICON} style={Styles.LocationIcon} />
                                                    
                                                    <div style={Styles.FoodItemList}>
                                                        {
                                                            aFoodTruck.foodList && aFoodTruck.foodList.map((aFood, foodIndex) => {
                                                                return (
                                                                    <div key={`food_${foodIndex}`} style={Styles.FoodItem}>
                                                                        <span style={Styles.FoodName}>{aFood}</span>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                            <div style={Styles.ItemSep} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

const Styles = {
    Container: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', position: 'relative', backgroundColor: '#fff' },
    Content: { display: 'flex', width: '100%', backgroundColor: '#fff', height: '100%', flexDirection: 'column', alignItems: 'center', position: 'relative' },
    LeftList: {
        display: 'flex',
        position: 'absolute',
        flexDirection: 'column',
        width: 300,
        left: 0, 
        top: 0,
    },


    SearchBar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '80%',
        marginTop: 20,
    },
    QueryItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20
    },
    QueryInput: {
        width: 200,
        height: 30,
    },
    SearchBtn: {
        marginLeft: 20
    },


    FoodTruckList: {
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        marginTop: 40
    },
    FoodTruckItem: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    FoodTruckItemContent: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        paddingTop: 5,
        paddingBottom: 5
    },
    FoodTruckTitleBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    Applicant: {
        fontSize: 20,
        color: '#000',
        fontWeight: 800,
        marginLeft: 20
    },
    FacilityType: {
        fontSize: 16,
        marginLeft: 20
    },
    Distance: {
        fontSize: 14,
        color: '#999',
        marginLeft: 20
    },
    FoodTruckInfoBox: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 10
    },
    AddressBar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    LocationIcon: {
        width: 20,
        height: 20,
        marginLeft: 20
    },
    Address: {
        
        marginLeft: 10
    },
    LocationDescription: {
        fontSize: 12,
        color: '#999',
        marginLeft: 10
    },
    FoodTruckTagBox: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15
    },
    FoodItemList: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 10
    },
    FoodItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5px 10px',
        backgroundColor: '#2db7f5',
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 4,
    },
    FoodName: {
        color: '#fff',
        fontSize: 12
    },



    ItemSep: {
        width: '100%',
        height: 1,
        backgroundColor: '#F0F0F0'
    }
   
}