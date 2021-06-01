import episodes from "./api/episodes";

export default function Home(props) {
  return (
    <>
      <h1>Página Index</h1>
      <p>&nbsp;</p>
      <p>{JSON.stringify(props.episodes)}</p>
    </>
  );
}

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/episodes");
  const data = await response.json();

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  };
}
