import { Link } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";

interface Teacher {
  _id: string;
  name: string;
  department: string;
  subjects: string[];
  profilePicture?: string;
  averageRating: number;
  totalReviews: number;
}

interface TeacherCardProps {
  teacher: Teacher;
}

export default function TeacherCard({ teacher }: TeacherCardProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative w-4 h-4">
            <StarOutlineIcon className="absolute w-4 h-4 text-yellow-400" />
            <div className="absolute overflow-hidden w-2">
              <StarIcon className="w-4 h-4 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <StarOutlineIcon key={i} className="w-4 h-4 text-gray-300 dark:text-gray-600" />
        );
      }
    }
    return stars;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="text-center mb-4">
        <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
          {teacher.profilePicture ? (
            <img
              src={teacher.profilePicture}
              alt={teacher.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-xl font-semibold">
              {teacher.name.split(' ').map(n => n[0]).join('')}
            </div>
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          {teacher.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          {teacher.department}
        </p>
        <div className="flex flex-wrap gap-1 justify-center mb-3">
          {teacher.subjects.slice(0, 2).map((subject) => (
            <span
              key={subject}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
            >
              {subject}
            </span>
          ))}
          {teacher.subjects.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
              +{teacher.subjects.length - 2} more
            </span>
          )}
        </div>
      </div>

      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-1 mb-1">
          {renderStars(teacher.averageRating)}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {teacher.averageRating > 0 ? teacher.averageRating.toFixed(1) : 'No ratings'} 
          {teacher.totalReviews > 0 && ` (${teacher.totalReviews} review${teacher.totalReviews !== 1 ? 's' : ''})`}
        </p>
      </div>

      <Link
        to={`/teacher/${teacher._id}`}
        className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        View Profile
      </Link>
    </div>
  );
}
