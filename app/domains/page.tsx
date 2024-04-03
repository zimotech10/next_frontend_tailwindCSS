import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import domainHero from "@/public/images/domains-hero.png";
import TabBar from "@/components/TabBar";
import DomainCard from "@/components/DomainCard";
import { domains } from "@/stores/mockData";

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
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {domains.map((domain) => (
          <DomainCard
            key={domain.id}
            name={domain.name}
            isAvailable={domain.available}
          />
        ))}
      </div>
    </div>
  );
};

export default Domains;
