import Image from "next/image";

type PhotoCardProps = {
  title: string;
  camera: string;
};

export default function PhotoCard({ title, camera }: PhotoCardProps) {
  return (
    <div>
      <Image
        src="/IMG_2284.JPG"
        alt={title}
        width={600}
        height={400}
      />

      <h2>{title}</h2>
      <p>{camera}</p>
    </div>
  );
}