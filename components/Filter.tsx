import { IBM_Plex_Sans } from "next/font/google";

const Filter = () => {
  const ipmSans = IBM_Plex_Sans({
    weight: ["500", "600", "700"],
    subsets: ["latin"],
  });
  return (
    <div
      className="flex flex-col bg-black"
      style={{ width: "250px", padding: "14px", gap: "26px" }}
    >
      <div>Filter/Type</div>
    </div>
  );
};

export default Filter;
