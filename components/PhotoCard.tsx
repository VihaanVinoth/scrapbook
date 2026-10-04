type PhotoCard = {
  title: string;
};

export default function PhotoCard({ title }: PhotoCard) {
  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
}