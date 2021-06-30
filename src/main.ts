import { createApp } from 'vue'
import App from './App.vue'

// TODO: remove
window.VHWidgetOpts = {
  style: 'itemPhoto',
  months: 4,
  cost: 9320,
  text: 'Этот товар можно оплатить частями Виртаульной Халвой за:',
  textButton: 'Получить Виртуальную Халву',
  itemImg: 'https://img.mvideo.ru/Pdb/50126638b.jpg'
}

const el = document.createElement('div')
document.body.appendChild(el)
createApp(App).mount(el)
