import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import domainHero from "@/public/images/domains-hero.png";
import TabBar from "@/components/TabBar";

const Domains = () => {
  return (
    <div className="md:p-20">
      <Hero
        heading="Own a Unique Web3 Domain"
        desription="Solana Name Services (SNS) are domain names provided for users on the Solana blockchain; which can be bought and sold on a secondary market."
        buttonText="Get a .SOL domain"
        image={domainHero.src}
        imgHeight={1100}
        imgWidth={1100}
      />
      <TabBar pathname="domains" />
      <SearchBar placeholder="Search Domain by Title" />
    </div>
  );
};

export default Domains;
