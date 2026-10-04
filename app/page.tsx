import FeaturedPhotos from "@/components/FeaturedPhotos";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-4xl font-semibold">
        scrapbook.vihaanvinoth.com
      </h1>

      <p className="mt-3 text-zinc-600">
        An album of the photos I have taken over the years.
      </p>

      <div className="mt-12">
        <FeaturedPhotos />
      </div>
    </main>
  );
}