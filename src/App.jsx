import { useCallback, useState } from 'react';
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies.js';
import  {useSearch} from "./hooks/useSearch.js";
import debounce from 'just-debounce-it';

function App() {
  const [sort, setSort] = useState(false);

  const {search, setSearch, error} = useSearch();
  const {movies : mappedMovies, getMovies, loading} = useMovies({search,sort});

  const debounceGetMovies = useCallback(
    debounce((search) => {
      console.log(search)
      getMovies({search})
  },500)
  ,[getMovies]
  )

  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies({search});
  }

  const handleChange = (e) => {
    const newSearch = e.target.value
    if(newSearch.startsWith(" ")) return; 
    setSearch(newSearch);
    debounceGetMovies(newSearch)
  } 

  const handleSort = () => {
    setSort(!sort);
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input style={{
            border: "1px solid transparent",
            borderColor: error ? "red" : "transparent"}}
            onChange={handleChange} value={search} name='query' type="text" placeholder='Avengers, Star Wars, The Matrix'/>
          <input type="checkbox" onChange={handleSort} checked={sort}/>
          <button>Buscar</button>
        </form> 
        {error && <p style={{color:"red"}}>{error}</p>}
      </header>
      <main>
        {
          loading 
          ? <p>Cargando...</p> 
          : <Movies movies={mappedMovies}></Movies>
        }
        
      </main>
    </div>
  )
}

export default App
