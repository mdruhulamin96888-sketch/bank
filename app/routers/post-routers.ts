import { prisma } from "@/lib/prisma";

export type PostInput = {
  title: string;
  brief: string;
};

export const postRouter = {
  allPost: async () => {
    return await prisma.post.findMany();
  },

  addPost: async (input: PostInput) => {
    const created = await prisma.post.create({
      data: input,
    });

    return { success: true, post: created };
  },
};

export default postRouter;