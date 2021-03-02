import React, {useState, useEffect, useRef, useContext } from 'react'
import {Card, Table, Button, Form, Input, Switch, Upload} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import {axios} from '@/utils/axios'
import {activityPath} from '@/utils/httpUrl.config'
const styles = require('./detail.module.scss')
const {Item} = Form;
export default function OrderSharingCreate(prps) {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const [fileList, setFileList] = useState([])
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  const handleCancel = () => this.setState({ previewVisible: false });
  // 预览图片
  const handlePreview = async file => {
    debugger
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    
  };

  const handleChange = ({ fileList }) => {
    console.log(fileList)
    setFileList(fileList);
  };
  const uploadHandle= function(file:any){
    console.log(file)
  }
  return (
    <Form {...layout} name="orderShareForm" className={styles.detailForm}>
      <Item label="Activity name" name="activityName"  rules={[{ required: true, message: 'Please input your Activity name!' }]}>
        <Input></Input>
      </Item>
      <Item label="Prize name" name="prizeName"  rules={[{ required: true, message: 'Please input your Prize name!' }]}>
        <Input></Input>
      </Item>
      <Item label="被邀请者顶上banner">
        <Upload
            action= 'http://newotatest.happyeasygo.com/ota-api/upload/oss/picture'
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            data={{name: 'share_order'}}
          >
          {fileList.length >= 2 ? null : uploadButton}
        </Upload>
      </Item>
    </Form>
  )
}