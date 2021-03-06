import React from 'react';
import {Row, Col,BackTop} from 'antd';

import PCHeader from './pc_header'
import PCFooter from './pc_footer';
import PCNewsImageBlock from './pc_news_images_bloack';
import CommonComments from './common_comments'


export default class PCNewsDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            newsItem: ''
        }
    }

    componentDidMount() {
        const myFetchOptions = {
            method: "GET"
        };
        console.log(this.props.match.params);
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.match.params.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
            this.setState({newsItem: json});
            document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台";
        });
    }

    createMarkup() {
        if(!!this.state.newsItem){
            return {__html:this.state.newsItem.pagecontent};
        }

    }

    render() {
        return (
            <div>
                <PCHeader></PCHeader>
                <Row>
                    <Col span={2}></Col>
                    <Col span={14} className="container">
                        <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                        <hr/>
                        <CommonComments uniquekey={this.props.match.params.uniquekey}></CommonComments>
                    </Col>
                    <Col span={6}>
                        <PCNewsImageBlock count={40} type="guonei" width="100%" cartTitle="国内新闻" imageWidth="132px"/>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <PCFooter></PCFooter>
                <BackTop></BackTop>
            </div>
        )
    }
}