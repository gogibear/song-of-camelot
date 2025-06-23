# Song of Camelot - Backend API & Frontend Integration Brief

## 1. Overview

This document provides the technical specification for the "Song of Camelot" MVP backend. It details the deployed smart contracts, data models, available functions (actions), and the expected user flow for frontend integration.

The backend has been completely rewritten and deployed. **Any previous frontend code based on the original template is now incompatible.** The frontend team should use this document as the single source of truth for the new contract APIs.

## 2. Core Infrastructure

### Local Blockchain (Katana)
The local development blockchain.
- **RPC Endpoint**: `http://localhost:5050`
- **Note**: Ensure Katana is running before starting frontend development.

### Indexer (Torii)
The service that provides real-time data from the blockchain.
- **GraphQL Endpoint**: `http://localhost:8080/graphql`
- **Note**: Ensure Torii is running and pointed to the correct World Address.

### World Address
This is the central address for the deployed game contracts.
- **World Address**: `0x7387a8b4db04de842f711c250ab464275164c5b0b6006255421bc2b2f6488df`

## 3. Client-Side Bindings (Crucial!)

To ensure type-safety and provide easy access to the contract state and functions, TypeScript bindings have been auto-generated.

- **Location**: `client/src/dojo/generated/`
- **Usage**: The frontend should import all contract models and system definitions from this directory. This is not optional; it's the standard and safest way to interact with the Dojo backend.

## 4. Contract API Reference

### Models (Data Structures)

These are the core data structures of the game. The frontend will query these models from Torii to display the game state.

---

#### `Player`
*Represents a player in the game.*
- **Namespace**: `song_of_camelot`
- **Fields**:
    - `player_id` (felt252): The player's unique address.
    - `primary_element` (enum `Element`): The player's chosen primary element.
    - `secondary_elements` (Tuple<enum `Element`, enum `Element`>): The two randomly assigned secondary elements.
    - `token_balance_primary` (u256): The player's balance of their primary element's token.
    - `token_balance_secondary_1` (u256): The player's balance of their first secondary element's token.
    - `token_balance_secondary_2` (u256): The player's balance of their second secondary element's token.
    - `last_harvest_timestamp` (u64): The timestamp of the last time the player harvested resources.

---

#### `Tile`
*Represents one of the 9 game tiles.*
- **Namespace**: `song_of_camelot`
- **Fields**:
    - `tile_id` (u8): The ID of the tile (0-8).
    - `fire_influence` (u256): Influence score for Fire on this tile.
    - `water_influence` (u256): Influence score for Water on this tile.
    - `earth_influence` (u256): Influence score for Earth on this tile.
    - `wind_influence` (u256): Influence score for Wind on this tile.
    - `lightning_influence` (u256): Influence score for Lightning on this tile.
    - `ice_influence` (u256): Influence score for Ice on this tile.
    - `light_influence` (u256): Influence score for Light on this tile.
    - `shadow_influence` (u256): Influence score for Shadow on this tile.
    - `aether_influence` (u256): Influence score for Aether on this tile.

---

#### `Element` (Enum)
*The 9 elements in the game.*
- **Values**: `Fire`, `Water`, `Earth`, `Wind`, `Lightning`, `Ice`, `Light`, `Shadow`, `Aether`

---
### Systems (Functions)

These are the functions the frontend will call to execute actions in the game. They should be called using the generated client bindings.

---

#### `actions.spawn`
*Creates a new player.*
- **Function Name**: `spawn`
- **Arguments**:
    - `signer` (pre-injected): The player's account.
    - `primary_element` (enum `Element`): The element chosen by the player during onboarding.
- **Description**: Creates a new `Player` entity. Randomly assigns two *different* secondary elements that are not the primary element. Initializes token balances to zero.

---

#### `actions.fortify`
*Spend tokens to increase influence on a tile.*
- **Function Name**: `fortify`
- **Arguments**:
    - `signer` (pre-injected): The player's account.
    - `tile_id` (u8): The ID of the tile to fortify (0-8).
    - `element` (enum `Element`): The element whose influence is being increased. Must be one of the player's three elements.
    - `amount` (u256): The amount of tokens to spend.
- **Description**: Deducts `amount` from the player's corresponding token balance and adds `amount` to the `influence` score of the chosen `element` on the specified `tile_id`.

---

#### `resource.harvest`
*Calculates and claims generated resources for the player.*
- **Function Name**: `harvest`
- **Arguments**:
    - `signer` (pre-injected): The player's account.
- **Description**: Calculates the amount of tokens generated since the `last_harvest_timestamp`. It awards tokens based on the 70/15/15 split (Primary/Secondary1/Secondary2) and updates the player's three token balances. It also updates the `last_harvest_timestamp`. **This function must be called by the player to receive their resources.**

## 5. Frontend User Flow Integration

Here is the recommended sequence of contract interactions for the frontend implementation.

### Flow 1: Player Onboarding
1.  **Check for Existing Player**: On connect, query Torii for a `Player` model keyed by the user's `signer` address.
2.  **Show Onboarding UI**: If no `Player` exists, show the element selection screen.
3.  **Call `spawn`**: When the user selects their primary element, the frontend should call the `actions.spawn` function, passing the chosen element.
4.  **Transition to Game**: Once the transaction is confirmed, the new `Player` entity will be available via Torii. The UI should then transition to the main game view.

### Flow 2: Passive Resource Generation
1.  **The `harvest` action is NOT automatic.** The backend does not have a "cron job".
2.  **Display Estimated Gains**: The frontend can calculate and display *claimable* resources in the UI by reading the `last_harvest_timestamp` and simulating the `harvest` calculation locally.
3.  **Provide "Harvest" Button**: The UI must have a button or other trigger that allows the player to call the `resource.harvest` function.
4.  **Update Balances**: After the `harvest` transaction is confirmed, the player's token balances in the UI should update to reflect the new values from the `Player` model.

### Flow 3: Fortifying a Tile
1.  **Select a Tile**: User clicks on one of the 9 tiles in the UI.
2.  **Display Fortify Options**: The UI should show options for the user to spend any of their three elements' tokens on that tile. The UI should not allow spending more tokens than the player has.
3.  **Call `fortify`**: When the user confirms, the frontend calls the `actions.fortify` function with the `tile_id`, the `element` they are using, and the `amount` of tokens to spend.
4.  **Update UI**: On confirmation, the tile's influence scores and the player's token balances will update automatically via the Torii subscription.

This brief should provide your frontend team with a clear and complete guide to building the UI for the Song of Camelot MVP. 