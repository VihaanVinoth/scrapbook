type PhotoPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PhotoPage({ params }: PhotoPageProps) {
  const { slug } = await params;

  return (
    <main>
      <h1>Photo</h1>
      <p>Slug: {slug}</p>
    </main>
  );
}