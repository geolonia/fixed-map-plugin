import * as Geolonia from '@geolonia/embed'

export const PLUGIN_STYLE_CLASSNAME = '__fixed-map-geolonia-plugin'
export const PLUGIN_CUSTOMIZAER_CLASSNAMES = ['fixed', 'geolonia-map-fixed']
export const INTERSECTION_ROOT_MARGIN = '10px 10px 10px 10px'

export const addCustomCSS = () => {
  const style = document.createElement('style')
  style.innerText = `
  .${PLUGIN_STYLE_CLASSNAME} {
    position: fixed;
    width: 300px;
    height: 200px;
    right: 10px;
    bottom: 10px;
    border-radius: 10px;
    border: 2px solid gray;
    margin: 0;
  }`.replaceAll('\n', "").replace(/^\s+/, "")
  document.head.append(style)
}

const observeContainer = (map: any, mapContainer: HTMLElement) => {
  let placeholderContainer: HTMLElement | null = null
  let onceIntersected = false
  if (!mapContainer) {
    return
  }
  const defaultStyle = { ...window.getComputedStyle(mapContainer) }

  const placeholderObserver = new window.IntersectionObserver((entries) => {
    const { isIntersecting } = entries[0]
    if (isIntersecting && placeholderContainer !== null) {
      placeholderContainer.remove()
      placeholderContainer = null
      mapContainer.classList.remove(PLUGIN_STYLE_CLASSNAME, ...PLUGIN_CUSTOMIZAER_CLASSNAMES)
      map.resize()
    }
  }, { rootMargin: INTERSECTION_ROOT_MARGIN })

  const mapObserver = new window.IntersectionObserver((entries) => {
    const { isIntersecting } = entries[0]
    if (isIntersecting) {
      onceIntersected = true
    } else if (onceIntersected) {
      placeholderContainer = document.createElement('div')
      placeholderContainer.style.height = defaultStyle.height
      placeholderContainer.style.margin = defaultStyle.margin
      mapContainer.after(placeholderContainer)
      mapContainer.classList.add(PLUGIN_STYLE_CLASSNAME, ...PLUGIN_CUSTOMIZAER_CLASSNAMES)
      map.resize()

      if (placeholderContainer) {
        placeholderObserver.observe(placeholderContainer)
      }
    }
  }, { rootMargin: INTERSECTION_ROOT_MARGIN })

  mapObserver.observe(mapContainer)

  return new Promise((resolve, reject) => {
    map.on('load', () => resolve(map))
    map.on('error', (error: Error) => reject(error))
  })
}

// disallow multiple maps
let oncePluginLoaded = false

const FixedMapGeoloniaPlugin: Geolonia.EmbedPlugin = (map, target) => {
  if (!oncePluginLoaded) {
    addCustomCSS()
    observeContainer(map, target)
    oncePluginLoaded = true
  }
}

window.geolonia.registerPlugin(FixedMapGeoloniaPlugin)
