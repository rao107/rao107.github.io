import fs from "fs";
import matter from "gray-matter";
import dayjs from "dayjs";

const getPosts = () => {
  const filenames = fs.readdirSync('posts');
  const matters = filenames.map((x) => matter(fs.readFileSync(`posts/${x}`)));
  const posts = matters.map((matter, i) => ({
    title: matter.data.title,
    slug: filenames[i].replace('.md', ''),
    date: dayjs(matter.data.date),
    thumbnail: matter.data.thumbnail,
    content: matter.content,
  } as const));
  return posts.sort((a, b) => b.date.toDate().getTime() - a.date.toDate().getTime());
};

const posts = getPosts();
export default posts;
