
export default {
  getWords (annotation) {
    const page = annotation.fullTextAnnotation.pages[0]
    const blocks = page.blocks
    return blocks.reduce((words, block) => {
      let more = block.paragraphs.reduce((words, parag) => {
        return words.concat(parag.words)
      }, [])
      return words.concat(more)
    }, [])
  },
  generateId (text, bbox) {
    let ts = new Date().getTime()

    if (!bbox||bbox.length===0) {
      return btoa(unescape(encodeURIComponent(text + ts)))
    }

    if (!text) {
      return btoa(unescape(encodeURIComponent(bbox[0].x + bbox[0].y + ts)))
    }

    return btoa(unescape(encodeURIComponent(bbox[0].x + bbox[0].y + text)))
  }
}
