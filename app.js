class App{

  constructor(selectors){
    this.artists = {
      rock: Array(0),
      pop: Array(0),
      country: Array(0),
      hipHop: Array(0),
    }
    this.max = 0
    this.lists = {
      rock: document.querySelector(selectors.rockSelector),
      pop: document.querySelector(selectors.popSelector),
      country: document.querySelector(selectors.countrySelector),
      hipHop: document.querySelector(selectors.hipHopSelector),
    }
    this.allArtistsList = document.querySelector(selectors.allSelector)
    this.sorted = true
    this.template = document
      .querySelector(selectors.templateSelector)

    document
      .querySelector(selectors.formSelector)   
      .addEventListener('submit', this.addMusicViaForm.bind(this)) 
      
    const sort = document.querySelector(selectors.sortSelector)
    sort.addEventListener('change', this.toggleSort.bind(this, JSON.parse(sort.value)))

    this.load()
  }

  load(){
    const artistsJSON = localStorage.getItem('artists')
    const artistsArray = JSON.parse(artistsJSON)

    const sorted = JSON.parse(localStorage.getItem('sorted'))
    
    if(!sorted){
      this.sorted = sorted

      document
        .querySelector('.sorted')
        .classList.add('invisible')
    
      document
        .querySelector('.unsorted')
        .classList.remove('invisible')

      document
        .querySelector('.false')
        .selected = true
    }
    
    if (artistsArray){
      artistsArray.rock
        .reverse()
        .map(this.addMusic.bind(this))
      artistsArray.pop
        .reverse()
        .map(this.addMusic.bind(this))
      artistsArray.country
        .reverse()
        .map(this.addMusic.bind(this))
      artistsArray.hipHop
        .reverse()
        .map(this.addMusic.bind(this))
      
    }
  }

  save(){
    localStorage
      .setItem('artists', JSON.stringify(this.artists))
    localStorage 
      .setItem('sorted', JSON.stringify(this.sorted))
  }

  toggleSort(ev){    
    this.sorted = !this.sorted

    document
      .querySelector('.sorted')
      .classList.toggle('invisible')
    
    document
      .querySelector('.unsorted')
      .classList.toggle('invisible')
    
    this.save()
  }

  addMusic(artist){
    const listItem = this.renderListItem(artist)
    const listItemCopy = this.renderListItem(artist)

    this.lists[artist.genre].insertBefore(listItem, this.lists[artist.genre].firstChild)
    this.allArtistsList.insertBefore(listItemCopy, this.allArtistsList.firstChild)
    this.max++

    if(artist.id > this.max){
      this.max = artist.id
    }

    this.artists[artist.genre].unshift(artist)
    this.save()
  }

  addMusicViaForm(ev){
    ev.preventDefault()

    const form = ev.target

    const artist = {
      name: form.artistName.value,
      genre: form.genre.value,
      id: this.max + 1,
      fav: false,
    }

    this.max++
    
    this.addMusic(artist)

    form.reset()
  }
  
  renderListItem(artist){
    const item = this.template.cloneNode(true)
    item.classList.remove('template')
    item.dataset.id = artist.id
    item.dataset.name = artist.name

    if (artist.fav){
      item.classList.add('fav')
    }
    
    item
      .querySelector('.artist-name')
      .textContent = artist.name

    item
      .querySelector('i.fa')
      .addEventListener('click', this.toggleButtons.bind(this, item))

    item
      .querySelector('button.fav')
      .addEventListener('click', this.favArtist.bind(this, artist))

    item
      .querySelector('button.remove')
      .addEventListener('click', this.removeArtist.bind(this, artist))

    item
      .querySelector('button.up')
      .addEventListener('click', this.moveUp.bind(this, artist))

    item
      .querySelector('button.down')
      .addEventListener('click', this.moveDown.bind(this, artist))

    return item
  }

  toggleButtons(item, ev){

    const actions = item.querySelector('.actions')
    const icon = ev.target
      
    if (actions.style.display === 'none'){
      actions.style.display = 'inline'
      icon.classList.remove('fa-plus-circle')
      icon.classList.add('fa-minus-circle')
    }
    else{
      actions.style.display = 'none'
      icon.classList.remove('fa-minus-circle')
      icon.classList.add('fa-plus-circle')
    }
  }

  favArtist(artist, ev){
    const b = ev.target
    const element = b.closest('li')

    element.classList.toggle('fav')
    artist.fav = !artist.fav
    this.save()
  }

  removeArtist(artist, ev){
    const listItem = ev.target.closest('.music')

    for (let i = 0; i < this.artists[artist.genre].length; i++){
      const currentId = this.artists[artist.genre][i].id.toString()
      if (listItem.dataset.id === currentId){
        this.artists[artist.genre].splice(i, 1)
        break
      }
    }

    listItem.remove()
    this.save()
  }

  moveUp(artist, ev){
    const listItem = ev.target.closest('.music')

    const index = this.artists[artist.genre].findIndex((currentArtist, i) => {
      return currentArtist.id === artist.id
    })

    const genreArtists = this.artists[artist.genre]

    if (index > 0) {
      this.lists[artist.genre].insertBefore(listItem, listItem.previousElementSibling)

      const previousArtist = genreArtists[index - 1]
      genreArtists[index - 1] = artist
      genreArtists[index] = previousArtist

      this.save()
    }
  }

  moveDown(artist, ev){
    const listItem = ev.target.closest('.music')

    const index = this.artists[artist.genre].findIndex((currentArtist, i) => {
      return currentArtist.id === artist.id
    })

    const genreArtists = this.artists[artist.genre]

    if (index < genreArtists.length - 1) {
      this.lists[artist.genre].insertBefore(listItem.nextElementSibling, listItem)

      const nextArtist = genreArtists[index + 1]
      genreArtists[index + 1] = artist
      genreArtists[index] = nextArtist

      this.save()
    }
  }

  showSongs(artist, ev){

  }

}

const app = new App({
  formSelector: '#music-form',
  rockSelector: '.rock',
  popSelector: '.pop',
  countrySelector: '.country',
  hipHopSelector: '.hip-hop',
  allSelector: '.all',
  sortSelector: '.sort',
  templateSelector: '.template'
})