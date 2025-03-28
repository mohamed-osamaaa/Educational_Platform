import React from 'react';

import { useNavigate } from 'react-router-dom';

import firstStage from '../assets/th1.svg';
import secondStage from '../assets/th2.svg';
import thirdStage from '../assets/thh3.svg';

function Home2() {
    const navigate = useNavigate();

    const stages = [
        { name: "الصف الاول الثانوى", image: firstStage, path: "/course1" },
        { name: "الصف الثاني الثانوى", image: secondStage, path: "/course2" },
        { name: "الصف الثالث الثانوى", image: thirdStage, path: "/course3" }
    ];

    return (
        <div className="flex flex-col items-center p-6 min-h-screen bg-gray-100" id='home2' dir='rtl'>
            <h1 className="text-5xl font-bold text-gray-800 mb-40 mt-5">اختار مرحلتك</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full px-10">
                {stages.map((stage, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-2xl p-10 flex flex-col items-center text-center transition-transform transform hover:scale-105 w-full h-96">
                        <img src={stage.image} alt={`صورة تمثل ${stage.name}`} className="w-40 h-40 mb-6" />
                        <p className="text-xl font-medium text-gray-700 mb-10">{stage.name}</p>
                        <button
                            onClick={() => navigate(stage.path)}
                            className="cursor-pointer bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors text-lg">
                            اختار الكورس
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home2;
