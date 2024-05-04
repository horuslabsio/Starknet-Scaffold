import BurnerWallet from "./BurnerWallet";
import Connect from "./Connect";
import Faucet from "./Faucet";
import Wikipedia from "./Wikipedia";

const Features = () => {
  return (
    <section className="px-4 py-16 md:py-16  md:px-20  flex flex-col gap-16">
      <BurnerWallet />
      <Faucet />
      <Wikipedia />
      <Connect />
    </section>
  );
};

export default Features;
