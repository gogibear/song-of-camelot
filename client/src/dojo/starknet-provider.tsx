import { type PropsWithChildren, useContext } from "react";
import { sepolia, mainnet, type Chain } from "@starknet-react/chains";
import {
    jsonRpcProvider,
    StarknetConfig,
    starkscan,
} from "@starknet-react/core";
import { DojoContext } from "@dojoengine/sdk/react";
import cartridgeConnector from "../config/cartridgeConnector";

export const KATANA_ID = BigInt("0x4b4154414e41");
export const KATANA_NAME = "Katana";

export default function StarknetProvider({ children }: PropsWithChildren) {
    const { VITE_PUBLIC_DEPLOY_TYPE } = import.meta.env;
    const {
        config: { rpcUrl },
    } = useContext(DojoContext);

    // Get RPC URL based on environment
    const getRpcUrl = () => {
        switch (VITE_PUBLIC_DEPLOY_TYPE) {
            case "mainnet":
                return "https://api.cartridge.gg/x/starknet/mainnet";
            case "sepolia":
                return "https://api.cartridge.gg/x/starknet/sepolia";
            default:
                return rpcUrl;
        }
    };

    // Create provider with the correct RPC URL
    const provider = jsonRpcProvider({
        rpc: () => ({ nodeUrl: getRpcUrl() }),
    });

    // Determine which chain to use
    const getChains = () => {
        switch (VITE_PUBLIC_DEPLOY_TYPE) {
            case "mainnet":
                return [mainnet];
            case "sepolia":
                return [sepolia];
            default:
                const katana: Chain = {
                    id: KATANA_ID,
                    name: KATANA_NAME,
                    network: "katana",
                    nativeCurrency: {
                        address:
                            "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
                        name: "Ether",
                        symbol: "ETH",
                        decimals: 18,
                    },
                    rpcUrls: {
                        default: {
                            http: [rpcUrl],
                        },
                        public: {
                            http: [rpcUrl],
                        },
                    },
                    testnet: true,
                };
                return [katana];
        }
    };

    return (
        <StarknetConfig
            autoConnect
            chains={getChains()}
            connectors={[cartridgeConnector]}
            explorer={starkscan}
            provider={provider}
        >
            {children}
        </StarknetConfig>
    );
}