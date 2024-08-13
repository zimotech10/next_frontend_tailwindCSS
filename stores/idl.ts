/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/bictory_marketplace.json`.
 */
export type BictoryMarketplace = {
  address: '4dt2Mo9ou9St8WrzPEtqzz9vmXHdyUf8NrLLT4KWcEkF';
  metadata: {
    name: 'bictoryMarketplace';
    version: '0.1.0';
    spec: '0.1.0';
    description: 'Created with Anchor';
  };
  instructions: [
    {
      name: 'acceptBuy';
      discriminator: [60, 72, 6, 237, 195, 26, 145, 105];
      accounts: [
        {
          name: 'seller';
          docs: ['seller user wallet account.'];
          writable: true;
          signer: true;
        },
        {
          name: 'buyer';
          docs: ['Buyer user wallet account.'];
          writable: true;
        },
        {
          name: 'treasuryMint';
          docs: ['Auction House treasury mint account.'];
          relations: ['auctionHouse'];
        },
        {
          name: 'escrowPaymentAccount';
          docs: ['Buyer escrow payment account PDA.'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'auctionHouse';
              },
              {
                kind: 'account';
                path: 'buyer';
              }
            ];
          };
        },
        {
          name: 'sellerPaymentReceiptAccount';
          docs: ['Seller SOL or SPL account to receive payment at.'];
          writable: true;
        },
        {
          name: 'buyerReceiptTokenAccount';
          docs: ['Buyer SPL token account to receive purchased item at.'];
          writable: true;
        },
        {
          name: 'authority';
          docs: ['Auction House instance authority account.'];
          relations: ['auctionHouse'];
        },
        {
          name: 'auctionHouseTreasury';
          docs: ['Auction House treasury PDA account.'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'auctionHouse';
              },
              {
                kind: 'const';
                value: [116, 114, 101, 97, 115, 117, 114, 121];
              }
            ];
          };
          relations: ['auctionHouse'];
        },
        {
          name: 'auctionHouse';
          docs: ['Auction House instance PDA account.'];
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'auction_house.creator';
                account: 'auctionHouse';
              },
              {
                kind: 'account';
                path: 'auction_house.treasury_mint';
                account: 'auctionHouse';
              }
            ];
          };
        },
        {
          name: 'nftMint';
          docs: ['NFT mint account'];
        },
        {
          name: 'nftAccount';
          docs: ['NFT token account'];
          writable: true;
        },
        {
          name: 'metadata';
          docs: ['Metaplex metadata account decorating SPL mint account.'];
        },
        {
          name: 'listingAccount';
          docs: ['Listing PDA account'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'nftMint';
              },
              {
                kind: 'const';
                value: [108, 105, 115, 116, 105, 110, 103];
              }
            ];
          };
        },
        {
          name: 'offerAccount';
          docs: ['Offer PDA account'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'nftMint';
              },
              {
                kind: 'account';
                path: 'buyer';
              },
              {
                kind: 'const';
                value: [111, 102, 102, 101, 114];
              }
            ];
          };
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
        {
          name: 'ataProgram';
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
        },
        {
          name: 'rent';
          address: 'SysvarRent111111111111111111111111111111111';
        }
      ];
      args: [];
    },
    {
      name: 'buy';
      discriminator: [102, 6, 61, 18, 1, 218, 235, 234];
      accounts: [
        {
          name: 'buyer';
          docs: ['Buyer account.'];
          writable: true;
          signer: true;
        },
        {
          name: 'treasuryMint';
          docs: [
            'Treasury mint account, either native SOL mint or a SPL token mint.'
          ];
          relations: ['auctionHouse'];
        },
        {
          name: 'authority';
          docs: ['Authority key for the Auction House.'];
          relations: ['auctionHouse'];
        },
        {
          name: 'auctionHouse';
          docs: ['Auction House instance PDA account.'];
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'auction_house.creator';
                account: 'auctionHouse';
              },
              {
                kind: 'account';
                path: 'treasuryMint';
              }
            ];
          };
        },
        {
          name: 'nftMint';
          docs: ['NFT mint account'];
        },
        {
          name: 'offerAccount';
          docs: ['Offer PDA account'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'nftMint';
              },
              {
                kind: 'account';
                path: 'buyer';
              },
              {
                kind: 'const';
                value: [111, 102, 102, 101, 114];
              }
            ];
          };
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
        {
          name: 'rent';
          address: 'SysvarRent111111111111111111111111111111111';
        }
      ];
      args: [
        {
          name: 'price';
          type: 'u64';
        },
        {
          name: 'buyerExpiry';
          type: {
            option: 'u64';
          };
        }
      ];
    },
    {
      name: 'cancelAuction';
      discriminator: [156, 43, 197, 110, 218, 105, 143, 182];
      accounts: [
        {
          name: 'seller';
          docs: ['Seller account.'];
          writable: true;
          signer: true;
        },
        {
          name: 'treasuryMint';
          docs: [
            'Treasury mint account, either native SOL mint or a SPL token mint.'
          ];
          relations: ['auctionHouse'];
        },
        {
          name: 'authority';
          docs: ['Authority key for the Auction House.'];
          relations: ['auctionHouse'];
        },
        {
          name: 'auctionHouseTreasury';
          docs: ['Auction House treasury PDA account.'];
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'auctionHouse';
              },
              {
                kind: 'const';
                value: [116, 114, 101, 97, 115, 117, 114, 121];
              }
            ];
          };
          relations: ['auctionHouse'];
        },
        {
          name: 'auctionHouse';
          docs: ['Auction House instance PDA account.'];
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'auction_house.creator';
                account: 'auctionHouse';
              },
              {
                kind: 'account';
                path: 'treasuryMint';
              }
            ];
          };
        },
        {
          name: 'nftMint';
          docs: ['NFT mint account'];
        },
        {
          name: 'nftAccount';
          docs: ['NFT token account'];
          writable: true;
        },
        {
          name: 'auctionAccount';
          docs: ['auction PDA account'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'nftMint';
              },
              {
                kind: 'const';
                value: [97, 117, 99, 116, 105, 111, 110];
              }
            ];
          };
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        }
      ];
      args: [];
    },
    {
      name: 'cancelBuy';
      discriminator: [238, 76, 36, 218, 132, 177, 224, 233];
      accounts: [
        {
          name: 'buyer';
          docs: ['Buyer account.'];
          writable: true;
          signer: true;
        },
        {
          name: 'treasuryMint';
          docs: [
            'Treasury mint account, either native SOL mint or a SPL token mint.'
          ];
          relations: ['auctionHouse'];
        },
        {
          name: 'authority';
          docs: ['Authority key for the Auction House.'];
          relations: ['auctionHouse'];
        },
        {
          name: 'auctionHouse';
          docs: ['Auction House instance PDA account.'];
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'auction_house.creator';
                account: 'auctionHouse';
              },
              {
                kind: 'account';
                path: 'treasuryMint';
              }
            ];
          };
        },
        {
          name: 'nftMint';
          docs: ['NFT mint account'];
        },
        {
          name: 'offerAccount';
          docs: ['Offer PDA account'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'nftMint';
              },
              {
                kind: 'account';
                path: 'buyer';
              },
              {
                kind: 'const';
                value: [111, 102, 102, 101, 114];
              }
            ];
          };
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
        {
          name: 'rent';
          address: 'SysvarRent111111111111111111111111111111111';
        }
      ];
      args: [];
    },
    {
      name: 'cancelOfferFromAuction';
      discriminator: [161, 194, 163, 184, 164, 130, 93, 45];
      accounts: [
        {
          name: 'buyer';
          docs: ['Buyer account.'];
          writable: true;
          signer: true;
        },
        {
          name: 'treasuryMint';
          docs: [
            'Treasury mint account, either native SOL mint or a SPL token mint.'
          ];
          relations: ['auctionHouse'];
        },
        {
          name: 'authority';
          docs: ['Authority key for the Auction House.'];
          relations: ['auctionHouse'];
        },
        {
          name: 'auctionHouse';
          docs: ['Auction House instance PDA account.'];
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'auction_house.creator';
                account: 'auctionHouse';
              },
              {
                kind: 'account';
                path: 'treasuryMint';
              }
            ];
          };
        },
        {
          name: 'nftMint';
          docs: ['NFT mint account'];
        },
        {
          name: 'auctionAccount';
          docs: ['auction PDA account'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'nftMint';
              },
              {
                kind: 'const';
                value: [97, 117, 99, 116, 105, 111, 110];
              }
            ];
          };
        },
        {
          name: 'offerAccount';
          docs: ['Offer PDA account'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'nftMint';
              },
              {
                kind: 'account';
                path: 'buyer';
              },
              {
                kind: 'const';
                value: [
                  97,
                  117,
                  99,
                  116,
                  105,
                  111,
                  110,
                  95,
                  111,
                  102,
                  102,
                  101,
                  114
                ];
              }
            ];
          };
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
        {
          name: 'rent';
          address: 'SysvarRent111111111111111111111111111111111';
        }
      ];
      args: [];
    },
    {
      name: 'createAuction';
      discriminator: [234, 6, 201, 246, 47, 219, 176, 107];
      accounts: [
        {
          name: 'seller';
          docs: ['Seller account.'];
          writable: true;
          signer: true;
        },
        {
          name: 'treasuryMint';
          docs: [
            'Treasury mint account, either native SOL mint or a SPL token mint.'
          ];
          relations: ['auctionHouse'];
        },
        {
          name: 'authority';
          docs: ['Authority key for the Auction House.'];
          relations: ['auctionHouse'];
        },
        {
          name: 'auctionHouseTreasury';
          docs: ['Auction House treasury PDA account.'];
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'auctionHouse';
              },
              {
                kind: 'const';
                value: [116, 114, 101, 97, 115, 117, 114, 121];
              }
            ];
          };
          relations: ['auctionHouse'];
        },
        {
          name: 'auctionHouse';
          docs: ['Auction House instance PDA account.'];
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'auction_house.creator';
                account: 'auctionHouse';
              },
              {
                kind: 'account';
                path: 'treasuryMint';
              }
            ];
          };
        },
        {
          name: 'nftMint';
          docs: ['NFT mint account'];
        },
        {
          name: 'nftAccount';
          docs: ['NFT token account'];
          writable: true;
        },
        {
          name: 'auctionAccount';
          docs: ['Listing PDA account'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'nftMint';
              },
              {
                kind: 'const';
                value: [97, 117, 99, 116, 105, 111, 110];
              }
            ];
          };
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
        {
          name: 'rent';
          address: 'SysvarRent111111111111111111111111111111111';
        }
      ];
      args: [
        {
          name: 'price';
          type: 'u64';
        },
        {
          name: 'startTime';
          type: {
            option: 'u64';
          };
        },
        {
          name: 'endTime';
          type: {
            option: 'u64';
          };
        }
      ];
    },
    {
      name: 'createAuctionHouse';
      discriminator: [221, 66, 242, 159, 249, 206, 134, 241];
      accounts: [
        {
          name: 'treasuryMint';
          docs: [
            'Treasury mint account, either native SOL mint or a SPL token mint.'
          ];
        },
        {
          name: 'payer';
          docs: ['Key paying SOL fees for setting up the Auction House.'];
          writable: true;
          signer: true;
        },
        {
          name: 'authority';
        },
        {
          name: 'treasuryWithdrawalDestination';
          docs: [
            'SOL or SPL token account to receive Auction House fees. If treasury mint is native this will be the same as the `treasury_withdrawal_destination_owner`.'
          ];
          writable: true;
        },
        {
          name: 'treasuryWithdrawalDestinationOwner';
          docs: [
            'Owner of the `treasury_withdrawal_destination` account or the same address if the `treasury_mint` is native.'
          ];
        },
        {
          name: 'auctionHouse';
          docs: ['Auction House instance PDA account.'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'authority';
              },
              {
                kind: 'account';
                path: 'treasuryMint';
              }
            ];
          };
        },
        {
          name: 'auctionHouseTreasury';
          docs: ['Auction House instance treasury PDA account.'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'auctionHouse';
              },
              {
                kind: 'const';
                value: [116, 114, 101, 97, 115, 117, 114, 121];
              }
            ];
          };
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
        {
          name: 'ataProgram';
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
        },
        {
          name: 'rent';
          address: 'SysvarRent111111111111111111111111111111111';
        }
      ];
      args: [
        {
          name: 'sellerFeeBasisPoints';
          type: 'u16';
        },
        {
          name: 'discountCollection';
          type: 'pubkey';
        },
        {
          name: 'discountBasisPoints';
          type: 'u16';
        }
      ];
    },
    {
      name: 'deposit';
      discriminator: [242, 35, 198, 137, 82, 225, 242, 182];
      accounts: [
        {
          name: 'wallet';
          docs: ['User wallet account.'];
          writable: true;
          signer: true;
        },
        {
          name: 'treasuryMint';
          docs: ['Auction House instance treasury mint account.'];
          relations: ['auctionHouse'];
        },
        {
          name: 'paymentAccount';
          docs: ['User SOL or SPL account to transfer funds from.'];
          writable: true;
        },
        {
          name: 'escrowPaymentAccount';
          docs: ['Buyer escrow payment account PDA.'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'auctionHouse';
              },
              {
                kind: 'account';
                path: 'wallet';
              }
            ];
          };
        },
        {
          name: 'authority';
          docs: ['Auction House instance authority account.'];
          relations: ['auctionHouse'];
        },
        {
          name: 'auctionHouse';
          docs: ['Auction House instance PDA account.'];
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'auction_house.creator';
                account: 'auctionHouse';
              },
              {
                kind: 'account';
                path: 'auction_house.treasury_mint';
                account: 'auctionHouse';
              }
            ];
          };
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
        {
          name: 'rent';
          address: 'SysvarRent111111111111111111111111111111111';
        }
      ];
      args: [
        {
          name: 'amount';
          type: 'u64';
        }
      ];
    },
    {
      name: 'executeSale';
      discriminator: [37, 74, 217, 157, 79, 49, 35, 6];
      accounts: [
        {
          name: 'buyer';
          docs: ['Buyer user wallet account.'];
          writable: true;
          signer: true;
        },
        {
          name: 'seller';
          docs: ['Seller user wallet account.'];
          writable: true;
        },
        {
          name: 'treasuryMint';
          docs: ['Auction House treasury mint account.'];
          relations: ['auctionHouse'];
        },
        {
          name: 'escrowPaymentAccount';
          docs: ['Buyer escrow payment account PDA.'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'auctionHouse';
              },
              {
                kind: 'account';
                path: 'buyer';
              }
            ];
          };
        },
        {
          name: 'sellerPaymentReceiptAccount';
          docs: ['Seller SOL or SPL account to receive payment at.'];
          writable: true;
        },
        {
          name: 'buyerReceiptTokenAccount';
          docs: ['Buyer SPL token account to receive purchased item at.'];
          writable: true;
        },
        {
          name: 'authority';
          docs: ['Auction House instance authority account.'];
          relations: ['auctionHouse'];
        },
        {
          name: 'auctionHouseTreasury';
          docs: ['Auction House treasury PDA account.'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'auctionHouse';
              },
              {
                kind: 'const';
                value: [116, 114, 101, 97, 115, 117, 114, 121];
              }
            ];
          };
          relations: ['auctionHouse'];
        },
        {
          name: 'auctionHouse';
          docs: ['Auction House instance PDA account.'];
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'auction_house.creator';
                account: 'auctionHouse';
              },
              {
                kind: 'account';
                path: 'auction_house.treasury_mint';
                account: 'auctionHouse';
              }
            ];
          };
        },
        {
          name: 'nftMint';
          docs: ['NFT mint account'];
        },
        {
          name: 'nftAccount';
          docs: ['NFT token account'];
          writable: true;
        },
        {
          name: 'metadata';
          docs: ['Metaplex metadata account decorating SPL mint account.'];
        },
        {
          name: 'listingAccount';
          docs: ['Listing PDA account'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'nftMint';
              },
              {
                kind: 'const';
                value: [108, 105, 115, 116, 105, 110, 103];
              }
            ];
          };
        },
        {
          name: 'offerAccount';
          docs: ['Offer PDA account'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'nftMint';
              },
              {
                kind: 'account';
                path: 'buyer';
              },
              {
                kind: 'const';
                value: [111, 102, 102, 101, 114];
              }
            ];
          };
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
        {
          name: 'ataProgram';
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
        },
        {
          name: 'rent';
          address: 'SysvarRent111111111111111111111111111111111';
        }
      ];
      args: [];
    },
    {
      name: 'instantBuy';
      discriminator: [203, 248, 198, 232, 208, 102, 57, 149];
      accounts: [
        {
          name: 'buyer';
          docs: ['Buyer account.'];
          writable: true;
          signer: true;
        },
        {
          name: 'seller';
          docs: ['Seller user wallet account.'];
          writable: true;
        },
        {
          name: 'treasuryMint';
          docs: ['Auction House treasury mint account.'];
          relations: ['auctionHouse'];
        },
        {
          name: 'escrowPaymentAccount';
          docs: ['Buyer escrow payment account PDA.'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'auctionHouse';
              },
              {
                kind: 'account';
                path: 'buyer';
              }
            ];
          };
        },
        {
          name: 'sellerPaymentReceiptAccount';
          docs: ['Seller SOL or SPL account to receive payment at.'];
          writable: true;
        },
        {
          name: 'buyerReceiptTokenAccount';
          docs: ['Buyer SPL token account to receive purchased item at.'];
          writable: true;
        },
        {
          name: 'authority';
          docs: ['Authority key for the Auction House.'];
          relations: ['auctionHouse'];
        },
        {
          name: 'auctionHouseTreasury';
          docs: ['Auction House treasury PDA account.'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'auctionHouse';
              },
              {
                kind: 'const';
                value: [116, 114, 101, 97, 115, 117, 114, 121];
              }
            ];
          };
          relations: ['auctionHouse'];
        },
        {
          name: 'auctionHouse';
          docs: ['Auction House instance PDA account.'];
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'auction_house.creator';
                account: 'auctionHouse';
              },
              {
                kind: 'account';
                path: 'auction_house.treasury_mint';
                account: 'auctionHouse';
              }
            ];
          };
        },
        {
          name: 'nftMint';
          docs: ['NFT mint account'];
        },
        {
          name: 'nftAccount';
          docs: ['NFT token account'];
          writable: true;
        },
        {
          name: 'metadata';
          docs: ['Metaplex metadata account decorating SPL mint account.'];
        },
        {
          name: 'listingAccount';
          docs: ['Listing PDA account'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'nftMint';
              },
              {
                kind: 'const';
                value: [108, 105, 115, 116, 105, 110, 103];
              }
            ];
          };
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
        {
          name: 'ataProgram';
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
        },
        {
          name: 'rent';
          address: 'SysvarRent111111111111111111111111111111111';
        }
      ];
      args: [];
    },
    {
      name: 'list';
      discriminator: [54, 174, 193, 67, 17, 41, 132, 38];
      accounts: [
        {
          name: 'seller';
          docs: ['Seller account.'];
          writable: true;
          signer: true;
        },
        {
          name: 'treasuryMint';
          docs: [
            'Treasury mint account, either native SOL mint or a SPL token mint.'
          ];
          relations: ['auctionHouse'];
        },
        {
          name: 'authority';
          docs: ['Authority key for the Auction House.'];
          relations: ['auctionHouse'];
        },
        {
          name: 'auctionHouseTreasury';
          docs: ['Auction House treasury PDA account.'];
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'auctionHouse';
              },
              {
                kind: 'const';
                value: [116, 114, 101, 97, 115, 117, 114, 121];
              }
            ];
          };
          relations: ['auctionHouse'];
        },
        {
          name: 'auctionHouse';
          docs: ['Auction House instance PDA account.'];
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'auction_house.creator';
                account: 'auctionHouse';
              },
              {
                kind: 'account';
                path: 'treasuryMint';
              }
            ];
          };
        },
        {
          name: 'nftMint';
          docs: ['NFT mint account'];
        },
        {
          name: 'nftAccount';
          docs: ['NFT token account'];
          writable: true;
        },
        {
          name: 'listingAccount';
          docs: ['Listing PDA account'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'nftMint';
              },
              {
                kind: 'const';
                value: [108, 105, 115, 116, 105, 110, 103];
              }
            ];
          };
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
        {
          name: 'rent';
          address: 'SysvarRent111111111111111111111111111111111';
        }
      ];
      args: [
        {
          name: 'price';
          type: 'u64';
        },
        {
          name: 'sellerExpiry';
          type: {
            option: 'u64';
          };
        }
      ];
    },
    {
      name: 'offerToAuction';
      discriminator: [156, 165, 156, 0, 140, 62, 235, 78];
      accounts: [
        {
          name: 'buyer';
          docs: ['Buyer account.'];
          writable: true;
          signer: true;
        },
        {
          name: 'treasuryMint';
          docs: [
            'Treasury mint account, either native SOL mint or a SPL token mint.'
          ];
          relations: ['auctionHouse'];
        },
        {
          name: 'authority';
          docs: ['Authority key for the Auction House.'];
          relations: ['auctionHouse'];
        },
        {
          name: 'auctionHouse';
          docs: ['Auction House instance PDA account.'];
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'auction_house.creator';
                account: 'auctionHouse';
              },
              {
                kind: 'account';
                path: 'treasuryMint';
              }
            ];
          };
        },
        {
          name: 'nftMint';
          docs: ['NFT mint account'];
        },
        {
          name: 'auctionAccount';
          docs: ['auction PDA account'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'nftMint';
              },
              {
                kind: 'const';
                value: [97, 117, 99, 116, 105, 111, 110];
              }
            ];
          };
        },
        {
          name: 'offerAccount';
          docs: ['Offer PDA account'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'nftMint';
              },
              {
                kind: 'account';
                path: 'buyer';
              },
              {
                kind: 'const';
                value: [
                  97,
                  117,
                  99,
                  116,
                  105,
                  111,
                  110,
                  95,
                  111,
                  102,
                  102,
                  101,
                  114
                ];
              }
            ];
          };
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
        {
          name: 'rent';
          address: 'SysvarRent111111111111111111111111111111111';
        }
      ];
      args: [
        {
          name: 'price';
          type: 'u64';
        }
      ];
    },
    {
      name: 'unlisting';
      discriminator: [26, 105, 119, 9, 197, 255, 191, 249];
      accounts: [
        {
          name: 'seller';
          docs: ['Seller account.'];
          writable: true;
          signer: true;
        },
        {
          name: 'treasuryMint';
          docs: [
            'Treasury mint account, either native SOL mint or a SPL token mint.'
          ];
          relations: ['auctionHouse'];
        },
        {
          name: 'authority';
          docs: ['Authority key for the Auction House.'];
          relations: ['auctionHouse'];
        },
        {
          name: 'auctionHouseTreasury';
          docs: ['Auction House treasury PDA account.'];
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'auctionHouse';
              },
              {
                kind: 'const';
                value: [116, 114, 101, 97, 115, 117, 114, 121];
              }
            ];
          };
          relations: ['auctionHouse'];
        },
        {
          name: 'auctionHouse';
          docs: ['Auction House instance PDA account.'];
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'auction_house.creator';
                account: 'auctionHouse';
              },
              {
                kind: 'account';
                path: 'treasuryMint';
              }
            ];
          };
        },
        {
          name: 'nftMint';
          docs: ['NFT mint account'];
        },
        {
          name: 'nftAccount';
          docs: ['NFT token account'];
          writable: true;
        },
        {
          name: 'listingAccount';
          docs: ['Listing PDA account'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'nftMint';
              },
              {
                kind: 'const';
                value: [108, 105, 115, 116, 105, 110, 103];
              }
            ];
          };
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        }
      ];
      args: [];
    },
    {
      name: 'updateAuctionHouse';
      discriminator: [84, 215, 2, 172, 241, 0, 245, 219];
      accounts: [
        {
          name: 'treasuryMint';
          docs: [
            'Treasury mint account, either native SOL mint or a SPL token mint.'
          ];
          relations: ['auctionHouse'];
        },
        {
          name: 'payer';
          docs: ['Key paying SOL fees for setting up the Auction House.'];
          writable: true;
          signer: true;
        },
        {
          name: 'authority';
          docs: ['Authority key for the Auction House.'];
          signer: true;
          relations: ['auctionHouse'];
        },
        {
          name: 'newAuthority';
          docs: ['New authority key for the Auction House.'];
        },
        {
          name: 'treasuryWithdrawalDestination';
          docs: [
            'SOL or SPL token account to receive Auction House fees. If treasury mint is native this will be the same as the `treasury_withdrawal_destination_owner`.'
          ];
          writable: true;
        },
        {
          name: 'treasuryWithdrawalDestinationOwner';
          docs: [
            'Owner of the `treasury_withdrawal_destination` account or the same address if the `treasury_mint` is native.'
          ];
        },
        {
          name: 'auctionHouse';
          docs: ['Auction House instance PDA account.'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'auction_house.creator';
                account: 'auctionHouse';
              },
              {
                kind: 'account';
                path: 'treasuryMint';
              }
            ];
          };
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
        {
          name: 'ataProgram';
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
        },
        {
          name: 'rent';
          address: 'SysvarRent111111111111111111111111111111111';
        }
      ];
      args: [
        {
          name: 'sellerFeeBasisPoints';
          type: {
            option: 'u16';
          };
        },
        {
          name: 'discountCollection';
          type: {
            option: 'pubkey';
          };
        },
        {
          name: 'discountBasisPoints';
          type: {
            option: 'u16';
          };
        }
      ];
    },
    {
      name: 'winPrize';
      discriminator: [37, 205, 206, 95, 182, 101, 121, 57];
      accounts: [
        {
          name: 'buyer';
          docs: ['Buyer account.'];
          writable: true;
          signer: true;
        },
        {
          name: 'seller';
          docs: ['Seller user wallet account.'];
          writable: true;
        },
        {
          name: 'treasuryMint';
          docs: ['Auction House treasury mint account.'];
          relations: ['auctionHouse'];
        },
        {
          name: 'escrowPaymentAccount';
          docs: ['Buyer escrow payment account PDA.'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'auctionHouse';
              },
              {
                kind: 'account';
                path: 'buyer';
              }
            ];
          };
        },
        {
          name: 'sellerPaymentReceiptAccount';
          docs: ['Seller SOL or SPL account to receive payment at.'];
          writable: true;
        },
        {
          name: 'buyerReceiptTokenAccount';
          docs: ['Buyer SPL token account to receive purchased item at.'];
          writable: true;
        },
        {
          name: 'authority';
          docs: ['Authority key for the Auction House.'];
          relations: ['auctionHouse'];
        },
        {
          name: 'auctionHouseTreasury';
          docs: ['Auction House treasury PDA account.'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'auctionHouse';
              },
              {
                kind: 'const';
                value: [116, 114, 101, 97, 115, 117, 114, 121];
              }
            ];
          };
          relations: ['auctionHouse'];
        },
        {
          name: 'auctionHouse';
          docs: ['Auction House instance PDA account.'];
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'auction_house.creator';
                account: 'auctionHouse';
              },
              {
                kind: 'account';
                path: 'auction_house.treasury_mint';
                account: 'auctionHouse';
              }
            ];
          };
        },
        {
          name: 'nftMint';
          docs: ['NFT mint account'];
        },
        {
          name: 'nftAccount';
          docs: ['NFT token account'];
          writable: true;
        },
        {
          name: 'metadata';
          docs: ['Metaplex metadata account decorating SPL mint account.'];
        },
        {
          name: 'auctionAccount';
          docs: ['auction PDA account'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'nftMint';
              },
              {
                kind: 'const';
                value: [97, 117, 99, 116, 105, 111, 110];
              }
            ];
          };
        },
        {
          name: 'offerAccount';
          docs: ['Offer PDA account'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'nftMint';
              },
              {
                kind: 'account';
                path: 'buyer';
              },
              {
                kind: 'const';
                value: [
                  97,
                  117,
                  99,
                  116,
                  105,
                  111,
                  110,
                  95,
                  111,
                  102,
                  102,
                  101,
                  114
                ];
              }
            ];
          };
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
        {
          name: 'ataProgram';
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
        },
        {
          name: 'rent';
          address: 'SysvarRent111111111111111111111111111111111';
        }
      ];
      args: [];
    },
    {
      name: 'withdrawFromTreasury';
      discriminator: [0, 164, 86, 76, 56, 72, 12, 170];
      accounts: [
        {
          name: 'treasuryMint';
          docs: [
            'Treasury mint account, either native SOL mint or a SPL token mint.'
          ];
          relations: ['auctionHouse'];
        },
        {
          name: 'authority';
          docs: ['Authority key for the Auction House.'];
          signer: true;
          relations: ['auctionHouse'];
        },
        {
          name: 'treasuryWithdrawalDestination';
          docs: [
            'SOL or SPL token account to receive Auction House fees. If treasury mint is native this will be the same as the `treasury_withdrawal_destination_owner`.'
          ];
          writable: true;
          relations: ['auctionHouse'];
        },
        {
          name: 'auctionHouseTreasury';
          docs: ['Auction House treasury PDA account.'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'auctionHouse';
              },
              {
                kind: 'const';
                value: [116, 114, 101, 97, 115, 117, 114, 121];
              }
            ];
          };
          relations: ['auctionHouse'];
        },
        {
          name: 'auctionHouse';
          docs: ['Auction House instance PDA account.'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  98,
                  105,
                  99,
                  116,
                  111,
                  114,
                  121,
                  95,
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101
                ];
              },
              {
                kind: 'account';
                path: 'auction_house.creator';
                account: 'auctionHouse';
              },
              {
                kind: 'account';
                path: 'treasuryMint';
              }
            ];
          };
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        }
      ];
      args: [
        {
          name: 'amount';
          type: 'u64';
        }
      ];
    }
  ];
  accounts: [
    {
      name: 'auctionAccount';
      discriminator: [18, 164, 170, 5, 243, 196, 229, 90];
    },
    {
      name: 'auctionHouse';
      discriminator: [40, 108, 215, 107, 213, 85, 245, 48];
    },
    {
      name: 'auctionOfferAccount';
      discriminator: [115, 83, 29, 147, 230, 234, 144, 8];
    },
    {
      name: 'listingAccount';
      discriminator: [59, 89, 136, 25, 21, 196, 183, 13];
    },
    {
      name: 'offerAccount';
      discriminator: [152, 98, 9, 183, 115, 190, 31, 201];
    }
  ];
  events: [
    {
      name: 'acceptBuyEvent';
      discriminator: [187, 205, 166, 105, 166, 183, 116, 165];
    },
    {
      name: 'auctionCancelOfferEvent';
      discriminator: [249, 129, 51, 183, 121, 234, 27, 199];
    },
    {
      name: 'auctionOfferEvent';
      discriminator: [99, 116, 228, 100, 220, 116, 150, 13];
    },
    {
      name: 'cancelAuctionEvent';
      discriminator: [72, 35, 84, 134, 59, 138, 21, 122];
    },
    {
      name: 'cancelOfferEvent';
      discriminator: [158, 149, 135, 238, 234, 227, 178, 8];
    },
    {
      name: 'createAuctionEvent';
      discriminator: [244, 157, 82, 212, 192, 159, 44, 95];
    },
    {
      name: 'depositEvent';
      discriminator: [120, 248, 61, 83, 31, 142, 107, 144];
    },
    {
      name: 'instantBuyEvent';
      discriminator: [145, 125, 203, 181, 72, 64, 81, 249];
    },
    {
      name: 'listEvent';
      discriminator: [131, 251, 20, 8, 113, 195, 210, 18];
    },
    {
      name: 'offerEvent';
      discriminator: [232, 113, 212, 148, 215, 80, 25, 176];
    },
    {
      name: 'unListEvent';
      discriminator: [80, 30, 218, 183, 3, 116, 129, 180];
    },
    {
      name: 'winPrizeEvent';
      discriminator: [167, 216, 201, 206, 42, 243, 29, 219];
    }
  ];
  errors: [
    {
      code: 6000;
      name: 'unauthorized';
      msg: 'You are not authorized to perform this action.';
    },
    {
      code: 6001;
      name: 'alreadyInUse';
      msg: 'alreadyInUse';
    },
    {
      code: 6002;
      name: 'invalidAmount';
      msg: 'Invalid amount';
    },
    {
      code: 6003;
      name: 'invalidState';
      msg: 'Invalid state';
    },
    {
      code: 6004;
      name: 'invalidOwner';
      msg: 'Invalid owner';
    },
    {
      code: 6005;
      name: 'invalidExpiry';
      msg: 'Invalid expiry';
    },
    {
      code: 6006;
      name: 'missingCreator';
      msg: 'Missing creator';
    },
    {
      code: 6007;
      name: 'notAllowed';
      msg: 'notAllowed';
    },
    {
      code: 6008;
      name: 'numericalOverflow';
      msg: 'Math operation overflow';
    },
    {
      code: 6009;
      name: 'invalidAccountInput';
      msg: 'invalidAccountInput';
    },
    {
      code: 6010;
      name: 'invalidPubkey';
      msg: 'invalidPubkey';
    },
    {
      code: 6011;
      name: 'uninitialized';
      msg: 'uninitialized';
    },
    {
      code: 6012;
      name: 'buyerAtaCannotHaveDelegate';
      msg: 'Buyer ata cannot have a delegate set';
    },
    {
      code: 6013;
      name: 'sellerAtaCannotHaveDelegate';
      msg: 'Seller ata cannot have a delegate set';
    },
    {
      code: 6014;
      name: 'invalidDiscountAccount';
      msg: 'Invalid discount account';
    }
  ];
  types: [
    {
      name: 'acceptBuyEvent';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'buyer';
            type: 'pubkey';
          },
          {
            name: 'seller';
            type: 'pubkey';
          },
          {
            name: 'mint';
            type: 'pubkey';
          },
          {
            name: 'price';
            type: 'u64';
          },
          {
            name: 'timestamp';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'auctionAccount';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'owner';
            type: 'pubkey';
          },
          {
            name: 'nftMint';
            type: 'pubkey';
          },
          {
            name: 'price';
            type: 'u64';
          },
          {
            name: 'startTime';
            type: 'u64';
          },
          {
            name: 'endTime';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'bidCount';
            type: 'u32';
          },
          {
            name: 'topBid';
            type: 'u64';
          },
          {
            name: 'topBidder';
            type: 'pubkey';
          }
        ];
      };
    },
    {
      name: 'auctionCancelOfferEvent';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'buyer';
            type: 'pubkey';
          },
          {
            name: 'mint';
            type: 'pubkey';
          },
          {
            name: 'timestamp';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'auctionHouse';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'auctionHouseTreasury';
            type: 'pubkey';
          },
          {
            name: 'treasuryWithdrawalDestination';
            type: 'pubkey';
          },
          {
            name: 'treasuryMint';
            type: 'pubkey';
          },
          {
            name: 'authority';
            type: 'pubkey';
          },
          {
            name: 'creator';
            type: 'pubkey';
          },
          {
            name: 'sellerFeeBasisPoints';
            type: 'u16';
          },
          {
            name: 'discountCollection';
            type: 'pubkey';
          },
          {
            name: 'discountBasisPoints';
            type: 'u16';
          }
        ];
      };
    },
    {
      name: 'auctionOfferAccount';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'buyer';
            type: 'pubkey';
          },
          {
            name: 'nftMint';
            type: 'pubkey';
          },
          {
            name: 'price';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'auctionOfferEvent';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'buyer';
            type: 'pubkey';
          },
          {
            name: 'mint';
            type: 'pubkey';
          },
          {
            name: 'price';
            type: 'u64';
          },
          {
            name: 'timestamp';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'cancelAuctionEvent';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'seller';
            type: 'pubkey';
          },
          {
            name: 'mint';
            type: 'pubkey';
          },
          {
            name: 'timestamp';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'cancelOfferEvent';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'buyer';
            type: 'pubkey';
          },
          {
            name: 'mint';
            type: 'pubkey';
          },
          {
            name: 'timestamp';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'createAuctionEvent';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'seller';
            type: 'pubkey';
          },
          {
            name: 'mint';
            type: 'pubkey';
          },
          {
            name: 'price';
            type: 'u64';
          },
          {
            name: 'startTime';
            type: 'u64';
          },
          {
            name: 'endTime';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'timestamp';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'depositEvent';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'wallet';
            type: 'pubkey';
          },
          {
            name: 'escrow';
            type: 'pubkey';
          },
          {
            name: 'amount';
            type: 'u64';
          },
          {
            name: 'timestamp';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'instantBuyEvent';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'buyer';
            type: 'pubkey';
          },
          {
            name: 'seller';
            type: 'pubkey';
          },
          {
            name: 'mint';
            type: 'pubkey';
          },
          {
            name: 'price';
            type: 'u64';
          },
          {
            name: 'timestamp';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'listEvent';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'seller';
            type: 'pubkey';
          },
          {
            name: 'mint';
            type: 'pubkey';
          },
          {
            name: 'price';
            type: 'u64';
          },
          {
            name: 'sellerExpiry';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'timestamp';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'listingAccount';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'owner';
            type: 'pubkey';
          },
          {
            name: 'nftMint';
            type: 'pubkey';
          },
          {
            name: 'price';
            type: 'u64';
          },
          {
            name: 'expiry';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'offerAccount';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'buyer';
            type: 'pubkey';
          },
          {
            name: 'nftMint';
            type: 'pubkey';
          },
          {
            name: 'price';
            type: 'u64';
          },
          {
            name: 'expiry';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'offerEvent';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'buyer';
            type: 'pubkey';
          },
          {
            name: 'mint';
            type: 'pubkey';
          },
          {
            name: 'price';
            type: 'u64';
          },
          {
            name: 'buyerExpiry';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'timestamp';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'unListEvent';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'seller';
            type: 'pubkey';
          },
          {
            name: 'mint';
            type: 'pubkey';
          },
          {
            name: 'timestamp';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'winPrizeEvent';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'buyer';
            type: 'pubkey';
          },
          {
            name: 'seller';
            type: 'pubkey';
          },
          {
            name: 'mint';
            type: 'pubkey';
          },
          {
            name: 'price';
            type: 'u64';
          },
          {
            name: 'timestamp';
            type: 'u64';
          }
        ];
      };
    }
  ];
};
