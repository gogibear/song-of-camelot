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
