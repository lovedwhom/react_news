import React from 'react';
import {Card} from 'antd';
import {BrowserRouter, Route, hashHistory, Link} from 'react-router-dom';

export default class PCNewsInageBlock extends React.Component {

    constructor() {
        super();
        this.state = {
            news: ''
        }
    }

    componentWillMount() {
        var myFetchOptions = {
            method: "get"
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type
            + "&count=" + this.props.count, myFetchOptions)
            .then(response => response.json())
            .then(json => this.setState({news: json}))
    }

    render() {
        const styleImage={
            display:'block',
            width:this.props.imageWidth,
            height:'90px'
        };
        const styleH3={
            width:this.props.imageWidth,
            whiteSpace:"nowrap",
            overflow:'hidden',
            textOverflow:'ellipsis'
        };
        const {news} = this.state;
        const newsList = news.length
            ? news.map((newsItem,index) => (
                <div key={index} class="imageblock">
                    <Link to={`/details/${newsItem.uniquekey}`} target="_blank">
                       <div className="custom-image">
                           <img style={styleImage} src={newsItem.thumbnail_pic_s}/>
                       </div>
                        <div class="custom-card">
                            <h3 style={styleH3}>
                                {newsItem.title}
                            </h3>
                            <p style={styleH3}>{newsItem.author_name}</p>
                        </div>
                    </Link>
                </div>
            ))
            : '没有加载到任何新闻';
        return (
            <div class="topNewsList">
                <Card title={this.props.cartTitle} bordered={true} style={{width:this.props.width}}>
                    {newsList}
                </Card>
            </div>
        )
    }

}