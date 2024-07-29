import Image from "next/image";
import logo from "../../../../public/assets/footerLogo.svg";

const Footer = () => {
  return (
    <footer className="bg-[#141925]   flex flex-col justify-center items-center">
      <div className="bg-footer-image w-full px-4 md:px-8 py-16  flex flex-col justify-center items-center gap-4">
        <div className="max-w-[863px] flex flex-col items-center">
          <Image src={logo} alt="burner banner" className="mx-auto mb-3" />
          <h2 className="text-center text-[#FF6734] text-[48px] leading-[58px] mb-4">
            Become a part of the Community
          </h2>
          <p className="text-[#BC988C] text-center text-2xl leading-[30px] mb-8">
            Join our community to learn and build together! And please raise an
            issue on our Github if there's a new feature you'll like to see
          </p>
          <a href="https://t.me/+sH0ug1mZ_WtjNmM0">
            <button className="bg-[#FAFAFA] w-fit text-[#141925] py-3 px-12 transition-all duration-400 rounded-[12px] hover:rounded-[20px] ">
              Learn more
            </button>
          </a>
        </div>
      </div>
      <div className="p-6 bg-[#141925]">
        <p className="text-center text-[#BC988C]">Built with ❤️ by Argent</p>
      </div>
    </footer>
  );
};

export default Footer;
