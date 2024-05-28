import { useEffect, useState } from "react";
import '../stylesheet/addTweet.css'

const AddTweet = ({ contract, account, getTweets }) => {
  const [newTweet, setNewTweet] = useState("");
  const [loading, setLoading] = useState(false);

  async function createTweet(tweet) {
    if (!contract || !account) {
      console.error(
        "Web3 or contract not initialized or account not connected."
      );
      return;
    }
    try {
      setLoading(true);
      const tx=await contract.methods.createTweet(tweet).send({ from: account });
      // await tx.wait();
      getTweets();
    } catch (error) {
      console.error("User rejected request:", error);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  }

  return (
    <form
      id="tweetForm"
      onSubmit={(e) => {
        e.preventDefault();
        createTweet(newTweet);
      }}
    >
      <textarea
        id="tweetContent"
        rows="4"
        placeholder="What's happening?"
        value={newTweet}
        onChange={(e) => setNewTweet(e.target.value)}
        required
      />
      <br />
      <button id="tweetSubmitBtn" style={{ marginLeft:'220px', background:'#eb57ad'}} disabled={loading} type="submit">
  {loading ? <div className="spinner"></div> : <>Tweet</>}
</button>

    </form>
  );
};

export default AddTweet;
