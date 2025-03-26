export default function Post({ post, user }) {
  return (
    <div className="py-2 px-6 my-4 border-b border-zinc-600">
      <h3 className="font-bold">
        {post.owner === undefined ? user.fullname : post.owner.fullname}{" "}
        <span className="text-zinc-600">
          &nbsp;&nbsp;&nbsp;@
          {post.owner === undefined ? user.username : post.owner.username}
        </span>
      </h3>
      <p className="font-light mt-1">{post.article} </p>
      <img
        src={post.imgUrl}
        alt="Post Image"
        className="rounded-xl border border-zinc-600 mt-4"
      />
    </div>
  );
}
