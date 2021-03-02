import React, {useEffect, useState} from 'react'
import {Form, Row, Col, Input, Button, Table, message} from 'antd'
import {axios} from '@/utils/axios'
import {otherPath} from '@/utils/httpUrl.config'
import {queryString} from '@/utils/cherry'
const {Column}=Table;
export default function VipOrderList() {
  interface columnsItem {
    title: string,
    dataIndex: string,
    key:string
  }
  const columns: Array<columnsItem>=[{
    title: 'id',
    dataIndex: 'id',
    key:'id'
  }, {
    title: 'User name',
    dataIndex: 'userName',
    key: 'userName'
  }, {
    title: 'Code',
    dataIndex: 'code',
    key: 'code'
  }, {
    title: 'Applied date',
    dataIndex: 'appliedDate',
    key: 'appliedDate'
  }, {
    title: 'Used date',
    dataIndex: 'usedDate',
    key: 'usedDate'
  },{
    title: 'Status',
    dataIndex: 'status',
    key: 'status'
  }]
  interface paginParams {
    pageSize: number,
    pageIndex: number,
    sortFiledName: string,
    sortType: string
  }
  const [pageParams, setPageParams] = useState<paginParams>({
    pageSize: 10,
    pageIndex: 1,
    sortFiledName: 'id',
    sortType: 'DESC'
  })
  const [pageList, setPageList] =useState<[]>([]);
  const [totalPage, setTotalPage] =useState<number>(0)
  const [expandFildList, setExpandFildList] = useState<object>({})
  const getPageListHandle=(params: paginParams): Promise<any>  =>{
    return new Promise((resolve, reject )=>{
      axios.get(otherPath.vipOrderManage, {params}).then( (res: any) => {
        if(res.code===200){
          resolve(res.data);
        } else {
          reject(res)
        }
      })
    })
  }
  useEffect(()=>{
    getPageListHandle(pageParams).then(res => {
      setPageList(res.content);
      setTotalPage(res.numberOfElements)
    })
  }, [pageParams])
  
  const expandedColStyle:any ={
    color: '#ddd', 
    textAlign: 'right'
  }
  // 渲染扩展行的字段
  const expandedFileRender= function(id){
    const expandFildData= expandFildList[id]
    if(!expandFildData) return null;
    enum expandFileEnum {
      'VIP voucher'= 'voucherCode',
      'VIP Status' = 'status',
      'Username' = 'passenger',
      'Related OrderId'= 'orderId',
      'Related Flight No'='flightNo',
      'Applied date'= 'appliedDate',
      'Related Passenger'='relatedPassenger',
      'Airport'= 'code',
      'Expired date'='expiredDate',
      'Gender'='sex',
      'Terminal'='terminal'
    }
    let expandFileNode : object[] = [];
    for(let key in expandFileEnum){
      let expandFildKey:string=expandFileEnum[key];
      expandFileNode.push(<Col xxl={6} xl={8} key={key}> 
                            <Row>
                              <Col span={12}>{key}:</Col>
                              <Col span={12} style={expandedColStyle}>{expandFildData[expandFildKey]}</Col>
                            </Row>
                          </Col>)
    }
    return expandFileNode
  }
  // 渲染每行的扩展行
  const expandedRowHandle = function(record: any) {
    const {id}=record;
    return (
      <div style={{background: '#fff', padding: '0 8px'}}>
        <Row gutter={[{ xs: 8, sm: 16, md: 20, xxl: 50 }, 8]}>
          <Col xxl={6} xl={8} md={8}>
            <Row>
              <Col span={12}>Supplier:</Col>
              <Col span={12} style={expandedColStyle}>Dreamfolks</Col>
            </Row>
          </Col>
          { expandedFileRender(id)}
        </Row>
      </div>
    )
  }
  // 点击展开扩展行
  const onExpandHandle= function (expanded : boolean, record: any){
    const {id, userName}=record
    if(!expanded||!userName||!id) return
    const params= {
      userName
    }
    axios.get(otherPath.vipOrderManage+'/'+id, {params}).then((res: any)=> {
      if(res.code===200){
        setExpandFildList((pre: any) => (
          {
            ...pre,
            [id]: res.data
          }
        ))
      }else {
        message.error(res.message)
      }
    }).catch(err=>{
      message.error(err)
    })
  }
  const expandable = {
    expandedRowRender: expandedRowHandle
  }
  interface downExcelIF {
    pageSize: number,
    pageIndex: number

  }
  const [downExcel, setDownExcel]=useState<downExcelIF>({
    pageSize: 10,
    pageIndex: 1
  });  
  const changePageHandle=function(pagination){
    let newPage={
      pageSize: pagination.pageSize,
      pageIndex: pagination.current,
      sortFiledName: 'id',
      sortType: 'DESC'
    }
    setPageParams(newPage)
    setDownExcel({
      pageSize: pagination.pageSize,
      pageIndex: pagination.current
    })
  }
  const downExcelHandle=function(){
    let excelName: string;
    fetch(`${otherPath.vipDownExcel}${queryString(downExcel)}`, {
      headers: {
        Authorization: localStorage.token,
      }
    }).then((res: any) => {
      excelName = res.headers.get("content-disposition").match(/filename=(.+\.xlsx)/)[1];
    return res.blob();
    }).then(blob =>{
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, excelName);
      } else {
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = excelName;
        link.click();
        window.URL.revokeObjectURL(link.href);//清除blob
      }
    }).catch(err => {
      console.log(err)
    })
  }
 
  return (
    <div className="vipOrder-main" style={{margin: '10px 12px'}}>
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        <Row gutter={{ md: 8, xl: 16, xxl: 24}}>
          <Col xxl={6} xl={8}>
            <Form.Item label="Air port code" name="">
              <Input></Input>
            </Form.Item>
          </Col>
          <Col xxl={6} xl={8}>
            <Form.Item label="Applied date from">
              <Input></Input>
            </Form.Item>
          </Col>
          <Col xxl={6} xl={8}>
            <Form.Item label="Applied date to">
              <Input></Input>
            </Form.Item>
          </Col>
          <Col xxl={6} xl={8}>
            <Form.Item label="Order">
              <Input></Input>
            </Form.Item>
          </Col>
          <Col xxl={6} xl={8}>
            <Form.Item label="Status">
              <Input></Input>
            </Form.Item>
          </Col>
          <Col xxl={6} xl={8}>
            <Form.Item label="Used date form">
              <Input></Input>
            </Form.Item>
          </Col>
          <Col xxl={6} xl={8}>
            <Form.Item label="Used date to">
              <Input></Input>
            </Form.Item>
          </Col>
          <Col xxl={6} xl={8}>
            <Form.Item label="User name">
              <Input></Input>
            </Form.Item>
          </Col>
          <Col xxl={6} xl={8}>
            <Form.Item label="Vip supplier">
              <Input></Input>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={{ md: 8, xl: 16, xxl: 24}} justify="center">
          <Col span={3}>
            <span onClick={downExcelHandle} style={{color: '#1890ff', cursor: 'pointer', textDecoration: 'underline'}}>EXPORT FILES</span>
          </Col>
          <Col span={3}>
            <Form.Item>
              <Button  shape="round" type="primary" htmlType="submit" block>search</Button>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item>
              <Button shape="round" htmlType="button" block >reset</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table id="tableExcel" columns={columns} dataSource={pageList} 
             pagination={{ pageSize: pageParams.pageSize, total: totalPage, showSizeChanger:  true}}  
             rowKey={(record: any) => record.id} 
             onChange={changePageHandle}
             onExpand={onExpandHandle}
             expandable = {expandable}>
              
      </Table>
    </div>
  )
}