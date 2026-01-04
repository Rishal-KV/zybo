import Image from "next/image";

const Footer = () => {
    return (
        <div className="bg-[#1B1B1B] w-full">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center w-full">
                    <div className="flex  sm:flex-row justify-between items-center w-full h-auto sm:h-44 py-8 sm:py-0 gap-6 sm:gap-4">
                        {/* Logo */}
                        <Image
                            className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                            src="/logo.png"
                            alt="Logo"
                            width={100}
                            height={100}
                        />

                        {/* Social Icons */}
                        <div className="flex gap-4 sm:gap-6">
                            <Image
                                className="w-5 h-5 sm:w-4 sm:h-4 cursor-pointer object-contain hover:opacity-80 transition-opacity"
                                src="/socials/Vector.png"
                                alt="Facebook"
                                width={100}
                                height={100}
                            />
                            <Image
                                className="w-5 h-5 sm:w-4 sm:h-4 cursor-pointer object-contain hover:opacity-80 transition-opacity"
                                src="/socials/insta.png"
                                alt="Instagram"
                                width={100}
                                height={100}
                            />
                            <Image
                                className="w-5 h-5 sm:w-4 sm:h-4 cursor-pointer object-contain hover:opacity-80 transition-opacity"
                                src="/socials/twitter.png"
                                alt="Twitter"
                                width={100}
                                height={100}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;