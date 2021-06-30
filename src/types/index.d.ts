type Style = 'item' | 'itemPhoto' | 'cart' | 'catalog' | 'catalogParts'

interface VHWidgetOpts {
  style?: Style,
  months?: number,
  cost?: number,
  text?: string,
  textButton?: string,
  itemImg?: string
  color?: 1 | 2 | 3 | 4 | 5 | string
}

declare interface Window { VHWidgetOpts: VHWidgetOpts }
