import Image from "next/image";

type PhotoCardProps = {
    title: string;
    camera: string;
    image: string;
};

export default function PhotoCard({title, camera, image}: PhotoCardProps) {
    return (
        <div>
            <Image
                src={image}
                alt={title}
                width={600}
                height={400}
            />
            <h2>{title}</h2>
            <p>{camera}</p>
        </div>
    );
}