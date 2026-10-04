import PhotoCard from "./PhotoCard";

const photos = [
  {
    title: "Melbourne Streets",
    camera: "Canon EOS 7D",
  },
  {
    title: "Nature",
    camera: "Canon EOS 7D",
  },
  {
    title: "Travel",
    camera: "Canon EOS 7D",
  },
];

export default function PhotoGrid() {
  return (
    <div>
      {photos.map((photo) => (
        <PhotoCard
          key={photo.title}
          title={photo.title}
          camera={photo.camera}
        />
      ))}
    </div>
  );
}