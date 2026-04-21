import PostList from './PostList';
import PostLeftSidebar from './PostLeftSidebar';
import PostRightSidebar from './PostRightSidebar';

const PostsPage = () => {
  return (
    <div className='grid md:grid-cols-5 min-h-screen'>
      <PostLeftSidebar />
      <PostList />
      <PostRightSidebar />
    </div>
  );
};

export default PostsPage;
