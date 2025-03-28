import React, {
    useEffect,
    useState,
} from 'react';

import { useCourseStore } from '../store/useAuthStore';

function CoursePage({ courseType }) {
    const { courses, fetchCourses } = useCourseStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCourses(courseType).finally(() => setLoading(false));
    }, [courseType, fetchCourses]);

    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Courses</h1>
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-60 w-full bg-gray-200 animate-pulse rounded-lg"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {courses.map((course) => (
                        <div key={course._id} className="rounded-2xl shadow-lg hover:shadow-xl transition bg-white overflow-hidden">
                            <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold">{course.title}</h2>
                                <p className="text-sm text-gray-600">{course.isFree ? "Free" : `$${course.pricing}`}</p>
                                <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
                                    View Course
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CoursePage;
