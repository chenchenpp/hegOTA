import React, {useEffect, useState, useRef} from 'react'
import { Table, Button, Card, Form, Input, Row, Col  } from 'antd';
import {axios} from '@/utils/axios'
import {memberUserPath} from '@/utils/httpUrl.config'
import {ListModal} from './listModal'
import {GiftsCtr} from './giftsCtr'
import {EditCtr} from './editCtr'
const {Column}=Table;
export default function UserList(props){
  const formRef=useRef();
  const statusText={
    1: '待发送',
    3: '发送成功',
    4: '发送失败'
  }
  const [isModalVisible, setIsModalVisible]=useState(false);
  const [modalType, setModalType]=useState('');
  const [pageList, setPageList] = useState([])
  const [itemData, setItemData]= useState({})
  const [showGiftsFlag, setShowGiftsFlag]= useState(false);
  const [editVisible, setEditVisible] = useState(false)
  const [pageParams, setPageParams] = useState({
    pageSize: 10,
    pageIndex: 1,
    sortFiledName: 'sendTime',
    sortType: 'DESC'
  })
  const [totalPage, setTotalPage] = useState(0)
  const [loading, setLoading] = useState(false);
  const getPageListHandle=(params)=>{
    return new Promise((resolve, reject)=>{
      axios.get(memberUserPath.memberUser, {params}).then(res=>{
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
    getPageListHandle(pageParams).then(data=>{
      setPageList(data.content);
      setTotalPage(data.numberOfElements)
      setLoading(false);
    })
  }, [pageParams]);
  const changePageHandle=function(pagination){
    let newPage={
      pageSize: pagination.pageSize,
      pageIndex: pagination.current,
      sortFiledName: 'sendTime',
      sortType: 'DESC'
    }
    setPageParams(newPage)
  }
  const searchMemberHandl=(record)=>{
    setPageParams({...record,...pageParams})
  }
  const onReset=()=>{
    formRef.current.resetFields();
  }
  const showModal=(flag, data)=>{
    if(flag==='flows'){
      setModalType('flows')
    } else if(flag==='expirationAccount'){
      setModalType('expirarion')
    }
    setItemData(data)
    setIsModalVisible(true);
  }
  const closeModalHandle=(flag)=>{
    setIsModalVisible(flag);
  }
  const showEditHandle= (record) => {
    setEditVisible(true);
    setItemData(record)
  }
  const closeEditHandle= (flag) => {
    setEditVisible(flag);
  }
  const showGiftsHandle=(record)=>{
    setShowGiftsFlag(true)
    setItemData(record)
  }
  const closeGiftsHandle=(flag)=>{
    setShowGiftsFlag(flag)
  }
  return (
    <>
      <Card style={{marginBottom: '10px'}}>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={searchMemberHandl} ref={formRef}>
          <Row>
            <Col span={8}>
              <Form.Item label="User Id" name="userId">
                <Input></Input>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="User Name" name="userName">
                <Input></Input>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Cell phone" name="phone">
                <Input></Input>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Email" name="email">
                <Input></Input>
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
             rowKey={record => record.id} onChange={changePageHandle} loading={loading}>
        <Column title="User Id" dataIndex='userId' />
        <Column title="User Name" dataIndex="userName" />
        <Column title="cellphone" dataIndex="cellphone" />
        <Column title="Email" dataIndex="email" />
        <Column title="member Name" dataIndex="memberName"/>
        <Column title="balance" dataIndex="balance"/>
        <Column title="action" align="center" render={(record)=>(<>
          <Button type="link" onClick={()=>showModal('expirationAccount', record)}>Expiration Account</Button>
          <Button type="link" onClick={()=>showModal('flows', record)}>FLOW</Button>
          <Button type="link" onClick={()=>showEditHandle(record)}>EDIT</Button>
          <Button type="link" onClick={()=>showGiftsHandle(record)}>GIFTS</Button>
        </>)}></Column>
      </Table>
      {isModalVisible?<ListModal isModalVisible={isModalVisible} type={modalType} closeModal={closeModalHandle} itemData={itemData}></ListModal>: null}
      <GiftsCtr itemData={itemData} visible={showGiftsFlag} onClose={closeGiftsHandle}></GiftsCtr>
      <EditCtr itemData={itemData} editVisible={editVisible} onClose={closeEditHandle}></EditCtr>
    </>
  )
}