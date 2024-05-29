# X dApp

X Dapp - A Decentralized X ( formerly twitter )  Application compiled in Remix IDE , deployed on Ethereum BlockChain (Sepolia TestNet) , Frontend Designed using ReactJS. Basic CRUD functionality implemented.

## Live Demo

Visit the live version of the X dApp [here](https://x-nine-gold.vercel.app).

## Demo of the Project
Experience the functionality of dApp by watching the demo





https://github.com/Nithin1729S/X_dApp/assets/78496667/e562e6a3-8da6-42ab-b566-7075291d6267








Alternatively, you can also view the demo on [YouTube](https://youtu.be/AS-ggfHOr1g).

## About the Project

### Smart Contracts
Two Smart Contracts are deployed on the Sepolia test network:
- **Main Contract:** `0xe35C15863a1f76f130aCb8bD252058F03D29a469`
- **User Contract:** `0x3De16Ae31a133CaefDE4ca227f493BF02c1Eac66`

- The **Main Contract** handles the core functions of the X Application.
- The **User Contract** manages user profiles.
- Both contracts inherit ownership features from `Ownable.sol` by OpenZeppelin, ensuring secure and controlled access.
- The Main and User contracts can communicate with each other to coordinate user and application functions.

### Development Environment
- The smart contracts are compiled using Remix IDE.
- The application is built with a React frontend, using ABI to facilitate communication with the deployed smart contracts.

### Features
- **User Profile:** A user can create a profile, provided they have a MetaMask wallet with some Sepolia ETH.
- **Tweets:** Users can add, edit, and delete their tweets.
- **Timestamps and like count:** Each tweet includes a timestamp and like count.
- Basic CRUD functionality is implemented.


## Instructions to Run the Project

To get started with the X dApp, please follow the steps below:

1. **Set Up Metamask Wallet:**
    - Install the Metamask extension in your preferred web browser.
    - Create a new wallet or import an existing wallet.
    - Collect some Sepolia ETH using available free faucets.

2. **Clone the GitHub Repository:**
    - Open your terminal.
    - Execute the following command to clone the repository:
      ```bash
      git clone https://github.com/Nithin1729S/X_dApp.git
      ```

3. **Install Project Dependencies:**
    - Navigate to the project's main directory:
      ```bash
      cd X_dApp
      ```
    - Install the necessary dependencies using npm:
      ```bash
      npm install
      ```

4. **Start the React Application:**
    - Run the following command to start the React application:
      ```bash
      npm start
      ```

5. **Connect to Your Metamask Wallet:**
    - Open the application in your web browser.
    - Use the Metamask extension to connect your wallet.

6. **Create Your Account and Add Passwords:**
    - Once connected, your account will be created automatically.
    - You can now start tweeting.

