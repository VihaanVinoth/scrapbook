import PhotoCard from "@/components/PhotoCard";

export default function Home() {
  return (
    <main>
      <h1>My Photo Blog</h1>
      <p>A collection of my photography.</p>

      <PhotoCard
        title="Melbourne Streets"
        camera="Canon EOS 7D"
        image="/IMG_2284.JPG"
      />
    </main>
  );
}