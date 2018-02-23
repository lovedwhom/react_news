import React from 'react';
import ReactDOM from 'react-dom';

import {Button} from 'antd';
import 'antd/dist/antd.css';

import PCIndex from './component/pc_index';
import MediaQuery from 'react-responsive';
import MobileIndex from './component/mobile_index';
import MobileUserCenter from './component/mobile_usercenter'
import PCUserCenter from './component/pc_usercenter'
import PCNewsDetails from './component/pc_news_details';
import MobileNewsDetails from './component/mobile_news_details'

import {BrowserRouter as Router, Route, Switch, hashHistory} from 'react-router-dom';


export default class Root extends React.Component {
    render() {
        return (
            <div>
                <MediaQuery query='(min-device-width:1224px)'>
                    <Router history={hashHistory}>
                        <Switch>
                            <Route exact strict path="/" component={PCIndex}></Route>
                            <Route component={PCNewsDetails} path="/details/:uniquekey"></Route>
                            <Route component={PCUserCenter} path="/usercenter"></Route>

                        </Switch>
                    </Router>

                </MediaQuery>
                <MediaQuery query='(max-device-width:1224px)'>
                    <Router history={hashHistory}>
                        <Switch>
                            <Route exact path="/" component={MobileIndex}></Route>
                            <Route component={MobileNewsDetails} path="/details/:uniquekey"></Route>
                            <Route component={MobileUserCenter} path="/usercenter"></Route>
                        </Switch>
                    </Router>
                </MediaQuery>

            </div>
        )
    }
}

ReactDOM.render(<Root/>, document.getElementById('mainContainer'));
