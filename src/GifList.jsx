// GifList Component.js

const GifList = ({ gifs }) => {
    return (
      <div className="gif-list">
        {gifs.map((gif) => (
          <img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} />
        ))}
      </div>
    );
  };

  export default GifList;