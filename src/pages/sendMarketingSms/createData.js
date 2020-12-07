export const selectModuleList=[
  {
    value: 'arrives',
    type: 'text',
    widthTimes: 32,  // input with times
    helperText:'Airport codes, e.g;  DEL or DEL,BOM,BLR'
  },
  {
    value: 'departs',
    type: 'text',
    widthTimes: 32,
    helperText:'Airport codes, e.g;  DEL or DEL,BOM,BLR'
  },
  {
    value: 'body',
    type: 'text',
    required: true,
    widthTimes: 76,
    helperText:"Sms contents"
    
  },
  {
    value: 'sendTime',
    type: 'dateTime',
    widthTimes: 30,
    required: true
  },
  {
    value: 'international',
    parameters: [{
      name: 'filter',
      type:'select',
      choices:[
        {label: '等于', value: 1},
        {label: '不等于', value: 2},
        {label: '全部', value: 3}
      ]
    }, {
      name: 'value',
      type: 'select',
      choices: [
        {label: 'Domestic', value: 0},
        {label: 'International', value: 1}
      ]
    }]
  },
  {
    value: 'member',
    parameters:[{
      name: 'filter',
      type: 'select',
      widthTimes: 12,
      choices: [
        {label: '等于', value: 1},
        {label: '全部', value: 3},
        {label: '介于', value: 4},
        {label: '小于等于', value: 5},
        {label: '大于等于', value: 6},
      ]
    }, {
      name: 'start',
      type: 'select',
      choices: [
        {label: 'Beginner', value: 1001},
        {label: 'Basic', value: 1002},
        {label: 'Elite', value: 1003},
        {label: 'Royal', value: 1004},
        {label: 'Platinum', value: 1005}
      ]
    }, {
      name: 'end',
      type: 'select',
      choices: [
        {label: 'Beginner', value: 1001},
        {label: 'Basic', value: 1002},
        {label: 'Elite', value: 1003},
        {label: 'Royal', value: 1004},
        {label: 'Platinum', value: 1005}
      ]
    }]
  },
  {
    value: 'orderStatus',
    parameters:[{
      name: 'filter',
      type: 'select',
      widthTimes: 12,
      choices: [
        {label: '等于', value: 1},
        {label: '不等于', value: 2},
        {label: '全部', value: 3}
      ]
    },{
      name: 'value',
      type: 'select',
      choices:[
        {label: 'Unpaid', value: 1},
        {label: 'Paid', value: 2},
        {label: 'In Process', value: 3},
        {label: 'Issued', value: 4},
        {label: 'Cancelled', value: 5},
      ]
    }]
  },
  {
    value: 'platform',
    // required: true,
    parameters: [{
      name: 'filter',
      type: 'select',
      widthTimes: 12,
      choices: [
        {label: '等于', value: 1},
        {label: '不等于', value: 2},
        {label: '全部', value: 3}
      ]
    }, {
      name: 'value',
      type: 'select',
      choices: [
        {label: 'HEG', value: 1},
        {label: 'SkyScanner', value: 2},
        {label: 'Ixigo', value: 3},
        {label: 'Kayak', value: 4},
        {label: 'Wego', value: 5},
        {label: 'DBCorp', value: 6},
        {label: 'Samsung', value: 7},
        {label: 'Bajaj', value: 8},
        {label: 'Vivo', value: 9},
        {label: 'PhonePe', value: 10},
        {label: 'Transsion', value: 11},
      ]
    }]
  },
  {
    value: 'registrationDate',
    parameters: [{
      name: 'filter',
      type: 'select',
      widthTimes: 12,
      choices: [
        {label: '等于', value: 1},
        {label: '全部', value: 3},
        {label: '介于', value: 4},
        {label: '小于等于', value: 5},
        {label: '大于等于', value: 6},
        {label: '本周', value: 7},
        {label: '本月', value: 9},
        {label: '今年', value: 10},
      ]
    },{
      name: 'start',
      type: 'date',
    }, {
      name: 'end',
      type: 'date'
    }]
  },
  {
    value: 'reserveDateRange', 
    parameters: [{
      name: 'filter',
      type: 'select',
      widthTimes: 12,
      choices:[
        {label: '等于', value: 1},
        {label: '全部', value: 3},
        {label: '介于', value: 4},
        {label: '小于等于', value: 5},
        {label: '大于等于', value: 6},
        {label: '本周', value: 7},
        {label: '本月', value: 9},
        {label: '今年', value: 10},
      ]
    },{
      name: 'start',
      type: 'date'
    },{
      name: 'end',
      type: 'date',
    }]
  },
  {
    value: 'reserveDay',
    parameters:[{
      name: 'filter',
      type: 'select',
      widthTimes: 12,
      choices:[
        {label: '等于', value: 1},
        {label: '全部', value: 3},
        {label: '介于', value: 4},
        {label: '小于等于', value: 5},
        {label: '大于等于', value: 6},
      ]
    },{
      name: 'start',
      type: 'text'
    },{
      name: 'end',
      type: 'text',
    }]
  },
  
  {
    value: 'trip',
    parameters:[{
      name: 'filter',
      type: 'select',
      widthTimes: 12,
      choices:[
        {label: '等于', value: 1},
        {label: '不等于', value: 2},
        {label: '全部', value: 3}
      ]
    }, {
      name: 'value',
      type: 'select',
      choices: [
        {label: 'One Way', value: 0},
        {label: 'Round Way', value: 1}
      ]
    }]
  },
]