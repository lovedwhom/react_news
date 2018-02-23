import React from 'react';
import {Card} from 'antd';
import {BrowserRouter, Route, hashHistory, Link} from 'react-router-dom';

export default class PCNewBlock extends React.Component {

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
        const {news} = this.state;
        const newList = news.length
            ? news.map((newsItem,index) => (
                <li key={index}>
                    <Link to={`/details/${newsItem.uniquekey}`} target="_blank">
                        {newsItem.title}
                    </Link>
                </li>
            ))
            : '没有加载到任何新闻';
        return (
            <div class="topNewsList">
                <Card>
                    <ul>
                        {newList}
                    </ul>
                </Card>
            </div>
        )
    }

}