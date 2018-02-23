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

class PCHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            current: "top",
            modalVisible:false,
            action:"login",
            hasLogined:false,
            userNickName:'',
            userid:''
        }
    }
    componentWillMount(){
        console.log(localStorage.userid );
        if(localStorage.userid !=undefined){
            this.setState({hasLogined:true});
            this.setState({userNickName:localStorage.userNickName,userid:localStorage.userid});
        }
    }
    handleClick(e) {
        if(e.key=="register"){
            this.setModalVisible(true)
        }
        this.setState({
            current: e.key,
        })
    }
    handSubmit(e){
        e.preventDefault();
        let myFetchOptions={
            method:'get'
        };
        let formData = this.props.form.getFieldsValue();
        console.log(formData)
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action
            +"&userName="+formData.userName
            +"&password=" +formData.password
            +"&r_username=" + formData.r_userName
            + "&r_password=" + formData.r_password
            + "&r_confirmPassword="+ formData.r_confirmPassword,myFetchOptions)
            .then(response=>response.json()).then(json=>{
                this.setState({
                    userNickName:json.NickUserName,
                    userid:json.UserId
                });
                localStorage.setItem("userid",json.UserId);
                localStorage.setItem("userNickName",json.NickUserName);

                if(this.state.action=='login'){
                    this.setState({
                        hasLogined:true
                    })
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
    logout(){
        localStorage.removeItem("userid");
        localStorage.removeItem("userNickName");
        // console.log(localStorage.userNickName);
        this.setState({
            hasLogined:false
        })
    }

    render() {
        let{ getFieldDecorator} =this.props.form;
        const userShow =this.state.hasLogined
            ? <Menu.Item key="logout" class="register">
                <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
                &nbsp;&nbsp;
                <Link to="/usercenter" target="_blank">
                    <Button type="dashed" htmlType="button">个人中心</Button>
                </Link>
                &nbsp;&nbsp;
                <Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
            </Menu.Item>
            :
            <Menu.Item key="register" class="register">
                <Icon type="appstore"/>注册/登录
            </Menu.Item>;

                return (
            <header>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4}>
                        <a href="/" class="logo">
                            <img src="/src/images/logo.png" alt="logo"/>
                            <span>ReactNew</span>
                        </a>
                    </Col>
                    <Col span={16}>
                        <Menu
                            selectedKeys={[this.state.current]}
                            mode="horizontal"
                            onClick={this.handleClick.bind(this)}
                        >
                            <Menu.Item key="top">
                                <Icon type="appstore"/>头条
                            </Menu.Item>
                            <Menu.Item key="shehui">
                                <Icon type="appstore"/>社会
                            </Menu.Item>
                            <Menu.Item key="guonei">
                                <Icon type="appstore"/>国内
                            </Menu.Item>
                            <Menu.Item key="guoji">
                                <Icon type="appstore"/>国际
                            </Menu.Item>
                            <Menu.Item key="yule">
                                <Icon type="appstore"/>娱乐
                            </Menu.Item>
                            <Menu.Item key="tiyu">
                                <Icon type="appstore"/>体育
                            </Menu.Item>
                            <Menu.Item key="keji">
                                <Icon type="appstore"/>科技
                            </Menu.Item>
                            <Menu.Item key="shishang">
                                <Icon type="appstore"/>时尚
                            </Menu.Item>
                            {userShow}
                        </Menu>

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
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        );
    };
}

export default PCHeader =Form.create({})(PCHeader);
