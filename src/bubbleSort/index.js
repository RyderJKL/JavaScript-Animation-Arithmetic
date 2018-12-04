import './index.scss'

function bubbleSort(array) {
  const appElement = document.querySelector('#app')
  const documentFragement = document.createDocumentFragment()

  const elementsArr = []
  const elementsArrLength = array.length

  array.forEach((currentValue, index, self) => {
    const element = document.createElement('div')
    element.id = `js-elemet-id-${currentValue}`

    element.style.position = 'absolute'
    element.style.bottom = '10px'
    element.style.left = `${index * 50}px`

    element.style.width = '40px'
    element.style.height = `${currentValue * 20}px`
    element.style.color = 'gray'
    element.style.border = '1px solid gray'
    element.style.boxShadow = '0px 0px 1px 1px gray'
    element.style.borderRadius = '4px'
    element.style.textAlign = 'center'

    element.innerText = currentValue
    element.setAttribute('data-weight', currentValue)

    elementsArr.push(element)
    documentFragement.appendChild(element)
  })

  appElement.append(documentFragement)

  for (let outerIndex = 0; outerIndex < elementsArrLength - 1 ; outerIndex++) {
    setTimeout(() => {
      for (let innerIndex = 0; innerIndex < elementsArrLength - outerIndex - 1; innerIndex++) {
        const currentElement = elementsArr[innerIndex]
        const currentElementValue = +currentElement.getAttribute('data-weight')
        const currentElementOffset = currentElement.style.left

        const nextElement = elementsArr[innerIndex + 1]
        const nextElementValue = +nextElement.getAttribute('data-weight')
        const nextElementOffset = nextElement.style.left

        console.log(currentElementValue, 'currentElementValue')
        console.log(nextElementValue, 'nextElementValue')

        if (currentElementValue > nextElementValue) {
         currentElement.animate([
            // keyframes
            {
              transform: 'translateY(0px)'
            },
            {
              transform: 'translateY(-30px)'
            }
          ], {
            // timing options
            duration: 300
          })
          currentElement.style.anmation = 'all'
          currentElement.style.left = nextElementOffset
          nextElement.style.left = currentElementOffset
          // nextElement.animate([
          //   // keyframes
          //   {
          //     transform: 'translateY(0px)'
          //   },
          //   {
          //     transform: 'translateY(-30px)'
          //   }
          // ], {
          //   // timing options
          //   duration: 3000
          // })
          const temp = array[innerIndex]
          array[innerIndex] = array[innerIndex + 1]
          array[innerIndex + 1] = temp

          const tmpElement = currentElement
          elementsArr[innerIndex] = nextElement
          elementsArr[innerIndex + 1] = tmpElement
        }
      }
    }, 1000)
  }

  // for (let i = 0; i < array.length - 1; i++) {
  //   for (let j = 0; j < array.length - i - 1; j++) {
  //     if (array[j] > array[j + 1]) {
  //       let temp = array[j]
  //       array[j] = array[j + 1]
  //       array[j + 1] = temp
  //     }
  //   }
  // }

  return array
}

export default bubbleSort
