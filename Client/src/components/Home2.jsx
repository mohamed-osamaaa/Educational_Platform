import React from 'react';

import firstStage from '../assets/th1.svg';

function Home2() {
    return (
        <div className="flex flex-col items-center p-6 min-h-screen bg-gray-100" id='home2' dir='rtl'>
            <h1 className="text-5xl font-bold text-gray-800 mb-40 mt-5">اختار مرحلتك</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full px-10">
                {["الصف الاول الثانوى", "الصف الثاني الثانوى", "الصف الثالث الثانوى"].map((stage, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-2xl p-10 flex flex-col items-center text-center transition-transform transform hover:scale-105 w-full h-96">
                        <img src={firstStage} alt="firstStage" className="w-40 h-40 mb-6" />
                        <p className="text-xl font-medium text-gray-700 mb-10">{stage}</p>
                        <button className="cursor-pointer bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors text-lg">اختار الكورس</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home2;
