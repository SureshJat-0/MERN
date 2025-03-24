import Post from "./Post";

export default function AllPostsAllPosts({ allPosts }) {
  return (
    <>
      {allPosts.map((post, ind) => {
        return <Post post={post} key={ind} />;
      })}
    </>
  );
}
