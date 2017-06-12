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
      .querySelector('i.fa')
      .addEventListener('click', this.toggleButtons.bind(this, item))

    item
      .querySelector('button.fav')
      .addEventListener('click', this.favArtist.bind(this, artist))

    item
      .querySelector('button.remove')
      .addEventListener('click', this.removeArtist.bind(this))

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