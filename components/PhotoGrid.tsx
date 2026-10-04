import PhotoCard from "./PhotoCard";

const photos = [
  "Melbourne Streets",
  "Nature",
  "Travel",
];

export default function PhotoGrid() {
  return (
    <div>
      {photos.map((photo) => (
        <PhotoCard key={photo} title={photo} />
      ))}
    </div>
  );
}