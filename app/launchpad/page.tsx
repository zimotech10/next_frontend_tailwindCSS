import Hero from "@/components/Hero";
import launchpadHero from "@/public/images/launchpad-hero.png";
import { LiveMint } from "./_components/LiveMint";

const page = () => {
  return (
    <div className="md:p-20">
      <Hero
        heading="Launchpad"
        desription="Lampapuynft provides marketing and smart contract services to Elevate your brand by connecting it with more buyers."
        buttonText="Discover How"
        image={launchpadHero.src}
        imgHeight={600}
        imgWidth={600}
      />
      <LiveMint />
    </div>
  );
};

export default page;
