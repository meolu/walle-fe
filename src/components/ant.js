import {
  Button,
  Layout,
  Menu,
  Pagination,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Alert,
  Message,
  Modal,
  Notification,
  Poponfirm,
  Spin
} from 'ant-design-vue'

const components = [
  Button,
  Layout,
  Menu,
  Pagination,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Alert,
  Message,
  Modal,
  Notification,
  Poponfirm,
  Spin
]

const install = (Vue) => {
  if (install.installed) {
    return
  }

  components.forEach(component => {
    Vue.use(component)
  })
  Vue.prototype.$after = Modal
  Vue.prototype.$confirm = Modal.confirm
  Vue.prototype.$info = Modal.info
  Vue.prototype.$success = Modal.success
  Vue.prototype.$error = Modal.error
  Vue.prototype.$warning = Modal.warning
  Vue.prototype.$message = Message
}

export default {
  install
}
