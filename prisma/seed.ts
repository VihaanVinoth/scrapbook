import "dotenv/config";
import prisma from "../lib/db";

async function main() {
  const post = await prisma.post.create({
    data: {
      title: "Melbourne Streets",
      slug: "melbourne-streets",
      published: true,
      photos: {
        create: [
          {
            url: "/IMG_2284.jpg",
            order: 0,
          },
        ],
      },
    },
  });

  console.log("Created post:", post.title);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());