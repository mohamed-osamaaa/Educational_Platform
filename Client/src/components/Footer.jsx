import {
    FaFacebook,
    FaGithub,
    FaLinkedin,
    FaWhatsapp,
} from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="py-6 mt-10">
            <div className="container mx-auto flex flex-col items-center space-y-4 px-4 sm:px-6 md:px-8">
                <div className="flex space-x-6 flex-wrap justify-center">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 text-2xl">
                        <FaFacebook />
                    </a>
                    <a href="https://www.linkedin.com/in/mohamed-osama-864025289/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 text-2xl">
                        <FaLinkedin />
                    </a>
                    <a href="https://wa.me/01068756409" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 text-2xl">
                        <FaWhatsapp />
                    </a>
                    <a href="https://github.com/mohamed-osamaaa" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black text-2xl">
                        <FaGithub />
                    </a>
                </div>
                <p className="text-black text-center">Developed by Mohamed Osama &copy; 2025</p>
            </div>
        </footer>
    );
};

export default Footer;