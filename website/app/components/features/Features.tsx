import Deployer from "./Deployer";
import Connect from "./Connect";
import Faucet from "./Faucet";
import Wikipedia from "./Wikipedia";

const Features = () => {
  return (
    <section className="container mx-auto px-4 py-16 md:py-16  md:px-20  flex flex-col gap-16 overflow-hidden">
      <Deployer />
      <Faucet />
      <Wikipedia />
      <Connect />
    </section>
  );
};

export default Features;
