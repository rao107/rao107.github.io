import fs from "fs";
import matter from "gray-matter";
import dayjs from "dayjs";

const getPosts = () => {
  const posts = fs.readdirSync('posts');
  const matters = posts.map((x) => matter(fs.readFileSync(`posts/${x}`)));
  return matters.map((matter, i) => ({
    title: matter.data.title,
    slug: posts[i].replace('.md', ''),
    date: dayjs(matter.data.date),
    thumbnail: matter.data.thumbnail,
    content: matter.content,
  }));
};

const posts = getPosts().sort((a, b) => b.date.toDate().getTime() - a.date.toDate().getTime());
export default posts;
