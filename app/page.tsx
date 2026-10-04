import PhotoCard from "@/components/PhotoCard";

export default function Home() {
  return (
    <main>
      <h1>scrapbook.vihaanvinoth.com</h1>
      <p>An album of the photos I have taken over the years</p>

      <PhotoCard title="Melbourne Streets" />
      <PhotoCard title="Nature" />
      <PhotoCard title="Travel" />
    </main>
  );
}