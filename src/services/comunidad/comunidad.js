import { neon } from "@neondatabase/serverless";

const sql = neon(
  "postgresql://poligym_owner:6wx8yVdzLvCJ@ep-still-meadow-a5yjydu0.us-east-2.aws.neon.tech/poligym?sslmode=require"
);

export async function getAllPostsFromDatabase(page = 1) {
  const limit = 5;
  const offset = (page - 1) * limit;

  try {
    // Obtener los posts
    const posts =
      await sql`SELECT * FROM posts WHERE oculto = false ORDER BY fecha DESC LIMIT ${limit} OFFSET ${offset};`;

    // Obtener el número total de posts
    const totalPostsResult =
      await sql`SELECT COUNT(*) FROM posts WHERE oculto = false;`;
    const totalPosts = parseInt(totalPostsResult[0].count, 10);
    const lastPage = Math.ceil(totalPosts / limit);

    return {
      data: posts,
      meta: {
        page,
        lastPage,
      },
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { error: "Error fetching posts" };
  }
}
