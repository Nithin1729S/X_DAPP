import "./styles.css";
import { useEffect, useState } from "react";

import Tweets from "./components/Tweets";
import AddTweet from "./components/AddTweet";
import Connect from "./components/Connect";
import ProfileCreation from "./components/ProfileCreation";
import logo from "./images/logo.png";

export default function App() {
  const [account, setAccount] = useState(null);
  const [profileExists, setProfileExists] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [profileContract, setProfileContract] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getTweets() {
    if (!web3 || !contract) {
      console.error("Web3 or contract not initialized.");
      return;
    }

    const tempTweets = await contract.methods.getAllTweets().call();
    const tweets = [...tempTweets];
    tweets.sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
    setTweets(tweets);
    setLoading(false);
  }

  async function checkProfile() {
    const userProfile = await getProfile(account);
    setProfileExists(userProfile);
  }

  async function getProfile() {
    if (!web3 || !profileContract || !account) {
      console.error(
        "Web3 or profileContract not initialized or account not connected."
      );
      return;
    }

    const profile = await profileContract.methods.getProfile(account).call();
    setLoading(false);
    return profile.displayName;
  }

  useEffect(() => {
    if (contract && account) {
      if (profileExists) {
        getTweets();
      } else {
        checkProfile();
      }
    }
  }, [contract, account, profileExists]);

  async function deleteTweet(id) {
    if (!contract || !account) {
      console.error("Web3 or contract not initialized or account not connected.");
      return;
    }

    try {
      await contract.methods.deleteTweet(id).send({ from: account });
      getTweets();
    } catch (error) {
      console.error("Failed to delete tweet:", error);
    }
  }

  async function editTweet(id, newContent) {
    if (!contract || !account) {
      console.error("Web3 or contract not initialized or account not connected.");
      return;
    }

    try {
      await contract.methods.editTweet(id, newContent).send({ from: account });
      getTweets();
    } catch (error) {
      console.error("Failed to edit tweet:", error);
    }
  }

  async function likeTweet(author, id) {
    if (!contract || !account) {
      console.error("Web3 or contract not initialized or account not connected.");
      return;
    }
  
    try {
      await contract.methods.likeTweet(author, id).send({ from: account });
      getTweets();
    } catch (error) {
      console.error("Failed to like tweet:", error);
    }
  }

  async function unlikeTweet(author, id) {
    if (!contract || !account) {
      console.error("Web3 or contract not initialized or account not connected.");
      return;
    }
  
    try {
      await contract.methods.unlikeTweet(author, id).send({ from: account });
      getTweets();
    } catch (error) {
      console.error("Failed to unlike tweet:", error);
    }
  }
  

  function shortAddress(address, startLength = 6, endLength = 4) {
    if (address === account && profileExists) {
      return profileExists;
    } else if (address) {
      return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
    }
  }

  return (
    <div className="container">
      <img id="logo" src={logo} alt="Logo" />
      <Connect
        web3={web3}
        setWeb3={setWeb3}
        account={account}
        setAccount={setAccount}
        setContract={setContract}
        shortAddress={shortAddress}
        setProfileContract={setProfileContract}
      />
      {!loading && account && profileExists ? (
        <>
          <AddTweet
            contract={contract}
            account={account}
            getTweets={getTweets}
          />
          <Tweets
            tweets={tweets}
            shortAddress={shortAddress}
            account={account}
            deleteTweet={deleteTweet}
            editTweet={editTweet}
            likeTweet={likeTweet}
            unlikeTweet={unlikeTweet}
          />
        </>
      ) : (
        account &&
        !loading && (
          <ProfileCreation
            account={account}
            profileContract={profileContract}
            checkProfile={checkProfile}
          />
        )
      )}
    </div>
  );
}
