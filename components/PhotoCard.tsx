import Image from "next/image";
import Link from "next/link";

type PhotoCardProps = {
  title: string;
  camera: string;
  image: string;
  slug?: string;
};

export default function PhotoCard({
  title,
  camera,
  image,
  slug,
}: PhotoCardProps) {
  const card = (
    <div>
      <Image
        src={image}
        alt={title}
        width={600}
        height={400}
      />

      <h2 className="mt-3 text-xl font-medium">{title}</h2>
      <p className="text-zinc-500">{camera}</p>
    </div>
  );

  if (slug) {
    return <Link href={`/photos/${slug}`}>{card}</Link>;
  }

  return card;
}