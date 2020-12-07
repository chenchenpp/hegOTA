import React from 'react'
import {Card, Form, Input, Select, Row, Col, Space, Checkbox, DatePicker, Button} from 'antd'
import { selectModuleList } from './createData'
import {sendMsgPath} from '@/utils/httpUrl.config'
import {axios} from '@/utils/axios'
export default function CreateSendSmS(props){
  const BodyOptions=[
    { label: 'myroot.category.programming', value: 'programming' },
    { label: 'myroot.category.lifestyle', value: 'lifestyle' },
    { label: 'myroot.category.photography', value: 'photography' }
  ]
  const [form] = Form.useForm();
  const {history}=props;
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
  };
  const filterArr=['body', 'sendTime']
  const [selectList, setSelectList]=React.useState([])
  const [selectedOptions, setSelectedOptions]=React.useState([])
  React.useEffect(function(){
    let options=[]
    selectModuleList.forEach(item=>{
      if(!filterArr.includes(item.value)){
        options.push({value: item.value})
      }
    })
    setSelectList(options)
  }, []);
  const changeShowFiledHandle=function(vaule){
    let getSelected = selectModuleList.filter(item => vaule.includes(item.value))
    setSelectedOptions(getSelected)
  };
  const fieldTypeHandle=function(data){
    let fieldDom;
    if(data.type==='select'){
      fieldDom=<Select style={{width: 170}} options={data.choices}></Select>
    } else if(data.type==='text'){
      fieldDom=<Input ></Input>
    } else if(data.type==='date'){
      fieldDom=<DatePicker ></DatePicker>
    }
    return fieldDom
  }
  
  const saveHandle=(record)=>{
    console.log(record)
    record.sendTime=record['sendTime'].format('YYYY-MM-DD HH:mm:ss')
    if(record.registrationDate){
      record.registrationDate.start=record.registrationDate.start.format('YYYY-MM-DD')
      record.registrationDate.end=record.registrationDate.end.format('YYYY-MM-DD')
    }
    if(record.reserveDateRange){
      record.reserveDateRange.start=record.reserveDateRange.start.format('YYYY-MM-DD')
      record.reserveDateRange.end=record.reserveDateRange.end.format('YYYY-MM-DD')
    }
    axios.post(sendMsgPath.sendMarketingSms, record).then(res=>{
      if(res.code===200){
        console.log(res)
      } else {
        console.log(res)
      }
    })
  }
  return (
    <Card>
      <Row>
        <Col span={16}>
          <Form form={form} {...formItemLayout} onFinish={saveHandle}>
            <Form.Item  label="Body" name="body">
              <Checkbox.Group options={BodyOptions}></Checkbox.Group>
            </Form.Item>
            <Form.Item label="SendTime" name="sendTime">
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" ></DatePicker>
            </Form.Item>
            {
              selectedOptions.map((item, index)=> {
                if(item.parameters){
                  // 父字段是否有子字段
                  return (
                    <Form.Item key={index} labelCol={{span: 4}} wrapperCol={{span:20}} label={item.value} layout="inline">
                      <Space size="middle" style={{width:'100%'}}>
                        {
                          item.parameters.map((data, cIndex)=>(
                            <Form.Item label={data.name} name={[item.value, data.name]} key={index+cIndex} >
                              {fieldTypeHandle(data)}
                            </Form.Item>
                          )) 
                        }
                      </Space>
                    </Form.Item>
                  )
                } else {
                  return (
                    <Form.Item key={index} {...formItemLayout} label={item.value} name={[item.value]} >
                      {fieldTypeHandle(item)}
                    </Form.Item>
                  )
                }
              })
            }
            <Form.Item wrapperCol={{span: 4, offset: 10}}>
              <Button shape="round" type="primary" htmlType="submit" block>
                Save
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={8}>
          <Card title="添加字段辅助卡">
            <Row>
              <Col span={6}>添加模块:</Col>
              <Col span={18}>
                <Select style={{width: '100%'}} options={selectList} mode="multiple" onChange={changeShowFiledHandle}></Select>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Card>
  )
}