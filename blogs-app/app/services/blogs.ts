
const blogs = [
  {
    id: 0,
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    id: 1,
    title: 'Understanding JavaScript',
    author: 'Kyle Simpson',
    url: 'https://github.com/getify/You-Dont-Know-JS',
    likes: 12,
  },
  {
    id: 2,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    url: 'https://cleancoder.com/',
    likes: 5,
  },
   {
    id: 3,
    title: 'Learn Next.js',
    author: 'Silas Moracha',
    url: 'https://nextjs.com/',
    likes: 5,
  },
]

let nextId = 4

export const getBlogs = () => {
  return blogs
}

export const addBlog = (
  title: string,
  author: string,
  url: string
) => {
  blogs.push({
    id: nextId++,
    title,
    author,
    url,
    likes: 0,
  })
}
export const likeBlog = (id: number) => {
  const blog = blogs.find((blog) => blog.id === id)

  if (blog) {
    blog.likes += 1
  }
}

export const getBlogById = (id: number) => {
  return blogs.find((blog) => blog.id === id)
} 