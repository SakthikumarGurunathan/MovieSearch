const searchBtn = document.getElementById('search-btn')
let movieDetailsArray = []
let count = 0
let unilen
searchBtn.addEventListener('click', getResults)
 async function getResults(event){ 
    document.getElementById('after-search').innerHTML= ''   
    event.preventDefault()
    let movieName = document.getElementById('gsearch').value
    console.log(movieName)
    const response = await fetch(`https://www.omdbapi.com/?apikey=e1253314&s=${movieName}&type=movie&plot=full`)
    const data = await response.json()
    responseWork(data)
    document.getElementById('gsearch').value = ""
    
        // console.log(data)
}
async function responseWork(dataReceived){
        console.log(dataReceived)
     if(dataReceived.Response){
        document.getElementById('before-search').style.display = "none";
        for(i=0;i<dataReceived.Search.length;i++){
            const res = await fetch(`https://www.omdbapi.com/?apikey=e1253314&t=${ dataReceived.Search[i].Title}&plot=full`)
            const specificMovieData = await res.json()
            if(!movieDetailsArray.includes(specificMovieData)){
             movieDetailsArray.push({
                movieName : specificMovieData.Title,
                yearReleased : specificMovieData.Year,
                runtime : specificMovieData.Runtime,
                genre:specificMovieData.Genre,
                plot:specificMovieData.Plot,
                image:specificMovieData.Poster,
                rating:specificMovieData.imdbRating
            })
            }
            }
            
            }
            // To remove the duplicates from the array of objects
            jsonObject = movieDetailsArray.map(JSON.stringify);
            uniqueSet = new Set(jsonObject);
            let uniqueMovieArray = Array.from(uniqueSet).map(JSON.parse);
            console.log(uniqueMovieArray.length)
            setMovieHtml(uniqueMovieArray)
            
            console.log(uniqueMovieArray)
        }
         
function setMovieHtml(uniqueMovie){
    console.log(uniqueMovie)
       uniqueMovie.forEach((eachMovie,index)=>{
         document.getElementById('after-search').innerHTML += 
    `<div class="after-search2">
        <img src = "${eachMovie.image}" class = "movie-image"/>
    <div class="after-search1">
         <div class = "movie-element">
               <h3>${eachMovie.movieName},${index}</h3>
               <p>${eachMovie.rating}</p>
        </div> 
        <div class = "movie-element">
               <p>${eachMovie.runtime}<p>
               <p>${eachMovie.genre}</p>
               <p>Watchlist</p>
        </div>
        <div class = "movie-element">
            <p>${eachMovie.plot}<p>
        </div>
    </div>
    </div>
    <div class="hor"></div>
    `}
    )

//     document.getElementById('after-search').innerHTML= ''        
//
}
