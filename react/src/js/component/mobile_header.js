import React from 'react';
import ReactDOM from 'react-dom';
import {
    Row,
    Col,
    Menu,
    Icon,
    Tabs,
    message,
    Input,
    Form,
    Button,
    Checkbox,
    Modal
} from 'antd';

import {Link} from 'react-router-dom';
const FormItem =Form.Item;
const TabPane = Tabs.TabPane;

const {SubMenu} = Menu;
const MenuItemGroup = Menu.Item;


class MobileHeader extends React.Component{
    constructor() {
        super();
        this.state = {
            current: "top",
            modalVisible:false,
            action:"login",
            hasLogined:false,
            userNickName:'',
            userid:0
        }
    }
    componentWillMount(){
        if(localStorage.userid !=undefined){
            this.setState({hasLogined:true});
            this.setState({userNickName:localStorage.userNickName,userid:localStorage.userid});
        }
    }
    handSubmit(e){
        e.preventDefault();
        let myFetchOptions={
            method:'get'
        };
        let formData = this.props.form.getFieldsValue();
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action
            +"&userName="+formData.userName
            +"&password=" +formData.password
            +"&r_username=" + formData.r_userName
            + "&r_password=" + formData.r_password
            + "&r_confirmPassword="+ formData.r_confirmPassword,myFetchOptions)
            .then(response=>response.json()).then(json=>{
            this.setState({
                userNickName:json.NickName,
                userid:json.Userid
            });
            if(this.state.action=='login'){
                this.setState({
                    hasLogined:true
                });
                localStorage.userid= json.UserId;
                localStorage.userNickName = json.NickUserName;
            }
            message.success('请求成功');
            this.setModalVisible(false)
        });

    }

    setModalVisible(value){
        this.setState({
            modalVisible:value
        })
    }
    login(){
        this.setModalVisible(true)
    }
    logout(){
        localStorage.removeItem("userid");
        localStorage.removeItem("userNickName");
        this.setState({
            hasLogined:false
        })
    }
    callback(key){
        if(key==1){
            this.setState({
                action:'login'
            })
        }else if(key==2){
            this.setState({
                action:'register'
            })
        }
    }
    render(){
        let {getFieldDecorator} =this.props.form;
        const userShow = this.state.hasLogined
            ?
            <Link to="/usercenter">
                <Icon type="inbox"/>
            </Link>
            :
            <Icon type="setting" onClick={this.login.bind(this)}/>;
        return(
            <div id="mobileheader">
                <header>
                    <img src="/src/images/logo.png" alt="logo"/>
                    <span>ReactNew</span>
                    {userShow}
                </header>
                <Modal title="用户中心"
                       wrapClassName ="vertial-center"
                       visible={this.state.modalVisible}
                       onOk={()=>this.setModalVisible(false) }
                       onCancel={()=>this.setModalVisible(false)}
                       okText="关闭"
                >
                    <Tabs
                        type="card"
                        defaultActiveKey="1"
                        onChange={this.callback.bind(this)}
                    >
                        <TabPane tab="登录" key="1">
                            <Form
                                horizontal="true"
                                onSubmit={this.handSubmit.bind(this)}
                            >
                                <FormItem lable="账户">
                                    {getFieldDecorator('userName')(
                                        <Input placeholder="请输入您的账户" />
                                    )}
                                </FormItem>
                                <FormItem lable="密码">
                                    {getFieldDecorator('password')(
                                        <Input type="password" placeholder="请输入您的密码" />
                                    )}
                                </FormItem>
                                <Button type="primary" htmlType="submit" >登录</Button>
                            </Form>
                        </TabPane>
                        <TabPane tab="注册" key="2">
                            <Form
                                horizontal="true"
                                onSubmit={this.handSubmit.bind(this)}
                            >
                                <FormItem lable="账户">
                                    {getFieldDecorator('r_userName')(
                                        <Input placeholder="请输入您的账户"/>
                                    )}
                                </FormItem>
                                <FormItem lable="密码">
                                    {getFieldDecorator("r_password")(
                                        <Input type="password" placeholder="请输入您的密码"/>
                                    )}
                                </FormItem>
                                <FormItem lable="确认密码">
                                    {getFieldDecorator('r_confirmPassword')(
                                        <Input type="password" placeholder="请再次输入您的密码"/>
                                    )}
                                </FormItem>
                                <Button type="primary" htmlType="submit" >注册</Button>
                            </Form>
                        </TabPane>
                    </Tabs>

                </Modal>
            </div>
        )
    }
}

export default MobileHeader =Form.create({})(MobileHeader);
