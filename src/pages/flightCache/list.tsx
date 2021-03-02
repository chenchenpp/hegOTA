import React , {useEffect, useState, useRef} from 'react'
import { axios } from '../../utils/axios';
import { otherPath } from '../../utils/httpUrl.config'
import { dateFormat } from '../../utils/dateFormUtils'
import { Table, Button, Card, Form, Input, Row, Col, DatePicker, message  } from 'antd';
const {Column}=Table;
export default function FlightCacheList(){
  interface pageIF {
    pageSize: number,
    pageIndex: number,
    arrivalCity: string,
    departureCity: string,
    departureTime: string
  }
  const [form] = Form.useForm();
  const formRef:any =useRef();
  const [loading, setLoading] = useState<boolean>(false);
  const [pageList, setPageList] = useState<[]>([]);
  const [pageParams, setPageParams] = useState<pageIF>({
    pageSize: 10,
    pageIndex: 1,
    arrivalCity: 'DEL',
    departureCity: 'BOM',
    departureTime: dateFormat(new Date(), '/')
  })
  // form.setFieldsValue({ 
  //   arrivalCity: 'DEL',
  //   departureCity: 'BOM',
  //   departureTime: new Date()
  // })
  const [totalPage, setTotalPage] = useState<number>(0)
  const getPageListHandle = (params: pageIF) => {
    return new Promise((resolve, reject)=>{
      axios.get(otherPath.flightCache, { params }).then((res: any)=>{
        if(res.code===200){
          resolve(res.data);
        } else {
          reject(res)
        }
      })
    })
  }
  useEffect(()=>{
    setLoading(true);
    getPageListHandle(pageParams).then((data:any) => {
      setPageList(data.content);
      setTotalPage(data.numberOfElements)
      setLoading(false);
    }).catch(err=>{
      message.error(`${err.code}: ${err.message}`)
      setLoading(false);
      setPageList([]);
      setTotalPage(0)
    })
  }, [pageParams])
  const searchMemberHandle= (record : {}) : void => {
    
  }
  const onReset= () : void =>{
    formRef.current.resetFields();
  }
  interface PAGINATION {
    pageSize: number,
    current: number,
    [propname: string]: any
  }
  const changePageHandle= (pagination: PAGINATION):void => {
    const {current:pageIndex, pageSize}=pagination
    let newPage= Object.assign(pageParams, {pageSize, pageIndex})
    setPageParams(newPage)
  }
  const toUpperCaseHandle = (e) =>{
    console.log(e)
  }
  return (
    <>
      <Card style={{marginBottom: '10px'}}>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={searchMemberHandle} ref={formRef} form={form}>
          <Row>
            <Col span={8}>
              <Form.Item label="arrival City" name="arrivalCity">
                <Input onChange={toUpperCaseHandle}></Input>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="departure City" name="departureCity">
                <Input></Input>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="departure Time" name="departureTime">
                <DatePicker format="YYYY/MM/DD"/>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="space-around" align="middle">
            <Col span={3}>
              <Form.Item>
                <Button  shape="round" type="primary" htmlType="submit" block>search</Button>
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item>
                <Button shape="round" htmlType="button" block onClick={onReset}>reset</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Table dataSource={pageList} pagination={{ pageSize: pageParams.pageSize, total: totalPage, showSizeChanger:  true}}  
             rowKey={(record: any): string => record.id} onChange={changePageHandle} loading={loading}>
        <Column title="stroke" dataIndex='stroke' />
        <Column title="departure" dataIndex="departure" />
        <Column title="arrivals" dataIndex="arrivals" />
        <Column title="departureDate" dataIndex="departureDate" />
        <Column title="arrivalsDate" dataIndex="arrivalsDate"/>
        <Column title="Depart Flight No" dataIndex="expireTime"/>
        <Column title="Return Flight No" dataIndex="expireTime"/>
        <Column title="expireTime" dataIndex="expireTime"/>
      </Table>
    </>

  )
}