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

In a new terminal, navigate to the main game's client directory.

```bash
cd song-of-camelot/client/project

# Install dependencies and start the dev server
npm install
npm run dev
```
This will start the main game on `http://localhost:5173`.

**4. Play the Game**

*   Open your browser and navigate to the login wrapper at **`http://localhost:3002`**.
*   Connect your wallet to begin the quest.
*   Once you are logged in, you will be automatically redirected to the main game at **`http://localhost:5173`**.
*   You can now interact with the game world.

---

## Game Design & Lore

### 1. High-Concept Pitch
A massively multiplayer, player-driven area control event where players, as primordial spirits, shape a new world. Through conflict and collaboration, players will determine which three of nine elements become the founding realms. The game's duration is determined by the players' ability to achieve the ultimate goal: forging three permanent Strongholds. The entire event is a narrative generator, creating the foundational lore, rivalries, and history for a future game.

### 2. The Player Journey & Core Loop

*   **The Calling (Onboarding):** The player enters, embodies a "Spirit," and makes a permanent, one-time choice of a Primary Element to champion by selecting their instrument of choice. The game then randomly and permanently assigns two other elements as their Secondary and Tertiary farming pools. This choice is final to give it narrative weight and consequence.
*   **The Symphony (Farming):** The player passively generates a pool of three types of elemental tokens based on their assigned elements.
*   **The Shaping (Spending):** The player can spend their tokens at any time to influence the map. The 12-hour wallet cap is a maximum capacity, not a minimum time to act, allowing for both frequent tactical plays and larger, planned actions.
*   **The Schism (Game End):** The game ends when one of two conditions is met:
    *   **Victory:** The moment the third unique Stronghold is built. The top three elements are declared the victors.
    *   **Defeat:** The moment the Blight consumes a majority of the map (>50% of tiles). The world is lost to darkness, and this becomes the canonical outcome.

### 3. Resource System: The Elemental Economy

*   **Resource Generation (Farming):** A player's choice of Primary Element and their two randomly assigned Secondary/Tertiary elements determine their unique farming pool.
*   **Balancing Variables:**
    *   **Farming Rate:** 840 tokens per hour.
    *   **Reasoning:** This rate fills the wallet in exactly 12 hours. The number 840 is divisible by 60 (14 tokens/minute), providing a smooth accumulation rate. This encourages players to log in at least twice a day to maximize their influence.
*   **Resource Expenditure (Spending):**
    *   **Action 1: Influence Tile (Primary Action):** Spend 100 elemental tokens to add +1 Influence to a chosen tile.
    *   **Action 2: Build Stronghold (Major Objective):** Costs 10,000 Influence on a single tile. This is a massive resource sink requiring significant player coordination.
    *   **Action 3: Counter-Influence (Blight):** Spend 1,000 tokens of a specific element to add +1 Blight to a tile. This is a powerful, expensive, and destructive move.
