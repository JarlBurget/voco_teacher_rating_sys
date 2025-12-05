import { useParams } from "react-router-dom";

export default function TeacherProfile() {
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
        Teacher Profile
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        Viewing profile for teacher with ID: <b>{id}</b>
      </p>
      <p className="text-gray-500 dark:text-gray-400">
        (This is just a placeholder page)
      </p>
    </div>
  );
}
