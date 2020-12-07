import React, {useState, useEffect} from 'react'
import {memberUserPath} from '@/utils/httpUrl.config'
import { Modal, Table } from 'antd';
import {axios} from '@/utils/axios'
import {dateFormat} from '@/utils/dateFormUtils'
export const ListModal=function(props){
  const {isModalVisible, type, itemData}=props
  const expirationsColumns=[{
    title: 'id',
    dataIndex: 'id'
  },{
    title: 'Total integral', 
    dataIndex: 'totalIntegralId'
  },{
    title: 'Origin integral number',
    dataIndex: 'originIntegralNumber'
  }, {
    title: 'Integral Start Date',
    dataIndex: 'integralStartDate',
    render: (text)=> dateFormat(text)
  }, {
    title: 'Integral End Date',
    dataIndex: 'integralEndDate',
    render: (text)=> dateFormat(text)
  },{
    title: 'Version',
    dataIndex: 'version'
  }, {
    title: 'Status',
    dataIndex: 'status'
  }, {
    title: 'Last Modified Time',
    dataIndex: 'lastModifiedTime',
    render: (text)=> dateFormat(text)
  }, {
    title:'Create Time',
    dataIndex: 'createTime',
    render: (text)=> dateFormat(text)
  }]
  const flowsColumns=[{
    title: 'id',
    dataIndex: 'id'
  },{
    title: 'Total integral', 
    dataIndex: 'totalIntegralId'
  },{
    title: 'Billing status',
    dataIndex: 'billingStatus'
  }, {
    title: 'Amount',
    dataIndex: 'amount'
  },{
    title: 'Type',
    dataIndex: 'type'
  }, {
    title: 'Before balance',
    dataIndex: 'beforeBalance'
  }, {
    title: 'After balance',
    dataIndex: 'afterBalance'
  }, {
    title: 'Status',
    dataIndex: 'status'
  },{
    title: 'Last modified time',
    dataIndex: 'lastModifiedTime',
    render: (text)=> {
      console.log(text)
      return (
        dateFormat(text)
      )
    }
  }, {
    title: 'Create time',
    dataIndex: 'createTime',
    render: (text)=> dateFormat(text)
  }]
  const [title, setTitle]=useState('')
  const [httpPath, setHttpPath]=useState('')
  const [totalPage, setTotalPage] = useState(0)
  const [pageList, setPageList] = useState([])
  const [pageParams, setPageParams] = useState({
    pageSize: 10,
    pageIndex: 1,
    sortFiledName: 'sendTime',
    sortType: 'DESC',
    totalIntegralId: itemData.id
  })
  const [loading, setLoading] = useState(false);
  const [curCloumn, setCurCloumn]=useState([])
  const changePageHandle=function(pagination){
    let newPage={
      pageSize: pagination.pageSize,
      pageIndex: pagination.current,
      sortFiledName: 'sendTime',
      sortType: 'DESC',
      totalIntegralId: itemData.id
    }
    setPageParams(newPage)
  }
  const getPageListHandle=(params)=>{
    return new Promise((resolve, reject)=>{
      axios.get(memberUserPath[httpPath], {params}).then(res=>{
        if(res.code===200){
          resolve(res.data);
        } else {
          reject(res)
        }
      })
    })
  }
  useEffect(()=>{
    if(type==='flows'){
      setTitle('flows')
      setHttpPath('flows')
      setCurCloumn(flowsColumns)
    }else if(type==='expirarion'){
      setTitle('Expirarion Account')
      setHttpPath('expirarion')
      setCurCloumn(expirationsColumns)
    }
  },[])
  useEffect(()=>{
    if(httpPath){
      setLoading(true);
      getPageListHandle(pageParams).then(data=>{
        setPageList(data.content);
        setTotalPage(data.numberOfElements)
        setLoading(false);
      })
    }
    
  }, [pageParams, httpPath]);
  return (
    <Modal title={title} visible={isModalVisible} width="80%" footer={null} maskClosable={true} onCancel={()=>{props.closeModal(false)}}>
      <Table dataSource={pageList}  pagination={{ pageSize: pageParams.pageSize, total: totalPage, showSizeChanger:  true}}
        rowKey={record => record.id} onChange={changePageHandle} loading={loading} columns={curCloumn}>
      </Table>
    </Modal>
  )
}