import Image from "next/image";

interface BaseProps {
  usage: "listing-fixed" | "listing-auction" | "buy-fixed" | "buy-auction";
  children: React.ReactNode;
}

interface ListingFixedProps extends BaseProps {
  image: string;
  usage: "listing-fixed";

  name: string;
  artist?: string | null;
}

interface ListingAuctionProps extends BaseProps {
  image: string;
  usage: "listing-auction";
  name: string;
  artist?: string | null;
}

interface BuyFixedProps extends BaseProps {
  image: string;
  usage: "buy-fixed";
  name: string;
  artist?: string | null;
}

interface BuyAuctionProps extends BaseProps {
  image: string;
  usage: "buy-auction";
  name: string;
  artist?: string | null;
}

type ItemSummaryProps =
  | ListingFixedProps
  | ListingAuctionProps
  | BuyFixedProps
  | BuyAuctionProps;

export const ItemSummary: React.FC<ItemSummaryProps> = (props) => {
  let header, subheader;

  switch (props.usage) {
    case "listing-fixed":
      header = "Item Summary";
      subheader = "Listing for a fixed price";
      break;

    case "listing-auction":
      header = "Item Summary";
      subheader = "Listing as an Auction";
      break;
    case "buy-fixed":
      header = "Buy NFT";
      subheader = `You are Buying ${props.name}`;
      break;
    case "buy-auction":
      header = "Item Summary";
      subheader = `You are Buying ${props.name}`;
      break;
  }
  return (
    <div className="flex flex-col w-full md:w-[580px] md:px-8 md:py-10 p-4 md:p-0 gap-6 bg-[#0B0A0A]">
      <div className="flex flex-col gap-[10px]">
        <span className="text-lg font-bold md:text-4xl">{header}</span>
        <span className="text-sm font-normal text-[#AFAFAF]">{subheader}</span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-sm font-normal text-[#AFAFAF]">Item</div>
        <div className="flex flex-row gap-4">
          <img src={props.image} width={103} height={80} alt="nft" />
          <div className="flex flex-col gap-3">
            <div className="font-semibold text-base">{props.name}</div>
            {props.artist !== null && (
              <div className="flex flex-row gap-1 text-sm">
                <div className="font-normal text-[#AFAFAF]">Artist:</div>
                <div className="font-semibold text-[#F88430]">
                  {props.artist}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full">{props.children}</div>
    </div>
  );
};
