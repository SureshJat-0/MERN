import Post from "./Post";

export default function AllPosts({ allPosts, user }) {
  return (
    <>
      {allPosts.map((post, ind) => {
        return <Post post={post} key={ind} user={user} />;
      })}
    </>
  );
}
