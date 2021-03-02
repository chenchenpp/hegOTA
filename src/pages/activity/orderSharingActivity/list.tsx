import React, {useState, useEffect, useRef, useContext } from 'react'
import {Link} from 'react-router-dom'
import {Card, Table, Button, Form, message, Switch} from 'antd'
import {axios} from '@/utils/axios'
import {activityPath} from '@/utils/httpUrl.config'
const {Column} = Table;
const EditableContext = React.createContext<any>("");
interface EditableRowProps {
  index: number;
}
interface Item {
  id: string;
  configName: string;
  status: string;
  creator: string;
  lastModifiedTime: string;
}
interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: string;
  record: Item;
  editing: boolean;
  handleSave: (record: Item) => void;
}
// 可编辑单元格
const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  editing,
  ...restProps
}) => {
  // console.log(record)
  // const [editing, setEditing] = useState<Boolean>(false); //是否修改
  const statusRef:any = useRef();
  const form = useContext(EditableContext);
  // useEffect(() => {
  //   if (editing) {
  //     statusRef.current.focus();
  //   }
  // }, [editing]);

  // const toggleEdit = () => {
  //   setEditing(!editing);
  //   form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  // };
  const [status, setStatus] = useState<boolean>(()=>{
    console.log(record)
    return record&&record.status ? true : false
  })
  useEffect(() => {
    let flag=record&&record.status ? true : false
    setStatus(flag)
  }, [record])
  const save = async e => {
    try {
      const values = await form.validateFields() ;
      console.log('values', values)
      const toggleValue={status: values.status?1:0};
      // toggleEdit();
      handleSave({ ...record, ...{toggleValue} });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name= 'status'
        valuePropName='checked'
        initialValue={status}
      >
        <Switch checkedChildren="开启" unCheckedChildren="关闭" onClick={save}/>
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24, cursor: 'pointer' }}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
export default function OrderSharingList() {
  interface paginationIF {
    pageSize: number,
    pageIndex: number,
    sortFiledName: string,
    sortType: string
  }
  const [pageParams, setPageParams] = useState<paginationIF>({
    pageSize: 10,
    pageIndex: 1,
    sortFiledName: 'id',
    sortType: 'DESC'
  })
  const [form] = Form.useForm();
  const [pageList, setPageList] = useState<any[]>([])
  const [totalPage, setTotalPage] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const getPaginData=function(){
    return new Promise((resolve, reject) => {
      axios.get(activityPath.orderSharingActivity, {params: pageParams}).then((res: any) => {
        if(res.code===200) {
          resolve(res.data)
        } else {
          reject(res)
        }
      })
    }).catch(err => {
      console.log(err)
    })
  }
  useEffect(() => {
    getPaginData().then((res: any) => {
      const {content, totalPage} = res
      setPageList(content);
      setTotalPage(totalPage)
      setLoading(false)
    })
  }, [pageParams])
  const changePageHandle= function(pagination){
    const {current: pageIndex, pageSize}=pagination
    setPageParams((pre) => ({
      ...pre,
      ...{pageSize, pageIndex}
    }))
  }
  // 保存状态编辑
  const handleSave = function(row: any) {
    const {id, status} = row;
    axios.put(`${activityPath.orderSharingActivity}/${id}`, {status}).then((res:any) => {
      if(res.code === 200){
        const index = pageList.findIndex((item: any) => id === item.id);
        pageList.splice(index, 1, { ...pageList[index], ...row });
        setPageList(pageList);
      } else {
        message.error(res.message);
      }
      isEditing(row);
      setEditingKey('');
    })
  }
  const [editingKey, setEditingKey] = useState('');
  // 是否修改
  const isEditing = (record: Item) => {
    return record.id === editingKey
  };
  // 点击状态编辑按钮
  const edit = (record: Item) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = [{ 
      title: 'Config name',
      dataIndex: 'configName',
    }, {
      title: 'Status',
      dataIndex: 'status',
      render: text => (
        <>
          {text ? '上线中' : '已下线'}
        </>
      ),
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'status',
        title: 'Status',
        editing: isEditing(record),
        handleSave
      })
    }, {
      title: 'Creator',
      dataIndex: 'creator',
    },{
      title: 'Last modified time',
      dataIndex: 'lastModifiedTime',
    }, {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) =>(
        <>
          <Button type="link">EDIT</Button>
          <Button type="link" onClick={() => edit(record)}>状态编辑</Button>
          <Button type="link">TO PRIZE LIST</Button>
        </>
      )
    }]
  return (
    <>
      <Card style={{marginBottom: '10px'}}>
        <Link to='/activity/orderSharingActivity/create'> CREATE</Link>
      </Card>
      <Form form={form} component={false}>
        <Table dataSource={pageList} bordered
              pagination={{ pageSize: pageParams.pageSize, total: totalPage, showSizeChanger:  true}}  
              rowKey={(record: any): string => record.id} onChange={changePageHandle} loading={loading}
              components = {components} columns={columns}>
        </Table>
      </Form>
    </>

  )
}