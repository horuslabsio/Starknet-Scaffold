const Footer = () => {
  return (
    <footer className="bg-[#141925]   flex flex-col justify-center items-center">
      <div className="bg-footer-image w-full px-4 md:px-8 py-16  flex flex-col justify-center items-center gap-4">
        <div>
          <img src="/image 7.svg" alt="" />
        </div>
        <h2 className="text-center text-[#FF6734]">
          Become a part of the Community
        </h2>
        <p className="text-[#BC988C] text-center">
          Join our community to learn and build together with the ERC-6551
          technology. We are over 200+ actively creating products and utility to
          foster the blockchain space.
        </p>
        <button className="bg-white w-fit text-dark-font-color py-2 px-8 rounded-[12px]">
          Learn more
        </button>
      </div>
      <div className="p-6">
        <p className="text-center text-[#BC988C]">Built with ❤️ by Argent</p>
      </div>
    </footer>
  );
};

export default Footer;
