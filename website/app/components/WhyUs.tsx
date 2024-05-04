const Point = ({ desc, title }: { desc: string; title: string }) => {
  return (
    <div className="flex items-center gap-4  w-full p-4 lg:p-8 rounded-[20px] bg-varying">
      <div className="text-[#FF6734] w-[2.5em] h-[2.5em] bg-[#FFEBDA]  rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2.5em"
          height="2.5em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M14 2a1 1 0 0 0-1.864-.504l-7 12A1 1 0 0 0 6 15h4v7a1 1 0 0 0 1.864.504l7-12A1 1 0 0 0 18 9h-4z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div>
        <h3>{title}</h3>
        <p className="text-[#BC988C] text-[.875em]">{desc}</p>
      </div>
    </div>
  );
};

const WhyUs = () => {
  return (
    <section className=" p-4 md:py-16  md:px-20 ">
      <h2 className="text-center">Why Starknet- Scaffold</h2>
      <div className="flex flex-col items-center gap-8 mt-8 lg:flex-row">
        <figure className="basis-full flex flex-col gap-4   rounded-[24px] p-8 bg-varying">
          <div className="h-[300px] glass-img">
            <img src="/glass.svg" alt="" />
          </div>
          <div className="text-[#FF6734] w-[2.5em] h-[2.5em] bg-[#FFEBDA]  rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2.5em"
              height="2.5em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M14 2a1 1 0 0 0-1.864-.504l-7 12A1 1 0 0 0 6 15h4v7a1 1 0 0 0 1.864.504l7-12A1 1 0 0 0 18 9h-4z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <h3>Scaffold Burner Wallet</h3>
          <p className="text-[#BC988C] text-[.875em]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
            similique obcaecati accusamus aut debitis, esse numquam excepturi
            expedita rerum aliquam, asperiores minus repudiandae unde at saepe
            vitae dicta illo officia!
          </p>
          <button className="border-solid border-[#B4B4B4] border-[2px] min-w-[6rem] px-2 py-1 rounded-[8px] w-fit">
            Docs
          </button>
        </figure>
        <div className="w-full flex flex-col gap-4">
          <Point
            title="Scaffold Burner Wallet"
            desc="Generate temporary wallets which can be used during the course of development"
          />
          <Point
            title="Scaffold Burner Wallet"
            desc="Generate temporary wallets which can be used during the course of development"
          />
          <Point
            title="Scaffold Burner Wallet"
            desc="Generate temporary wallets which can be used during the course of development"
          />
          <Point
            title="Scaffold Burner Wallet"
            desc="Generate temporary wallets which can be used during the course of development"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
