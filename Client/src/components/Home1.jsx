import React from 'react';

import DrImg from '../assets/DrImg2.png';

function Home1() {
    return (
        <div className='h-screen bg-gray-100 flex items-center justify-center p-8' id='home1'>
            {/* Text Section */}
            <div className='p-6 flex flex-col justify-center text-right bg-gray-100 mr-20 ml-24'>
                <h2 className='text-2xl font-bold text-gray-800 mb-4'>ابدا معايا دلوقتى</h2>
                <p className='text-gray-600 leading-relaxed font-bold' dir="rtl">
                    محارب الثانوية العامة والأزهرية.. طريقك مليان تحديات، لكن جوّاك قوة تكفي تتخطاها واحدة واحدة!
                    البداية توكل على الله، والاستمرار صبر وعزيمة، والنهاية فرحة تنسيك كل تعب.
                    اجعل كل يوم خطوة تقربك لحلمك، وكل لحظة تعب شهادة على اجتهادك.
                    ثق أن الله لا يضيع مجهودك، وأن النجاح مكتوب للي يسعى.
                    شد حيلك، وخلّي حلمك هو اللي يحركك.. والمكافأة جاية أقرب مما تتخيل! ❤️🔥
                </p>
                <div className='flex flex-row-reverse justify-center items-center space-x-10 space-x-reverse mt-4' dir='rtl'>
                    <a href="#facebook" className="text-blue-600 text-3xl">
                        <i className="fa-brands fa-facebook-f"></i>
                    </a>
                    <a href="#whatsapp" className="text-green-500 text-3xl">
                        <i className="fa-brands fa-whatsapp"></i>
                    </a>
                    <a href="#home2" className="cursor-pointer bg-orange-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-orange-600 transition-all duration-300">
                        سجل وابدأ
                    </a>
                </div>
            </div>
            {/* Image Section */}
            <div className='relative mr-40'>
                <img src={DrImg} alt="DrImg" className='w-[1500px] h-auto object-cover bg-gray-100' />
                <div className='absolute inset-0 bg-gray-200 opacity-10'></div>
            </div>
        </div>
    );
}

export default Home1;
