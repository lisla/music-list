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
    this.template = document
      .querySelector(selectors.templateSelector)

    document
      .querySelector(selectors.formSelector)   
      .addEventListener('submit', this.addMusicViaForm.bind(this)) 
  }

  addMusic(artist){
    const listItem = this.renderListItem(artist)
    this.lists[artist.genre].appendChild(listItem)
    this.max++

    if(artist.id > this.max){
      this.max = artist.id
    }

    this.artists[artist.genre].unshift(artist)
  }

  addMusicViaForm(ev){
    ev.preventDefault()

    const form = ev.target

    const artist = {
      name: form.artistName.value,
      genre: form.genre.value,
      id: this.max + 1
    }

    this.max++
    
    this.addMusic(artist)
  }
  
  renderListItem(artist){
    const item = this.template.cloneNode(true)
    item.classList.remove('template')
    
    item
      .querySelector('.artist-name')
      .textContent = artist.name
    
    item
      .querySelector('button.fav')
      .addEventListener('click', this.favArtist.bind(this))

    item
      .querySelector('button.remove')
      .addEventListener('click', this.removeArtist.bind(this))

    item
      .querySelector('button.up')
      .addEventListener('click', this.moveUp.bind(this, artist))

    item
      .querySelector('button.down')
      .addEventListener('click', this.moveDown.bind(this, artist))

    // item 
    //   .querySelector('button.songs')
    //   .addEventListener('click', this.showSongs.bind(this, artist))
    return item
  }

  favArtist(ev){

  }

  removeArtist(ev){

  }

  moveUp(artist, ev){

  }

  moveDown(artist, ev){

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
  templateSelector: '.template'
})