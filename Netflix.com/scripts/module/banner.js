import {
  getMovieImage,
  getTrailerVideo,
  paintGenres,
  createModal,
  saveLocalMovies
} from './utils.js'

const banner = document.querySelector('.banner')
const title = banner.querySelector('.banner__title')
const overview = banner.querySelector('.banner__description')
const playBtn = banner.querySelector('.banner__button:nth-child(1)')
const myListBtn = banner.querySelector('.banner__button:nth-child(2)')

export default function createBanner(data) {
  banner.style.backgroundImage = dynamicBgImage(
    data.poster_path,
    data.backdrop_path
  )
  title.textContent = `${data.title || data.name}`
  overview.textContent = `${data.overview}`

  const bannerGenres = banner.querySelector('.banner-genres')
  bannerGenres.innerHTML = ''
  bannerGenres.append(paintGenres(data))

  myListBtn.addEventListener('click', () => saveLocalMovies(data))

  const mediaQuery = window.matchMedia('(min-width: 714px)')
  mediaQuery.addEventListener(
    'change',
    () =>
    (banner.style.backgroundImage = dynamicBgImage(
      data.poster_path,
      data.backdrop_path
    ))
  )
}

function dynamicBgImage(poster_path, backdrop_path) {
  return window.innerWidth < 714
    ? `linear-gradient(to top, #100f0f 10%, rgba(0, 0, 0, 0) 50%), url(${getMovieImage(
      poster_path
    )})`
    : `linear-gradient(to right, #100f0f 5%, rgba(0, 0, 0, 0) 90%), 
    url(${getMovieImage(backdrop_path)})`
}

const createVideo = (id, type) => {
  getTrailerVideo(type, id).then(({ results }) => {
    const videoId = results.findIndex(v => v.name.includes('Trailer'))
    const body = document.querySelector('body')
    const video = document.createElement('iframe')
    video.src = `https://youtube.com/embed/${results[videoId].key}?autoplay=1&mute=1`
    video.classList.add('video')
    body.appendChild(video)

    body.classList.add('video-active')

    const iframeWrapper = document.createElement('div')
    iframeWrapper.classList.add('iframe-wrapper')
    body.appendChild(iframeWrapper)

    iframeWrapper.addEventListener('click', () => {
      body.classList.remove('video-active')
      video.remove()
      iframeWrapper.remove()
    })
  })
}

playBtn.addEventListener('click', () => createVideo(data.id, data.type || data.media_type))
