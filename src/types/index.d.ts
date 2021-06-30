type Style = 'item' | 'itemPhoto' | 'cart' | 'catalog' | 'catalogParts'

interface VHWidgetOpts {
  style: Style,
  months: number,
  cost?: number,
  text?: string,
  textButton?: string,
  itemImg?: string
}

declare interface Window { VHWidgetOpts: VHWidgetOpts }
