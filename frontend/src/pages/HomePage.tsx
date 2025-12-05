import { Link } from "react-router-dom";
import { StarIcon, UserGroupIcon, AcademicCapIcon } from "@heroicons/react/24/solid";

export default function HomePage() {
  // Placeholder top teachers for now
  const topTeachers = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    name: `Teacher ${i + 1}`,
    rating: 4 + (i % 2) * 0.5, // 4.0, 4.5 etc
  }));

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Welcome to TeacherRate</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Rate your teachers and help fellow students make informed decisions!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/teachers"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Find Your Teacher
            </Link>
            <Link
              to="/teachers"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Browse All Teachers
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <AcademicCapIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">500+</h3>
            <p className="text-gray-600 dark:text-gray-300">Teachers Rated</p>
          </div>
          <div>
            <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <StarIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">10,000+</h3>
            <p className="text-gray-600 dark:text-gray-300">Reviews Submitted</p>
          </div>
          <div>
            <div className="bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserGroupIcon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">25,000+</h3>
            <p className="text-gray-600 dark:text-gray-300">Students Helped</p>
          </div>
        </div>
      </section>

      {/* Top Rated Teachers */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Top Rated Teachers</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Discover the highest-rated educators on our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topTeachers.map((teacher) => (
              <div
                key={teacher.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{teacher.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">Rating: {teacher.rating} ★</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/teachers"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Teachers
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
            Rating teachers is simple and helps the entire student community
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Find Your Teacher</h3>
              <p className="text-gray-600 dark:text-gray-300">Search by name, department, or subject</p>
            </div>
            <div>
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Rate & Review</h3>
              <p className="text-gray-600 dark:text-gray-300">Give an honest rating and share your experience</p>
            </div>
            <div>
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Help Others</h3>
              <p className="text-gray-600 dark:text-gray-300">Your reviews help fellow students choose wisely</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
