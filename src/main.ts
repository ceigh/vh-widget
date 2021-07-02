import { createApp } from 'vue'
import App from './App.vue'

// TODO: remove
window.VHWidgetOpts = {
  // background: 3,
  // partnerLogo: 'https://static.mvideo.ru/assets/facelift/img/logo_red_web_fl1.svg',
  // borderRadius: 20,
  // style: 'item',
  // style: 'itemPhoto',
  style: 'cart',
  // style: 'catalogParts',
  months: 7,
  cost: 9320,
  text: 'Этот товар можно оплатить частями Виртаульной Халвой за:',
  textButton: 'Получить Виртуальную Халву',
  itemImg: 'https://img.mvideo.ru/Pdb/50126638b.jpg'
}

const el = document.createElement('div')
document.body.appendChild(el)
createApp(App).mount(el)
