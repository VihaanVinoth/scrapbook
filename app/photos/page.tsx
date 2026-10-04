import PhotoCard from "@/components/PhotoCard";

export default function Photos() {
  return (
    <main>
      <h1>Photos</h1>
      <p>All of my photography.</p>

      <PhotoCard title="Melbourne Streets" />
      <PhotoCard title="Nature" />
      <PhotoCard title="Travel" />
    </main>
  );
}