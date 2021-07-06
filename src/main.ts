import { createApp } from 'vue'
import App from './App.vue'

// TODO: remove
window.VHWidgetOpts = {
  // background: 3,
  // partnerLogo: 'https://static.mvideo.ru/assets/facelift/img/logo_red_web_fl1.svg',
  // borderRadius: 20,
  // style: 'item',
  // style: 'itemPhoto',
  // style: 'catalogParts',
  style: 'cart',
  // showSchedule: false,
  // left: '1rem',
  // bottom: '1rem',
  collapseable: true,
  // initialCollapse: true,
  months: 12,
  cost: 9320,
  text: 'Этот товар можно оплатить частями Виртаульной Халвой за:',
  textButton: 'Получить Виртуальную Халву',
  itemImg: 'https://img.mvideo.ru/Pdb/50126638b.jpg'
}

window.addEventListener('load', () => {
  const el = document.createElement('div')
  document.body.appendChild(el)
  createApp(App).mount(el)
})
