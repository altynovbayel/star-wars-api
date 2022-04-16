const $container = document.querySelector('.d_flex')
const $prev = document.querySelector('.prev')
const $next = document.querySelector('.next')
const $allPages = document.querySelector('.allPages')
const $currentPage = document.querySelector('.currentPage')
const $pagination = document.querySelector('.btns')
const $backBtn = document.querySelector('.back')

const baseUrl = 'https://swapi.dev/api/'

const backgroundImg = [
  'https://i.pinimg.com/originals/25/43/81/2543813e77e4ede897ebc169561de540.jpg',
  'https://images.hdqwalls.com/download/star-wars-the-rise-of-skywalker-2019-4k-mz-1920x1080.jpg',
  'https://wallpaperaccess.com/full/11794.png',
  'https://images7.alphacoders.com/712/712440.jpg',
  'https://wallpapersmug.com/download/1920x1080/6fc111/clone-trooper-star-wars-4k.jpg',
  'https://cdn.wallpapersafari.com/48/46/cw5tZM.jpg',
  'https://cdn.wallpapersafari.com/6/35/Ebwg5d.jpg',
]

const themes = [
  {
    title: 'People',
    route: 'people',
  },
  {
    title: 'Starships',
    route: 'starships',
  },
  {
    title: 'Planets',
    route: 'planets',
  },
  {
    title: 'Films',
    route: 'films',
  }
]

let pageCount = 1

let imgCount = 0

function counterPage(n){
  let allPages = Math.ceil(n / 10)
  return allPages
}

window.addEventListener('load', () => {
  localStorage.clear()
  const card = themes.map(({title, route}) => templateRouteCard(title, route)).join('')
  $container.innerHTML = card

})

window.addEventListener('load', () => {
  $currentPage.innerHTML = pageCount
  $prev.setAttribute('disabled', true)
})



function getBase(url, query, cb) {
  fetch(`${url}?${query}`)
    .then((r) => r.json())
    .then((res) => cb(res))
}

function templateRouteCard(title, route){
  return `
    <div class="stCard" onclick = "choosenTheme('${route}')">
      <h2>
        ${title}
      </h2>
    </div>
  `
}


function choosenTheme(route){
  localStorage.setItem('route', route)
  $backBtn.style.display = 'block'
  if(route === 'people'){
    getBase(`${baseUrl}/people`,`page=${pageCount}`, cb => {
      template(cb.results)
      localStorage.setItem('pageCount', cb.count)
      $allPages.innerHTML = counterPage(cb.count)
    })
  } else if (route === 'starships'){
    
    getBase(`${baseUrl}/starships`, `page=${pageCount}`, cb => {
      starhipsTemplate(cb.results)
      localStorage.setItem('pageCount', cb.count)
      $allPages.innerHTML = counterPage(cb.count)
    })
  } else if (route === 'planets'){
    getBase(`${baseUrl}/planets`, `page=${pageCount}`, cb => {
      planetsTemplate(cb.results)
      localStorage.setItem('pageCount', cb.count)
      $allPages.innerHTML = counterPage(cb.count)
    })
  }else if(route === 'films'){
    getBase(`${baseUrl}/films`, `page=${pageCount}`, cb => {
      filmsTemplate(cb.results)
      localStorage.setItem('pageCount', cb.count)
      $allPages.innerHTML = counterPage(cb.count)
    })
  }
}

// PEOPLE CARD

function template(base) {
  const template = base.map(item => {
    return card(item)
  }).join('')

  $container.innerHTML = template
  $pagination.style.display = 'block'
}

function card(el) {
  return `
    <div class="card">
      <div class="card_header">
        <h1>${el.name}</h1>
      </div>
      <div class="card_body">
        <img src="https://www.giantfreakinrobot.com/wp-content/uploads/2021/04/star-wars-logo.jpg">
      </div>
      <div class="card_footer">
        <button class="card_btn" onclick="templateMore('${el.url}')">More...</button>
      </div>
    </div>
`
}

//  PEOPLE MORE CARD

function templateMore(url) {
  getBase(url, '', cb => {
    cardMore(cb)
  })
  $pagination.style.display = 'none'
}

function cardMore(cb){

  $container.innerHTML = `
      <div class="cardMore">
        <div class="cardMore_header">
          <h1>${cb.name}</h1>
        </div>
        <div class="cardMore_body">
          <ul class="card_list">
            <li><span>birthday:</span> <span>${cb.birth_year}</span></li>
            <li><span>Gender:</span> <span>${cb.gender}</span></li>
            <li><span>Width:</span> <span>${cb.mass}</span></li>
            <li><span>Height:</span> <span>${cb.height}</span></li>
            <li><span>Hair:</span> <span>${cb.hair_color}</span> </li>
            <li><span>Eyes:</span> <span>${cb.eye_color} </span> </li>
            <li><span>Skin-color:</span> <span>${cb.skin_color} </span> </li>
          </ul>
        </div>
        <div class="cardMore_footer">
          <button class="backBtn" onclick="location.reload()">back</button>
        </div>
      </div>
    `
} 

// STARHIPS CARD

function starhipsTemplate(arr){
  $pagination.style.display = 'block'
  const shipsCard = arr.map(item => {
    return `
      <div class="cardMore">
        <div class="cardMore_header">
          <h1>${item.name}</h1>
        </div>
        <div class="cardMore_body">
          <ul class="card_list">
            <li><span>Model:</span> <span>${item.model}</span></li>
            <li><span>Lenght:</span> <span>${item.length}</span></li>
            <li><span>Max atmosphering speed:</span> <span>${item.max_atmosphering_speed}</span></li>
            <li><span>Passengers:</span> <span>${item.passengers}</span> </li>
          </ul>
        </div>
      </div>
    `
  }).join('')

  $container.innerHTML = shipsCard
}

//  PLANETS CARD  

function planetsTemplate(arr){
  $pagination.style.display = 'block'
  const planetsCard = arr.map(item => {
    return `
      <div class="cardMore">
        <div class="cardMore_header">
          <h1>${item.name}</h1>
        </div>
        <div class="cardMore_body">
          <ul class="card_list">
            <li><span>Rotation period:</span> <span>${item.rotation_period}</span></li>
            <li><span>orbital period:</span> <span>${item.orbital_period}</span></li>
            <li><span>Diameter:</span> <span>${item.diameter} km</span></li>
            <li><span>Climate:</span> <span>${item.climate}</span> </li>
            <li><span>Gravity:</span> <span>${item.gravity}</span> </li>
            <li><span>_Population:</span> <span>${item.population}</span> </li>
          </ul>
        </div>
      </div>
    `
  }).join('')

  $container.innerHTML = planetsCard
}

// FILMS

function filmsTemplate(arr){
  const films = arr.map(item => {
    return `
      <div class="cardMore">
        <div class="cardMore_header">
          <h1>${item.title}</h1>
        </div>
        <div class="cardMore_body">
          <ul class="card_list">
            <li><span>Director:</span> <span>${item.director}</span></li>
            <li><span>Producer:</span> <span>${item.producer}</span></li>
            <li><span>Release date:</span> <span>${item.release_date} km</span></li>
          </ul>
        </div>
      </div>
    `
  }).join('')
  $container.innerHTML = films
}

// pagination 

$prev.addEventListener('click', e => {
  e.preventDefault()
  pageCount--
  imgCount--
  document.body.style.background = `url('${backgroundImg[imgCount]}') center / cover no-repeat fixed`
  $currentPage.innerHTML = pageCount

  if (pageCount === 1) {
    $prev.setAttribute('disabled', true)
  }
  $next.removeAttribute('disabled')
  const route = localStorage.getItem('route')
  getBase(`${baseUrl}${route}`, `page=${pageCount}`, cb => {
    template(cb.results)
  })
})

$next.addEventListener('click', e => {
  e.preventDefault()
  imgCount++
  document.body.style.background = `url('${backgroundImg[imgCount]}') center / cover no-repeat fixed`
  pageCount++
  $currentPage.innerHTML = pageCount

  const count = localStorage.getItem('pageCount')

  if (pageCount === counterPage(count)) {
    $next.setAttribute('disabled', true)
  }
  $prev.removeAttribute('disabled')
  const route = localStorage.getItem('route')
  getBase(`${baseUrl}${route}`, `page=${pageCount}`, cb => {
    if(route === 'people'){
      template(cb.results)
    } else if (route === 'planets'){
      planetsTemplate(cb.results)
    } else if (route === 'starships'){
      starhipsTemplate(cb.results)
    }
    
  })

})