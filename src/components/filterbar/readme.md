filterbar 封装参数说明
---
`fieldList` 属性对象：
```
[{
					type: 'rangeDate',//参数类型 string(input 输入框) number，int (数字输入框) date  (日期选择) month(月份选择)  rangeDate(时间段选择) select(下拉选择) 
					value: 'rangetime', //绑定的参数
					text: '时间范围',//标题文字
					defaultValue: [moment('2019-06-11'),moment('2019-07-11')],//默认值
					optionlist:[{ value: '', text: '全部' }, { value: 0, text: '男' }, { value: 1, text: '女' }]//下拉筛选选项
				}
				]
```

`handlerSearch` 事件 
确认查询事件
`handlerReset` 事件
重置事件