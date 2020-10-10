export const PLUGIN_STYLE_CLASSNAME = 'geolonia-plugin-tourlist-map'

export const addCustomCSS = () => {
  const style = document.createElement('style')
  style.innerText = `
  .${PLUGIN_STYLE_CLASSNAME} {
    position: fixed;
    right: 10px;
    bottom: 10px;
    border-radius: 10px;
    border: 2px solid gray;
  }
  `
  document.head.append(style)
}

export const renderGeoloniaMap = (map: any, mapContainer: HTMLElement) => {
  let placeholderContainer: HTMLElement | null = null

  if (!mapContainer) {
    return
  }
  const defaultStyle = { ...window.getComputedStyle(mapContainer) }

  const mapObserver = new window.IntersectionObserver((entries) => {
    const { isIntersecting } = entries[0]
    if (!isIntersecting) {
      placeholderContainer = document.createElement('div')
      placeholderContainer.style.height = defaultStyle.height
      placeholderContainer.style.margin = defaultStyle.margin
      mapContainer.after(placeholderContainer)
      mapContainer.classList.add(PLUGIN_STYLE_CLASSNAME)

      if (placeholderContainer) {
        placeholderObserver.observe(placeholderContainer)
      }
    }
  })

  const placeholderObserver = new window.IntersectionObserver((entries) => {
    const { isIntersecting } = entries[0]
    if (isIntersecting && placeholderContainer !== null) {
      placeholderContainer.remove()
      placeholderContainer = null
      mapContainer.classList.remove(PLUGIN_STYLE_CLASSNAME)
    }
  })

  mapObserver.observe(mapContainer)

  return new Promise((resolve, reject) => {
    map.on('load', () => resolve(map))
    map.on('error', (error: Error) => reject(error))
  })
}

// @ts-ignore
window.geolonia.registerPlugin((map, target) => {
  addCustomCSS()
  renderGeoloniaMap(map, target)
})

