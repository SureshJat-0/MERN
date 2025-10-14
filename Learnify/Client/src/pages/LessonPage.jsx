import { useParams } from "react-router-dom";

export default function LessonPage() {
  const { lessonId } = useParams();
  return <div>LessonPage {lessonId}</div>;
}
