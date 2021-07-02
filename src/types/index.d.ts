type Style = 'item' | 'itemPhoto' | 'cart' | 'catalog' | 'catalogParts'

interface VHWidgetOpts {
  style?: Style,
  months?: number
  cost?: number
  text?: string
  textButton?: string
  itemImg?: string
  partnerLogo?: string
  background?: 1 | 2 | 3 | 4 | 5 | string
  borderRadius?: number
  showSchedule?: boolean
  left?: string
  bottom?: string
}

declare interface Window { VHWidgetOpts: VHWidgetOpts }
