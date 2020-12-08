import React from 'react'
export default function(props){
  interface NumberOrStringDictionary {
    [index: string]: number ;
    length: number;    // ok, length is a number

 }
 let arr: NumberOrStringDictionary = ['11', '22']
 console.log(arr[0])
  return (
    <div>
      我是会员页面
    </div>
  )
}