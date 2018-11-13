function bubbleSort(array) {
  const tmpArray = array.concat()
  const total = array.length
  const arrayElements = []

  array.forEach(item => {
    const element = document.createElement('span')
    element.id = `js-elemet-id-${item}`
    element.classList.add('js-class-element')
    element.style.display = 'inline-block'
    element.style.width = '40px'
    element.style.height = '200px'
    element.innerText = item
    arrayElements.push(element)
    document.querySelector('#app').append(element)
  })

  for (let i = 0; i < total - 1; i++) {
    for (let j = 0; j < total - i; j++) {
      if (array[j] > array[j + 1]) {
        let temp = array[j]
        array[j] = array[j + 1]
        array[j + 1] = temp
      }
    }
  }

  return array
}

export default bubbleSort
