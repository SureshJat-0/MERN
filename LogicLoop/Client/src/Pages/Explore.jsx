import ExploreCard from "../Components/ExploreCard";

export default function Explore() {
  const titles = ["Quiz Game", "Memory Game"];
  const paths = ["/explore/quiz", "/explore/memory"];
  const imgAlts = ["quiz-game", "memory-game"];
  const imgUrls = [
    "https://images.unsplash.com/photo-1652077859695-de2851a95620?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1586892478407-7f54fcec5b89?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  return (
    <div className="p-12">
      <div className="grid grid-cols-4 gap-8">
        {titles.map((title, ind) => {
          return (
            <ExploreCard
              key={ind}
              path={paths[ind]}
              title={titles[ind]}
              imgUrl={imgUrls[ind]}
              imgAlt={imgAlts[ind]}
            />
          );
        })}
      </div>
    </div>
  );
}
