import PostList from './PostList'
import PostLeftSidebar from './PostLeftSidebar'
import PostRightSidebar from './PostRightSidebar'

const PostsPage = () => {
  return (
    <div className="grid min-h-screen md:grid-cols-5">
      <PostLeftSidebar />
      <PostList />
      <PostRightSidebar />
    </div>
  )
}

export default PostsPage
