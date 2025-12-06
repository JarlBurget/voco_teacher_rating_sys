import { useParams } from "react-router-dom";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";
import { EnvelopeIcon, ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

// Helper to render stars
const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const isFilled = i <= rating;
    const StarComponent = isFilled ? StarIcon : StarOutlineIcon;
    stars.push(
      <button
        key={i}
        type={interactive ? "button" : undefined}
        onClick={interactive ? () => onRatingChange?.(i) : undefined}
        className={`w-5 h-5 ${
          interactive ? "hover:scale-110 transition-transform cursor-pointer" : ""
        } ${isFilled ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
        disabled={!interactive}
      >
        <StarComponent className="w-full h-full" />
      </button>
    );
  }
  return stars;
};

export default function TeacherProfile() {
  const { id } = useParams<{ id: string }>();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    studentName: "",
    rating: 5,
    comment: "",
    subject: "",
  });

  // Dummy teacher data
  const teacher = {
    name: "Jane Doe",
    profilePicture: "",
    department: "Mathematics",
    subjects: ["Algebra", "Calculus", "Geometry"],
    bio: "Passionate math teacher with 10 years of experience.",
    email: "jane.doe@example.com",
    officeHours: "Mon-Fri 10:00-12:00",
    contactInfo: "Room 204, Main Building",
    averageRating: 4.2,
    totalReviews: 3,
    ratingDistribution: [
      { rating: 5, count: 2, percentage: 67 },
      { rating: 4, count: 1, percentage: 33 },
      { rating: 3, count: 0, percentage: 0 },
      { rating: 2, count: 0, percentage: 0 },
      { rating: 1, count: 0, percentage: 0 },
    ],
    reviews: [
      { _id: "1", studentName: "Alice", rating: 5, comment: "Great teacher!", subject: "Algebra", _creationTime: Date.now() - 86400000 },
      { _id: "2", studentName: "Bob", rating: 4, comment: "Explains concepts well.", subject: "Calculus", _creationTime: Date.now() - 172800000 },
      { _id: "3", studentName: "Charlie", rating: 5, comment: "Very patient and helpful.", subject: "Geometry", _creationTime: Date.now() - 259200000 },
    ],
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.studentName || !reviewForm.comment || !reviewForm.subject) {
      toast.error("Please fill in all fields");
      return;
    }
    // For dummy mode, just add review locally
    teacher.reviews.push({ ...reviewForm, _id: Date.now().toString(), _creationTime: Date.now() });
    toast.success("Review submitted (dummy data)!");
    setShowReviewForm(false);
    setReviewForm({ studentName: "", rating: 5, comment: "", subject: "" });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Teacher Info */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-32 h-32 mx-auto md:mx-0 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-3xl font-semibold">
            {teacher.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{teacher.name}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">{teacher.department}</p>
            <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
              {renderStars(teacher.averageRating)}
              <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
                {teacher.averageRating.toFixed(1)}
              </span>
              <span className="text-gray-600 dark:text-gray-300">
                ({teacher.totalReviews} review{teacher.totalReviews !== 1 ? "s" : ""})
              </span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
              {teacher.subjects.map((subject) => (
                <span key={subject} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                  {subject}
                </span>
              ))}
            </div>
            {teacher.bio && <p className="text-gray-600 dark:text-gray-300 mb-4">{teacher.bio}</p>}
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2"><EnvelopeIcon className="w-4 h-4" /><span>{teacher.email}</span></div>
              <div className="flex items-center gap-2"><ClockIcon className="w-4 h-4" /><span>{teacher.officeHours}</span></div>
              <div className="flex items-center gap-2"><MapPinIcon className="w-4 h-4" /><span>{teacher.contactInfo}</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Reviews ({teacher.totalReviews})</h2>
        {teacher.reviews.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300 text-center py-8">No reviews yet. Be the first!</p>
        ) : (
          <div className="space-y-6">
            {teacher.reviews.map((review) => (
              <div key={review._id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{review.studentName}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{review.subject}</p>
                  </div>
                  <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{review.comment}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{new Date(review._creationTime).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Review Form */}
      <div className="mb-8">
        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          {showReviewForm ? "Cancel Review" : "Write a Review"}
        </button>
      </div>
      {showReviewForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Write a Review</h2>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={reviewForm.studentName}
              onChange={(e) => setReviewForm({ ...reviewForm, studentName: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="Subject/Course"
              value={reviewForm.subject}
              onChange={(e) => setReviewForm({ ...reviewForm, subject: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <div className="flex gap-1">{renderStars(reviewForm.rating, true, (rating) => setReviewForm({ ...reviewForm, rating }))}</div>
            <textarea
              placeholder="Your Review"
              rows={4}
              value={reviewForm.comment}
              onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Submit Review
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
