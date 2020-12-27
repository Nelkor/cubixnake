const element = document.querySelector('#fps-counter')!

let count = 0
let startTime = Date.now()

export const registerFrame = (): void => {
  const now = Date.now()

  if (now - startTime >= 1e3) {
    element.innerHTML = count.toString()
    count = 0
    startTime = now
  }

  count++
}
