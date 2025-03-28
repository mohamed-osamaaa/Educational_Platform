import React from 'react';

import DrImg from '../assets/DrImg2.png';

function Home1() {
    return (
        <div className='min-h-screen bg-gray-100 flex sm:flex-col-reverse flex-col lg:flex-row items-center justify-center p-4 md:p-8' id='home1' dir='rtl'>
            <div className='w-full lg:w-1/2 relative mt-6 lg:mt-0 lg:mr-40'>
                <img src={DrImg} alt="DrImg" className='w-full max-w-[1500px] h-auto object-cover bg-gray-100 mx-auto' />
                <div className='absolute inset-0 bg-gray-200 opacity-10'></div>
            </div>
            <div className='w-full lg:w-1/2 p-6 flex flex-col justify-center text-right bg-gray-100 lg:mr-20 lg:ml-24'>
                <h2 className='text-xl md:text-2xl font-bold text-gray-800 mb-4'>ابدا معايا دلوقتى</h2>
                <p className='text-gray-600 leading-relaxed font-bold text-sm md:text-base' dir="rtl">
                    محارب الثانوية العامة والأزهرية.. طريقك مليان تحديات، لكن جوّاك قوة تكفي تتخطاها واحدة واحدة!
                    البداية توكل على الله، والاستمرار صبر وعزيمة، والنهاية فرحة تنسيك كل تعب.
                    اجعل كل يوم خطوة تقربك لحلمك، وكل لحظة تعب شهادة على اجتهادك.
                    ثق أن الله لا يضيع مجهودك، وأن النجاح مكتوب للي يسعى.
                    شد حيلك، وخلّي حلمك هو اللي يحركك.. والمكافأة جاية أقرب مما تتخيل! ❤️🔥
                </p>
                <div className='flex flex-row-reverse justify-center items-center space-x-6 md:space-x-10 space-x-reverse mt-7' dir='rtl'>
                    <a href="#facebook" className="text-gray-800 hover:text-blue-500 text-2xl md:text-3xl">
                        <i className="fa-brands fa-facebook-f"></i>
                    </a>
                    <a href="#whatsapp" className="text-gray-800 hover:text-green-500 text-2xl md:text-3xl">
                        <i className="fa-brands fa-whatsapp"></i>
                    </a>
                    <a
                        className="cursor-pointer bg-orange-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl shadow-md hover:bg-orange-600 transition-all duration-300 text-sm md:text-base lg:ml-10"
                        onClick={(e) => {
                            e.preventDefault();
                            const element = document.getElementById("home2");
                            if (element) {
                                element.scrollIntoView({ behavior: "smooth" });
                            }
                        }}
                    >
                        سجل وابدأ
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Home1;