import { message } from 'ant-design-vue/es'
// import defaultSettings from '../defaultSettings';
import themeColor from './themeColor.js'

// let lessNodesAppended

const colorList = [
  {
    key: '紫', color: '#605ca8'
  },
  {
    key: '黄', color: '#f39c12'
  },
  {
    key: '绿', color: '#00a65a'
  },
  {
    key: '红', color: '#dd4b39'
  },
  {
    key: '天蓝', color: '#3c8dbc'
  },
  {
    key: '蓝（默认）', color: '#125fc9'
  },
  // {
  //   key: '极客蓝', color: '#2F54EB'
  // },
  // {
  //   key: '酱紫', color: '#722ED1'
  // }
]

const updateTheme = newPrimaryColor => {
  // const hideMessage = message.loading('正在切换主题！', 0)
 return themeColor.changeColor(newPrimaryColor).finally(t => {
    // hideMessage()
  })
}
const updateColorWeak = colorWeak => {
  // document.body.className = colorWeak ? 'colorWeak' : '';
  colorWeak ? document.body.classList.add('colorWeak') : document.body.classList.remove('colorWeak')
}

export { updateTheme, colorList, updateColorWeak }
