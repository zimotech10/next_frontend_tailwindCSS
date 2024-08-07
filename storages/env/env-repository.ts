import { browser } from '$app/environment';
import {
  PUBLIC_ALLOW_USE_MOCK_DATA,
  PUBLIC_API_URL,
  PUBLIC_CHAINLINK_FEED,
  PUBLIC_CHAINLINK_PROGRAM_ID,
  PUBLIC_COIN_GECKO_API_KEY,
  PUBLIC_COIN_GECKO_BASE_URL,
  PUBLIC_COIN_GECKO_CACHE_INVALIDATE_SECONDS,
  PUBLIC_CONTRACT_ADDRESS,
  PUBLIC_SOLANA_NETWORK_ENDPOINT,
  PUBLIC_TOKEN_META_DATA_PROGRAM_ID,
  PUBLIC_WALLET_CLUSTER_API_URL,
  PUBLIC_METADATA_URI
} from '$env/static/public';

export const EnvironmentRepository = {
  isBrowser: () => {
    if (browser) {
      return true;
    }

    return false;
  },
  getApiUrl: () => {
    if (PUBLIC_API_URL) {
      return PUBLIC_API_URL;
    }

    throw new Error('you have to set "PUBLIC_API_URL" in .env before run');
  },
  getCoinGeckoAPIKey: () => {
    return PUBLIC_COIN_GECKO_API_KEY;
  },
  getCoinGeckoBaseURL: () => {
    return PUBLIC_COIN_GECKO_BASE_URL || 'https://pro-api.coingecko.com';
  },
  getCoinGeckoCacheTime: () => {
    if (PUBLIC_COIN_GECKO_CACHE_INVALIDATE_SECONDS) {
      return Number(PUBLIC_COIN_GECKO_CACHE_INVALIDATE_SECONDS);
    }

    return 30 * 60;
  },
  getAllowUseMockData: () => {
    if ([true, 'true'].includes(PUBLIC_ALLOW_USE_MOCK_DATA)) {
      return true;
    }

    return false;
  },
  getWalletClusterApiUrl: () => {
    return PUBLIC_WALLET_CLUSTER_API_URL || 'devnet';
  },

  getContractAddress: () => {
    if (PUBLIC_CONTRACT_ADDRESS) {
      return PUBLIC_CONTRACT_ADDRESS;
    }

    throw new Error('you have to set "PUBLIC_CONTRACT_ADDRESS" in .env before run');
  },
  getSolanaNetworkAddress: () => {
    if (PUBLIC_SOLANA_NETWORK_ENDPOINT) {
      return PUBLIC_SOLANA_NETWORK_ENDPOINT;
    }

    throw new Error('you have to set "PUBLIC_SOLANA_NETWORK_ENDPOINT" in .env before run');
  },
  getChainlinkFeed: () => {
    if (PUBLIC_CHAINLINK_FEED) {
      return PUBLIC_CHAINLINK_FEED;
    }

    throw new Error('you have to set "PUBLIC_CHAINLINK_FEED" in .env before run');
  },
  getChainlinkProgramID: () => {
    if (PUBLIC_CHAINLINK_PROGRAM_ID) {
      return PUBLIC_CHAINLINK_PROGRAM_ID;
    }

    throw new Error('you have to set "PUBLIC_CHAINLINK_PROGRAM_ID" in .env before run');
  },
  getTokenMetaDataProgramID: () => {
    if (PUBLIC_TOKEN_META_DATA_PROGRAM_ID) {
      return PUBLIC_TOKEN_META_DATA_PROGRAM_ID;
    }

    throw new Error('you have to set "PUBLIC_TOKEN_META_DATA_PROGRAM_ID" in .env before run');
  },
  getMetadataURI: () => {
    if (PUBLIC_METADATA_URI) {
      return PUBLIC_METADATA_URI;
    }

    throw new Error('you have to set "PUBLIC_METADATA_URI" in .env before run');
  },
  getImageUrl: () => {
    return 'http://94.131.110.178:5050';
  }
};
