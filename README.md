# 🎮 Dojo Game Starter

> **The fastest way to build onchain games on Starknet**
> From zero to deployed in 5 minutes ⚡

<div align="center">
  <img src="./client/src/assets/Dojo-Logo-Stylized-Red.svg" alt="Dojo Engine" height="60"/>
  &nbsp;&nbsp;&nbsp;
  <img src="./client/src/assets/DojoByExample_logo.svg" alt="Dojo by Example" height="60"/>
  &nbsp;&nbsp;&nbsp;
  <img src="./client/src/assets/SN-Linear-Gradient.svg" alt="Starknet" height="60"/>
</div>

## ✨ What's Included

**🎨 Frontend Ready**
- React + Vite + TypeScript with complete Dojo integration
- Cartridge Controller wallet integration with session policies
- Real-time game UI with optimistic updates
- Comprehensive hooks for blockchain operations

**⚙️ Backend Complete**
- Cairo smart contracts with Dojo Engine architecture
- Player progression system with experience, health, and coins
- Integrated achievement system with 5+ achievements
- Production-ready deployment configuration

## 🛠️ Tech Stack

```
Frontend: React + Vite + TypeScript + TailwindCSS + Zustand
Backend:  Cairo + Dojo Engine + Torii GraphQL Indexer
Network:  Starknet (Local/Sepolia/Mainnet)
Wallet:   Cartridge Controller
```

## 📦 Project Structure

```
dojo-game-starter/
├── 📱 client/                    # Complete React + Dojo integration
│   ├── src/dojo/                 # Core Dojo integration files
│   │   ├── bindings.ts           # TypeScript interfaces from Cairo
│   │   ├── dojoConfig.ts         # Network and connection configuration
│   │   ├── contracts.gen.ts      # Auto-generated contract functions
│   │   └── hooks/                # Custom React hooks for blockchain
│   ├── docs/                     # 📚 Complete integration documentation
│   └── README.md                 # Frontend-specific documentation
├── ⚙️ contract/                 # Cairo smart contracts
│   ├── src/
│   │   ├── models/               # Data entities (Player model)
│   │   ├── systems/              # Game logic (train, mine, rest)
│   │   ├── achievements/         # Achievement system implementation
│   │   └── store/                # Data layer abstraction
│   └── README.md                 # Backend development and deployment guide
└── tests/                        # Integration tests
```

## 📚 Documentation

### **🎨 Frontend Integration**
The `client/` directory contains a complete React + Dojo integration with comprehensive documentation:

📖 **[Client Documentation](./client/README.md)** - Start here for frontend development

**Complete Integration Guide Series:**
- **[01. Overview](./client/docs/01-overview.md)** - Architecture and concepts
- **[02. Architecture](./client/docs/02-architecture.md)** - System design patterns
- **[03. Core Files](./client/docs/03-core-files.md)** - Essential integration files
- **[04. Zustand State Management](./client/docs/04-zustand-state-management.md)** - Optimistic updates
- **[05. Cartridge Controller](./client/docs/05-cartridge-controller.md)** - Gaming wallet UX
- **[06. React Hooks Pattern](./client/docs/06-react-hooks-pattern.md)** - Blockchain hooks
- **[07. Data Flow](./client/docs/07-data-flow.md)** - Request/response cycles
- **[08. Extending the System](./client/docs/08-extending-system.md)** - Building your game

### **⚙️ Backend Development**
The `contract/` directory contains Cairo smart contracts with Dojo Engine:

📖 **[Contracts Documentation](./contract/README.md)** - Backend development guide

**Key Topics Covered:**
- **Project Structure** - Models, Systems, Store architecture
- **Game Mechanics** - Player actions (spawn, train, mine, rest)
- **Achievement System** - Complete trophy/task implementation
- **Local Development** - Katana, Sozo, Torii setup
- **Sepolia Deployment** - Production deployment process
- **Testing Strategy** - Integration tests and best practices

## 🎮 Game Mechanics

The starter demonstrates essential onchain game patterns:

| Action | Effect | Demonstrates |
|--------|--------|--------------|
| 🏋️ **Train** | +10 Experience | Pure advancement mechanics |
| ⛏️ **Mine** | +5 Coins, -5 Health | Risk/reward decision making |
| 💤 **Rest** | +20 Health | Resource management systems |

**🏆 Achievement System:**
- **MiniGamer** (1 action) → **SenseiGamer** (50 actions)
- Complete integration with frontend achievement display
- Automatic progress tracking for all game actions

## 🎯 Perfect For

- 🏆 **Hackathon teams** needing rapid onchain game setup
- 🎮 **Game developers** entering Web3 with production patterns
- 🏢 **Studios** prototyping blockchain games with real UX
- 📚 **Developers** learning Starknet + Dojo with comprehensive examples

## 🚀 Key Features

**⚡ Gaming-First UX**
- Cartridge Controller integration eliminates wallet friction
- Session policies enable uninterrupted gameplay
- Optimistic updates provide instant feedback
- Background blockchain confirmation

**🔧 Developer Experience**
- Complete TypeScript integration end-to-end
- Hot reload with contract changes
- Comprehensive error handling patterns
- Production deployment configurations

**🏗️ Scalable Architecture**
- Modular component design for easy extension
- Reusable hooks for blockchain operations
- Clean separation between UI and blockchain logic
- Performance optimizations built-in

## 🌟 Getting Started

1. **For Frontend Development:** Start with [Client README](./client/README.md)
2. **For Backend Development:** Check [Contracts README](./contract/README.md)
3. **For Complete Understanding:** Follow the [Integration Guide Series](./client/docs/)

## 🔗 Links

- **[Starknet](https://starknet.io)**
- **[Dojo Engine](https://dojoengine.org)**
- **[Cairo](https://cairo-lang.org)**
- **[Cartridge](https://cartridge.gg)**

---

**Built with ❤️ for the Starknet gaming community**

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

Now, in a **new terminal window**, we'll start the main game application.

```bash
# Navigate to the main game's contract directory from the project root
cd contract

# Build and migrate the contracts
sozo build
sozo migrate

# Navigate to the main game's client directory
cd ../client/project

# Install dependencies and start the dev server
npm install
npm run dev
```
This will start the main game on `http://localhost:5173`. Keep this terminal open as well.

**4. Play the Game!**

*   Open your web browser and go to `http://localhost:3002`.
*   You will see the "Enter Avalon" login screen. Click "Begin Quest" to connect your wallet.
*   Once you are logged in, you will be automatically redirected to the main game at `http://localhost:5173`.

---

## High-Concept Pitch
A massively multiplayer, player-driven area control event where players, as primordial spirits, shape a new world. Through conflict and collaboration, players will determine which three of nine elements become the founding realms. The game's duration is determined by the players' ability to achieve the ultimate goal: forging three permanent Strongholds. The entire event is a narrative generator, creating the foundational lore, rivalries, and history for a future game.

## Core Pillars
*   **Player-Driven Narrative:** The players' actions directly create the world's history. The final map state and the recorded history of player actions are the primary rewards.
*   **Strategic Collaboration & Conflict:** Simple actions lead to complex political and tactical decisions, encouraging both faction-based warfare and cross-faction alliances.
*   **Meaningful Choices:** Every major decision, from initial allegiance to resource expenditure, has a lasting and visible impact on the game world.
*   **Target Experience:** Players should feel like powerful, mythic beings shaping a universe. The experience should be a mix of strategic PvP conflict, collaborative PvE challenges, and high-stakes political drama.

## The Player Journey & Core Loop
*   **The Calling (Onboarding):** The player enters, embodies a "Spirit," and makes a permanent, one-time choice of a Primary Element to champion by selecting their instrument of choice. The game then randomly and permanently assigns two other elements as their Secondary and Tertiary farming pools. This choice is final to give it narrative weight and consequence.
*   **The Symphony (Farming):** The player passively generates a pool of three types of elemental tokens based on their assigned elements.
*   **The Shaping (Spending):** The player can spend their tokens at any time to influence the map. The 12-hour wallet cap is a maximum capacity, not a minimum time to act, allowing for both frequent tactical plays and larger, planned actions.  
*   **The Schism (Game End):** The game ends when one of two conditions is met:
    *   **Victory:** The moment the third unique Stronghold is built. The top three elements are declared the victors.
    *   **Defeat:** The moment the Blight consumes a majority of the map (>50% of tiles). The world is lost to darkness, and this becomes the canonical outcome.

## Resource System: The Elemental Economy
### 3.1. Resource Generation (Farming)
*   **Description:** A player's choice of Primary Element and their two randomly assigned Secondary/Tertiary elements determine their unique farming pool.
*   **Farming Rate:** 840 tokens per hour. This rate fills the wallet in exactly 12 hours.
*   **Primary Element %:** 70% (588 tokens/hour).
*   **Secondary/Tertiary Element %:** 15% each (126 tokens/hour each).

### 3.2. Resource Storage (The Wallet)
*   **Description:** Players have a hard cap on the number of tokens they can hold. This is a crucial mechanic to prevent hoarding and force continuous interaction with the map.
*   **Wallet Capacity:** 10,080 tokens (Precisely 12 hours of farming).

## Core Gameplay: The Command Wheel
### 4.1. Action: FORTIFY (Defense)
*   **Description:** The baseline action. Instantly adds Influence Points to a friendly element on a tile. This is the most efficient way to build power.
*   **Cost-to-Effect Ratio:** 1 token = 1 Influence Point.

### 4.2. Action: SIEGE (Offense)
*   **Description:** Applies a damage-over-time (DoT) effect to a target element's Influence Score on a single tile.
*   **Cost:** 1 token spent = 1 Siege Point.
*   **Effectiveness:** Each Siege Point inflicts 0.0016% damage to the target's current influence score per hour.
*   **Duration:** 4 hours.

### 4.3. Action: RESONATE (Strategic Support)
*   **Description:** A scalable buff (Blessing) or debuff (Curse) that temporarily makes all actions of a chosen element more or less effective on a single tile.
*   **Scaling Cost:** 1,000 tokens spent = +5% change in effectiveness.
*   **Max Effect (Soft Cap):** The effect has diminishing returns after 10,000 tokens (50% effectiveness).
*   **Duration:** 6 hours.
*   **Stacking Rules:** All active Blessings and Curses on a tile are added together to create a single net modifier.

## The Endgame: Strongholds & Victory Conditions
### 5.1. The Ritual of Fortification
*   **Description:** A collaborative mechanic to create a permanent, but destructible, Stronghold.
*   **Dominance Threshold:** An element must control >60% of the total influence on a tile.
*   **Dominance Duration:** The dominance must be held continuously for 24 hours.
*   **Ritual Player Requirement:** 10 unique players of that element must participate.
*   **Ritual Contribution Cost:** Each participating player must contribute 5,000 tokens.
*   **Ritual Time Limit:** The ritual must be completed within 6 hours of being initiated.

### 5.2. The Unravel Action (Destroying a Stronghold)
*   **Description:** A special, high-cost action to destroy an existing Stronghold, intended as a comeback mechanic for underdog coalitions.
*   **Activation Requirement:** Can only be initiated if the defending element's influence on the Stronghold tile drops below 50%.
*   **Coalition Requirement:** The Unravel action must be funded by tokens from at least 3 different elements.
*   **Total Cost:** 250,000 tokens.

## The Meta-Game: The Creeping Blight
### 6.1. The Blight Mechanic
*   **Description:** A server-wide PvE event that forces cross-faction cooperation and makes all elemental tokens valuable.
*   **Spawn Frequency:** A new Blight appears every 8-12 hours (random interval).
*   **Spread Timer:** If not cleansed, the Blight spreads to an adjacent tile after 24 hours.
*   **Endgame Trigger:** If the number of Blighted tiles ever exceeds 27 (50% of the map), the game ends.

### 6.2. The Cleansing Mechanic
*   **Description:** Players must contribute a randomized recipe of elemental tokens to Altars on tiles adjacent to the Blight to cleanse it.
*   **Recipe Size:** Always requires 3 different elements.
*   **Recipe Amount:** The total token requirement is randomized between 75,000 and 150,000 tokens.

## Data Tracking for Rewards
The game must log the following for end-of-event NFT rewards:
*   Each player's Primary Element.
*   A list of all players who contributed to each successful Stronghold Ritual.
*   A list of all players who contributed to each successful Blight cleanse, and the amount they contributed.
*   A list of all players who contributed to each successful UNRAVEL action.

## Long-Term Vision: The Age of Creation
### 8.1. The "Divination" System & The Embeddable Game Standard
A new, optional action called "Divination" will be available to players, serving as a resource sink and an engagement loop. Clicking it will launch a compatible, third-party mini-game. A player's performance or completion of that mini-game will determine the quality and type of their reward back in "Song of Camelot," creating a rich, varied, and ever-expanding content loop.

### 8.2. The "Whispers of Creation" Loot Table & Narrative Impact
The rewards from the "Divination" system are not designed to give players a direct power advantage. Instead, they grant players a tangible stake in the next game, making them co-authors of the world's future. All rewards will be minted as NFTs to ensure true player ownership.
*   **Narrative Keys (Lore Fragments):** Consumable or collectible NFTs that grant the holder the ability to influence or unlock exclusive content in the subsequent game.
*   **Founding Sigils (Cosmetic & Status NFTs):** Purely honorific, non-power-based NFTs that serve as permanent badges of honor, signifying a player's achievements during the world's creation.
