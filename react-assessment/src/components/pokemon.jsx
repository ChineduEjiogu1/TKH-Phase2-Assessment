import useSWR from "swr";

const Pokemon = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "https://pokeapi.co/api/v2/pokemon/?limit=300",
    fetcher
  );
  console.log(data);

    if (error) {
        return <div>failed to load data</div>;
    }
    if (isLoading)  {
        return <div>loading Pokemons...</div>;
    }

  return (
    <div>
      {data &&
        data.results.map((pokemon) => (
          <div>
            <div>{pokemon.name}</div>
            <a href={pokemon.url}> {pokemon.url} </a>
          </div>
        ))}
    </div>
  );
};

export default Pokemon;