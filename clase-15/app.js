const URL_BASE = 'https://rickandmortyapi.com/api/character?'

const $ = e => document.querySelector(e);

const cards = $('#cards')
const genderSelect = $('gender')

const fetchCharacters = async (params ={}) => {
    console.log(params)
    
    const url = new URL(URL_BASE)
    Object.entries(params).forEach(([key, value])=>{
        if(value)url.searchParams.append(key, value)
            
        })
    // opción manual cncateno los elementos del objeto
        // let url = `${API_URL}`
    // if(params.name) url += `name=${params.name}&`
    // if(params.species) url += `species=${params.species}&`

    console.log(url)



    const res = await fetch(url)
    const data = await res.json()
    console.log(data.results)
    renderCards(data.results)
}


const renderCards = (characters) =>{
    cards.innerHTML=''
 characters.forEach(char => {
    const column = document.createElement('div');
    column.className = 'column is-one-quarter';
    column.innerHTML = `
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${char.image}" alt="${char.name}">
          </figure>
        </div>
        <div class="card-content">
          <p class="title is-5">${char.name}</p>
         
        </div>
      </div>
    `;
    cards.appendChild(column);
});

}
const getFilters =  () =>{
    console.log({
        gender : $('#gender').value,
        status: $('#status').value,
    }
)
    return  {
        gender : $('#gender').value,
        status: $('#status').value,
    }

}



$('#gender').addEventListener('change', getFilters)

fetchCharacters()

