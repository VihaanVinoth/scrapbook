import PhotoCard from "./PhotoCard";

const photos = [
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
  {
    title: "Travel",
    camera: "Canon EOS 7D",
    image: "/IMG_2284.JPG",
  },
];

export default function PhotoGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {photos.map((photo) => (
        <PhotoCard
          key={photo.title}
          title={photo.title}
          camera={photo.camera}
          image={photo.image}
        />
      ))}
    </div>
  );
}