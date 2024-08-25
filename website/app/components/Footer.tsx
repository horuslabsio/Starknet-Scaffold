const Footer = () => {
  return (
    <footer className="bg-[#141925]   flex flex-col justify-center items-center">
      <div className="bg-footer-image bg-no-repeat bg-cover bg-center w-full px-4 md:px-8 py-16  flex flex-col justify-center items-center gap-4">
        <div>
          <img src="/image 7.svg" alt="" />
        </div>
        <h2 className="text-center text-[#FF6734]">
          Become a part of the Community
        </h2>
        <p className="text-[#BC988C] text-center">
          Join our community to learn and build together! And please raise an
          issue on our Github if there's a new feature you'll like to see
        </p>
        <a href="https://t.me/+sH0ug1mZ_WtjNmM0">
          <button className="bg-white w-fit text-dark-font-color py-2 px-8 transition-all duration-400 rounded-[12px] hover:rounded-[20px] ">
            Chat
          </button>
        </a>
      </div>
      <div className="p-6">
        <p className="text-center text-[#BC988C]">
          Built with ❤️ by Horus labs
        </p>
      </div>
    </footer>
  );
};

export default Footer;
