const Point = ({
  desc,
  title,
  img,
}: {
  desc: string;
  title: string;
  img: string;
}) => {
  return (
    <div className="grid grid-cols-12 items-center gap-4 p-4 lg:p-8 rounded-[20px] bg-varying">
      <div className="rounded-full col-span-2 bg-[#FFEBDA] flex justify-center items-center  p-2 h-12 w-12">
        <img src={img} alt="" aria-hidden className="w-full h-full" />
      </div>
      <div className="col-span-10">
        <h3>{title}</h3>
        <p className="text-[#BC988C] text-[.875em]">{desc}</p>
      </div>
    </div>
  );
};

const WhyUs = () => {
  return (
    <section className="container mx-auto p-4 md:py-16  md:px-20 ">
      <h2 className="text-center">Why Starknet- Scaffold</h2>
      <div className="flex flex-col items-center gap-8 mt-8 lg:flex-row">
        <figure className="basis-full flex flex-col gap-4   rounded-[24px] p-8 bg-varying">
          <div className="h-[300px] glass-img">
            <img src="/glass.svg" alt="" />
          </div>
          <div className="bg-[#FFEBDA] h-12 w-12 flex items-center justify-center p-2 rounded-full">
            <img src="./prototyping.svg" alt="" aria-hidden />
          </div>
          <h3>From prototyping to production..</h3>
          <p className="text-[#BC988C] text-[.875em]">
            Starknet Scaffold is designed to simplify the process for developers
            to create, declare, and deploy smart contracts alongside build
            interactive user interfaces.
          </p>
          <a
            href="https://docs.starknetscaffold.xyz"
            className="border-solid border-[#B4B4B4] flex items-center justify-center border-[2px] min-w-[6rem] Try Online px-2 py-1 rounded-[8px] w-fit hover:rounded-[20px] transition-all duration-400"
          >
            <span>Docs</span>
          </a>
        </figure>
        <div className="w-full flex flex-col gap-4">
          <Point
            img="./out-of-box.svg"
            title="Out-of-the-box UI components"
            desc="Starknet Scaffold provides you with multiple out-of-the-box UI components you can customize to suit your needs"
          />
          <Point
            img="./script.svg"
            title="Scripts to make your life easier"
            desc="We've added NPM scripts to help simplify your contract development with Starknet-Foundry"
          />
          <Point
            img="./burner.svg"
            title="Burner Wallets and debugging tools"
            desc="Starknet Scaffold gives you the ability to deploy burner wallets, interact with other contracts using them and deploy/declare contracts for easy debugging"
          />
          <Point
            img="./wikipedia-icon.svg"
            title="Starknet Wikipedia"
            desc="First time developing on Starknet? no worries! we've compiled the best learning tools and resources for you"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
