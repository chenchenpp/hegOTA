import React, {useEffect, useState} from 'react'
import { Table, Button, Card  } from 'antd';
import { PlusOutlined  } from '@ant-design/icons';
import {dateSorter} from '@/utils/sorter.js'
import {axios} from '@/utils/axios'
import {sendMsgPath} from '@/utils/httpUrl.config'
const {Column}=Table;
export default function SendSmsList(props){
  const statusText={
    1: '待发送',
    3: '发送成功',
    4: '发送失败'
  }
  const {history}= props;
  const [pageList, setPageList] = useState([])
  const [pageParams, setPageParams] = useState({
    pageSize: 10,
    pageIndex: 1,
    sortFiledName: 'sendTime',
    sortType: 'DESC'
  })
  const [totalPage, setTotalPage] = useState(0)
  const getPageListHandle=(params)=>{
    return new Promise((resolve, reject)=>{
      axios.get(sendMsgPath.sendMarketingSms, {params}).then(res=>{
        if(res.code===200){
          resolve(res.data);
        } else {
          reject(res)
        }
      })
    })
  }
  useEffect(()=>{
    getPageListHandle(pageParams).then(data=>{
      setPageList(data.content);
      setTotalPage(data.numberOfElements)
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
  const goCreateHandle=function(){
    history.push('/sendMarketingSms/create')
  }
  return (
    <>
      <Card style={{marginBottom: '10px'}}>
        <Button type="primary" shape="round" size='Small' icon={<PlusOutlined />} onClick={goCreateHandle}>
          Create
        </Button>
      </Card>
      <Table dataSource={pageList} pagination={{ pageSize: pageParams.pageSize, total: totalPage, showSizeChanger:  true}}  rowKey={record => record.id} onChange={changePageHandle}>
        <Column title="Id" dataIndex='id' sorter={(a, b) => a.id - b.id} />
        <Column title="Success count" dataIndex="successCount" />
        <Column title="Fail count" dataIndex="failCount" />
        <Column title="Total number" dataIndex="totalNumber" />
        <Column title="send Time" dataIndex="sendTime" sorter={(a, b) => dateSorter(a.sendTime, b.sendTime)}/>
        <Column title="Body" dataIndex="body"/>
        <Column title="Status" dataIndex="status" render={(data)=>statusText[data]} />
      </Table>
    </>
  )
}