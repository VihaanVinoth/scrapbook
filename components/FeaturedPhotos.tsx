import PhotoCard from "./PhotoCard";

const featuredPhotos = [
  {
    title: "Melbourne Streets",
    camera: "Canon EOS 7D",
    image: "/IMG_2284.JPG",
  },
  {
    title: "Nature",
    camera: "Canon EOS 7D",
    image: "/IMG_2284.JPG",
  },
];

export default function FeaturedPhotos() {
  return (
    <section>
      <h2>Featured Photos</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {featuredPhotos.map((photo) => (
          <PhotoCard
            key={photo.title}
            title={photo.title}
            camera={photo.camera}
            image={photo.image}
          />
        ))}
      </div>
    </section>
  );
}