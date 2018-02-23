import React from 'react';
import ReactDOM from 'react-dom';
import {Row, Col, Tabs, Carousel} from 'antd';
import PCNewsImageBlock from './pc_news_images_bloack';

import PCNewBlock from './pc_news_block'

import PCProduct from './pc_products';

const TabPane = Tabs.TabPane;

export default class PCNewsContainer extends React.Component {
    constructor() {
        super()
    }

    render() {
        const setting = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            autoplay: true,
            draggable:true,
            // pauseOnHover:true,
        };

        return (
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} class="container">
                        <div className="leftContainer">
                            <div className="Carousel">
                                <Carousel {...setting}>
                                    <div><img src="./src/images/carousel_1.jpg"/></div>
                                    <div><img src="./src/images/carousel_2.jpg"/></div>
                                    <div><img src="./src/images/carousel_3.jpg"/></div>
                                    <div><img src="./src/images/carousel_4.jpg"/></div>
                                </Carousel>
                            </div>
                            <PCNewsImageBlock count={6} type="guoji" width="400px" cartTitle="国际头条" imageWidth="112px"></PCNewsImageBlock>
                        </div>
                        <Tabs class="tabs_news"
                              defaultActiveKey="1"
                        >
                            <TabPane tab="新闻" key="1">
                                <PCNewBlock count={22} type="top" width="100%" bordered="false"/>
                            </TabPane>
                            <TabPane tab="国际" key="2">
                                <PCNewBlock count={22} type="guoji" width="100%" bordered="false"/>
                            </TabPane>
                        </Tabs>
                        <Tabs class="tabs_product">
                            <TabPane tab="ReactNews 产品" key="1">
                                <PCProduct/>
                            </TabPane>
                        </Tabs>
                        <div>
                            <PCNewsImageBlock count={8} type="guonei" width="100%" cartTitle="国内新闻" imageWidth="132px"/>
                            <PCNewsImageBlock count={16} type="yule" width="100%" cartTitle="娱乐新闻" imageWidth="132px"/>
                        </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }
}