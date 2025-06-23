import { DojoProvider, DojoCall } from "@dojoengine/core";
import { Account, AccountInterface, BigNumberish, CairoOption, CairoCustomEnum, ByteArray } from "starknet";
import * as models from "./models.gen";

export function setupWorld(provider: DojoProvider) {

	const build_actions_fortify_calldata = (x: BigNumberish, y: BigNumberish, element: BigNumberish, amount: BigNumberish): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "fortify",
			calldata: [x, y, element, amount],
		};
	};

	const actions_fortify = async (snAccount: Account | AccountInterface, x: BigNumberish, y: BigNumberish, element: BigNumberish, amount: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_actions_fortify_calldata(x, y, element, amount),
				"song_of_camelot",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_spawn_calldata = (primaryElement: BigNumberish, secondaryElement: BigNumberish, tertiaryElement: BigNumberish): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "spawn",
			calldata: [primaryElement, secondaryElement, tertiaryElement],
		};
	};

	const actions_spawn = async (snAccount: Account | AccountInterface, primaryElement: BigNumberish, secondaryElement: BigNumberish, tertiaryElement: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_actions_spawn_calldata(primaryElement, secondaryElement, tertiaryElement),
				"song_of_camelot",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};



	return {
		actions: {
			fortify: actions_fortify,
			buildFortifyCalldata: build_actions_fortify_calldata,
			spawn: actions_spawn,
			buildSpawnCalldata: build_actions_spawn_calldata,
		},
	};
}