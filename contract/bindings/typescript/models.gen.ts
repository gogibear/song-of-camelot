import type { SchemaType as ISchemaType } from "@dojoengine/sdk";

import { BigNumberish } from 'starknet';

// Type definition for `song_of_camelot::Influence` struct
export interface Influence {
	x: BigNumberish;
	y: BigNumberish;
	element: BigNumberish;
	score: BigNumberish;
}

// Type definition for `song_of_camelot::InfluenceValue` struct
export interface InfluenceValue {
	score: BigNumberish;
}

// Type definition for `song_of_camelot::Player` struct
export interface Player {
	owner: string;
	primary_element: BigNumberish;
	secondary_element: BigNumberish;
	tertiary_element: BigNumberish;
	primary_balance: BigNumberish;
	secondary_balance: BigNumberish;
	tertiary_balance: BigNumberish;
}

// Type definition for `song_of_camelot::PlayerValue` struct
export interface PlayerValue {
	primary_element: BigNumberish;
	secondary_element: BigNumberish;
	tertiary_element: BigNumberish;
	primary_balance: BigNumberish;
	secondary_balance: BigNumberish;
	tertiary_balance: BigNumberish;
}

export interface SchemaType extends ISchemaType {
	song_of_camelot: {
		Influence: Influence,
		InfluenceValue: InfluenceValue,
		Player: Player,
		PlayerValue: PlayerValue,
	},
}
export const schema: SchemaType = {
	song_of_camelot: {
		Influence: {
			x: 0,
			y: 0,
			element: 0,
		score: 0,
		},
		InfluenceValue: {
		score: 0,
		},
		Player: {
			owner: "",
			primary_element: 0,
			secondary_element: 0,
			tertiary_element: 0,
		primary_balance: 0,
		secondary_balance: 0,
		tertiary_balance: 0,
		},
		PlayerValue: {
			primary_element: 0,
			secondary_element: 0,
			tertiary_element: 0,
		primary_balance: 0,
		secondary_balance: 0,
		tertiary_balance: 0,
		},
	},
};
export enum ModelsMapping {
	Influence = 'song_of_camelot-Influence',
	InfluenceValue = 'song_of_camelot-InfluenceValue',
	Player = 'song_of_camelot-Player',
	PlayerValue = 'song_of_camelot-PlayerValue',
}