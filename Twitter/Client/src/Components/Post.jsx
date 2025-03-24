export default function Post({ post, ind }) {
  return (
    <div className="py-2 px-6 my-4 border-b border-zinc-600">
      <h3 className="font-bold">Suresh Jat <span className="text-zinc-600">{post.userName}</span></h3>
      <p className="font-light mt-1">{post.article} </p>
      <img src={post.imgUrl} alt="Post Image" className="rounded-xl border border-zinc-600 mt-4"/>
    </div>
  );
}
