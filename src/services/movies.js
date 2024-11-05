const URL_API_MOVIES = "https://www.omdbapi.com/?apikey=4287ad07&s=";

export const searchMovies = async({search}) => {
    if(search){
        try{
            const response = await fetch(`${URL_API_MOVIES}${search}`);
            const data = await response.json();

            const movies = data.Search;
            return movies?.map(movie => ({
                id: movie.imdbID,
                title: movie.Title,
                year: movie.Year,
                poster: movie.Poster
            }))
        }catch(error){
            console.log(error);
            throw new Error("Error searching movies");
        }
    }

}