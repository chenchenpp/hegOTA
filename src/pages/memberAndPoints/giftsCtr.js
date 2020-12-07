import React, {useState, useEffect, Fragment} from 'react'
import { Drawer, Button, Col, Row, Form, Space, Select, Input } from 'antd';
import {
  PlusOutlined, MinusOutlined
} from '@ant-design/icons';
import styles from './index.module.scss'
import {axios} from '@/utils/axios.js'
import {memberUserPath} from '@/utils/httpUrl.config'
export const GiftsCtr=function(props){
  const {visible, itemData}=props
  const [productOptions, setProductOptions]=useState([])
  useEffect(()=>{
    axios.get(memberUserPath.commodity, {pageNum:1, pageSize: 10000}).then(res=>{
      if(res.code===200){
        setProductOptions(res.data||[])
      }
    })
  },[])
  return (
    <Drawer title={'User ID '+itemData.id} visible={visible} onClose={()=>props.onClose(false)} destroyOnClose={true} width='420'>
      <Form layout="vertical">  
        <Form.List name="commodityList">
          {(filds, {add, remove}) => (
            <>
              {filds.map((field, index) => (
                <Fragment key={field.key}>
                  <div className={styles['flex']}>
                    <span className={styles['product-title']}>PRODUCT {index+1}</span>
                    <MinusOutlined className={styles['product_remove']} onClick={()=> remove()}/>
                  </div>
                  <Space align="baseline"  style={{ width: '100%' }}>
                    <Form.Item label="Product name" name="commodityName" style={{width: 180}}>
                      <Select>
                        { productOptions.map(item =>
                          <option>{item}</option>  
                        )}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Product Quantity" name="commodityNum" style={{width: 180}}>
                      <Input></Input>
                    </Form.Item>
                  </Space>
                </Fragment>
              ))}
              <Form.Item>
                <Button type="link" icon={<PlusOutlined />}  onClick={() => add()}>ADD PRODUCT</Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Row>
          <Col>
            <Button type="primary">SAVE</Button>
          </Col>
        </Row>
      </Form>
    </Drawer>
  )
}