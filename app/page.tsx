import HomeHero from '@/components/home/HomeHero';
import UpComing from '@/components/home/UpComing';
import Featured from '@/components/home/Featured';
import TopCollection from '@/components/home/TopCollection';
import Lampapuy from '@/components/home/Lampapuy';
import DiscoverLatest from '@/components/home/DiscoverLatest';
import GetStarted from '@/components/home/GetStarted';
import Creators from '@/components/home/Creators';

const Home = () => {
  return (
    <div>
      <HomeHero />
      <UpComing />
      <Featured />
      <TopCollection />
      <Lampapuy />
      <DiscoverLatest />
      <GetStarted />
      <Creators />
    </div>
  );
};

export default Home;
