import React from 'react';
import {Row, Col} from 'antd';
import {
    Menu,
    Icon,
    Tabs,
    message,
    Form,
    Input,
    Button,
    CheckBox,
    Modal,
    Card,
    notification
} from 'antd';

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
import {Router, Route, Link, browserHistory} from 'react-router'

class CommonComments extends React.Component {
    constructor() {
        super();
        this.state = {
            comments: '',
            disabled:false
        }
    }

    componentDidMount() {
        let myFetchOptions = {
            method: "GET"
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
            this.setState({comments: json});
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        var myFetchOptions = {
            method: 'GET'
        };
        var formdata = this.props.form.getFieldsValue();
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userid
            + "&uniquekey=" + this.props.uniquekey
            + "&commnet=" + formdata.remark, myFetchOptions).then(response => response.json()).then(json => {
            this.componentDidMount();
        })
    };
    addUserCollection(){
        var myFetchOptions = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=" + localStorage.userid
            + "&uniquekey=" + this.props.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
            //收藏成功以后进行一下全局的提醒
           this.setState({
               disabled:true
           });
            notification['success']({message: 'ReactNews提醒', description: '收藏此文章成功'});
        });
    }


    render() {
        let {getFieldDecorator} = this.props.form;
        const {comments} = this.state;
        const commentList = comments.length ?
            comments.map((comment, index) => (
                <Card key={index} title={comment.UserName} extra={< a href="#"> 发布于 {comment.datetime}</a>}>
                    <p>{comment.Comments}</p>
                </Card>
            ))
            :
            "没有加载到任何评论";
        return (
            <div className="comment">
                <Row>
                    <Col span={24}>
                        {commentList}
                        <Form
                            onSubmit={this.handleSubmit.bind(this)}
                        >
                            <FormItem lable={"您的评论"}>
                                {getFieldDecorator('remark')(
                                    <Input type="textarea" placeholder="请输入评论"/>
                                )}
                            </FormItem>
                            <Button type={"primary"} htmlType={"submit"}>提交评论</Button>
                            &nbsp;
                            <Button type={"primary"} htmlType={'button'} disabled={this.state.disabled} onClick={this.addUserCollection.bind(this)}>收藏</Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }

}


export default CommonComments = Form.create({})(CommonComments)