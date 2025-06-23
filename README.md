# Song of Camelot

## How to Play
To run this project, you will need to run two separate applications simultaneously: the login wrapper and the main game.

**Prerequisites:**
*   Node.js and npm
*   Dojo toolchain (`sozo`, `katana`)

**1. Clone the Repository**
```bash
git clone https://github.com/gogibear/song-of-camelot.git
cd song-of-camelot
git checkout feature/cartridge-login-v4
```

**2. Set up the Login Wrapper**

First, we'll get the login application running. This handles wallet connection and player creation.

```bash
# Navigate to the login wrapper's contract directory
cd login-wrapper/contract

# Build and migrate the contracts
sozo build
sozo migrate

# Navigate to the login wrapper's client directory
cd ../client

# Install dependencies and start the dev server
npm install
npm run dev
```
This will start the login wrapper on `http://localhost:3002`. Keep this terminal open.

**3. Set up the Main Game**

In a **new terminal**, navigate to the main game's client directory.

```bash
# Navigate to the main game's client directory
cd client/project

# Install dependencies and start the dev server
npm install
npm run dev
```
This will start the main game on `http://localhost:5173`.

**4. Play the Game**
*   Open your browser and navigate to the login wrapper at [http://localhost:3002](http://localhost:3002).
*   Connect your wallet to enter the world.
*   You will be automatically redirected to the main game at [http://localhost:5173](http://localhost:5173) to begin your journey.

---

## 1. Game Overview & Core Pillars

### 1.1. High-Concept Pitch
A massively multiplayer, player-driven area control event where players, as primordial spirits, shape a new world. Through conflict and collaboration, players will determine which three of nine elements become the founding realms. The game's duration is determined by the players' ability to achieve the ultimate goal: forging three permanent Strongholds. The entire event is a narrative generator, creating the foundational lore, rivalries, and history for a future game.

### 1.2. Core Pillars
*   **Player-Driven Narrative:** The players' actions directly create the world's history. The final map state and the recorded history of player actions are the primary rewards.
*   **Strategic Collaboration & Conflict:** Simple actions lead to complex political and tactical decisions, encouraging both faction-based warfare and cross-faction alliances.
*   **Meaningful Choices:** Every major decision, from initial allegiance to resource expenditure, has a lasting and visible impact on the game world.

### 1.3. Target Experience
Players should feel like powerful, mythic beings shaping a universe. The experience should be a mix of strategic PvP conflict, collaborative PvE challenges, and high-stakes political drama.

## 2. The Player Journey & Core Loop

*   **The Calling (Onboarding):** The player enters, embodies a "Spirit," and makes a permanent, one-time choice of a Primary Element to champion by selecting their instrument of choice. The game then randomly and permanently assigns two other elements as their Secondary and Tertiary farming pools. This choice is final to give it narrative weight and consequence.
*   **The Symphony (Farming):** The player passively generates a pool of three types of elemental tokens based on their assigned elements.
*   **The Shaping (Spending):** The player can spend their tokens at any time to influence the map. The 12-hour wallet cap is a maximum capacity, not a minimum time to act, allowing for both frequent tactical plays and larger, planned actions.  
*   **The Schism (Game End):** The game ends when one of two conditions is met:
    *   **Victory:** The moment the third unique Stronghold is built. The top three elements are declared the victors.
    *   **Defeat:** The moment the Blight consumes a majority of the map (>50% of tiles). The world is lost to darkness, and this becomes the canonical outcome.

## 3. Resource System: The Elemental Economy

### 3.1. Resource Generation (Farming)
A player's choice of Primary Element and their two randomly assigned Secondary/Tertiary elements determine their unique farming pool.

*   **Farming Rate:** 840 tokens per hour. (Fills the wallet in 12 hours).
*   **Primary Element %:** 70% (588 tokens/hour).
*   **Secondary/Tertiary Element %:** 15% each (126 tokens/hour each).

### 3.2. Resource Storage (The Wallet)
Players have a hard cap on the number of tokens they can hold. This is a crucial mechanic to prevent hoarding and force continuous interaction with the map.

*   **Wallet Capacity:** 10,080 tokens (Precisely 12 hours of farming).

## 4. Core Gameplay: The Command Wheel

### 4.1. Action: FORTIFY (Defense)
The baseline action. Instantly adds Influence Points to a friendly element on a tile. This is the most efficient way to build power.
*   **Cost-to-Effect Ratio:** 1 token = 1 Influence Point.

### 4.2. Action: SIEGE (Offense)
Applies a damage-over-time (DoT) effect to a target element's Influence Score on a single tile. The damage is calculated as a percentage of the target's current influence, making it effective against both weak and strong targets.
*   **Cost:** 1 token spent = 1 Siege Point.
*   **Effectiveness:** Each Siege Point inflicts 0.0016% damage to the target's current influence score per hour.
*   **Duration:** 4 hours.

### 4.3. Action: RESONATE (Strategic Support)
A scalable buff (Blessing) or debuff (Curse) that temporarily makes all actions of a chosen element more or less effective on a single tile. Its primary power is as a force multiplier for cooperative team play.
*   **Scaling Cost:** 1,000 tokens spent = +5% change in effectiveness.
*   **Max Effect (Soft Cap):** The effect has diminishing returns after 10,000 tokens (50% effectiveness).
*   **Duration:** 6 hours.
*   **Stacking Rules:** All active Blessings and Curses on a tile are added together to create a single net modifier.

## 5. The Endgame: Strongholds & Victory Conditions

### 5.1. The Ritual of Fortification
A collaborative mechanic to create a permanent, but destructible, Stronghold.
*   **Dominance Threshold:** An element must control >60% of the total influence on a tile.
*   **Dominance Duration:** The dominance must be held continuously for 24 hours.
*   **Ritual Player Requirement:** 10 unique players of that element must participate.
*   **Ritual Contribution Cost:** Each participating player must contribute 5,000 tokens.
*   **Ritual Time Limit:** The ritual must be completed within 6 hours of being initiated.

### 5.2. The Unravel Action (Destroying a Stronghold)
A special, high-cost action to destroy an existing Stronghold, intended as a comeback mechanic for underdog coalitions.
*   **Activation Requirement:** Can only be initiated if the defending element's influence on the Stronghold tile drops below 50%.
*   **Coalition Requirement:** The Unravel action must be funded by tokens from at least 3 different elements.
*   **Total Cost:** 250,000 tokens.

## 6. The Meta-Game: The Creeping Blight

### 6.1. The Blight Mechanic
A server-wide PvE event that forces cross-faction cooperation and makes all elemental tokens valuable. A random tile becomes "Blighted," disabling actions and threatening adjacent tiles.
*   **Spawn Frequency:** A new Blight appears every 8-12 hours (random interval).
*   **Spawn Location:** Has a 75% higher chance to appear on or adjacent to a tile with high conflict.
*   **Spread Timer:** If not cleansed, the Blight spreads to an adjacent tile after 24 hours.
*   **Endgame Trigger:** If the number of Blighted tiles ever exceeds 27 (50% of the map), the game ends.

### 6.2. The Cleansing Mechanic
Players must contribute a randomized recipe of elemental tokens to Altars on tiles adjacent to the Blight to cleanse it. Rewards are given to all contributors.
*   **Recipe Size:** Always requires 3 different elements.
*   **Recipe Amount:** The total token requirement is randomized between 75,000 and 150,000 tokens.
