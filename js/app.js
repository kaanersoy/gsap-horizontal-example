function delay(n) {
  n = n || 2000
  return new Promise((done) => {
    setTimeout(() => {
      done()
    }, n)
  })
}

function controlLinkEvents() {
  var links = document.querySelectorAll('a[href]')
  var cbk = function (e) {
    if (e.currentTarget.href === window.location.href) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', cbk)
  }
}

function pageTransition() {
  const tl1 = gsap.timeline()
  tl1.to('ul.preload-boxes li', { duration: 0.4, ease: 'expo.in', scaleY: 1, stagger: 0.12 })
  tl1.to('ul.preload-boxes li', { duration: 0.4, ease: 'expo.out', scaleY: 0, stagger: 0.08 })
}

function loaderTransition() {
  const tl1 = gsap.timeline()
  tl1.to('ul.preload-boxes li', { duration: 0.6, ease: 'expo.in', scaleY: 0, stagger: 0.05 })
}

document.addEventListener('DOMContentLoaded', function (event) {
  window.addEventListener('load', async function () {
    controlLinkEvents()
    loaderTransition()
    barba.init({
      sync: true,
      transitions: [
        {
          async leave(data) {
            await pageTransition()
            await delay(600)
          },
        },
      ],
    })
  })
})
