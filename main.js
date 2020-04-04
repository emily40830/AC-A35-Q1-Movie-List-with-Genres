const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'
const data = []

const leftList = document.getElementById('v-pills-tab');
const movieContent = document.getElementById('movieContent');
const movieType = ["Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Science Fiction",
  "TV Movie",
  "Thriller",
  "War",
  "Western"]

// 獲取所有電影資料
axios.get(INDEX_URL).then((response) => {
  data.push(...response.data.results)
  data.map((da) => da.genres = genresMapping(da.genres))
  displayMovieCard(data);
}).catch((err) => console.log(err))
// console.log(data)

// 列表綁定事件
leftList.addEventListener('click', event => {
  if (event.target.matches('.nav-link')) {
    console.log(data)
    const selectType = event.target.innerText
    console.log(selectType)
    const dataBeenFilter = showSpecificMovie(selectType, data);
    console.log(dataBeenFilter)
    displayMovieCard(dataBeenFilter)
  }

})


// functions //
function genresMapping(array) {
  return array.map(i => movieType[i - 1])
}

function showLeftList(count) {
  let htmlContent = ``
  for (let i = 0; i < count; i++) {
    let item = movieType[i];
    htmlContent += `
    <a class="nav-link" data-toggle="pill" href="#" role="tab" aria-selected="false">${item}</a>
    `
    // console.log(movieType[i])
  }
  leftList.innerHTML = htmlContent;
}
// I/O - 指定類型->符合指定類型的資料
function showSpecificMovie(type, data) {
  const result = data.filter(da => da.genres.includes(type))

  return result;
}
// I/O - 要渲染的資料->每張電影卡片網頁畫面

function displayMovieCard(data) {
  let htmlContent = ``
  data.forEach(function (item, index) {
    // console.log(item)
    // console.log(POSTER_URL + item.image)
    let cardfront = `
    <div class="col-sm-3">
          <div class="card mb-2">
            <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
            </div>
            <div class="card-footer">
            `
    let cardTag = ``
    item.genres.forEach(g => {
      cardTag += `<button type="button" class="btn typeTag">${g}</button>`
    })
    let cardfooter = `
   </div></div></div>`
    let eachCard = cardfront + cardTag + cardfooter;
    htmlContent += eachCard;
  })

  movieContent.innerHTML = htmlContent;

  //}
}


showLeftList(19)


  // console.log(dataAll)

