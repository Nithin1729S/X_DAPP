import { useState, useEffect } from "react";
import moment from 'moment';
moment().utcOffset(330).format()
import "../stylesheet/style.css";
import deleteLogo from '../images/delete.png';
import editLogo from '../images/edit.png';
import saveLogo from '../images/save.png';
import cancelLogo from '../images/cancel.png';
import '../stylesheet/tweets.css'
import '@fortawesome/fontawesome-free/css/all.min.css';


const Tweets = ({ tweets, shortAddress, account, deleteTweet, editTweet, likeTweet, unlikeTweet }) => {
  const [editMode, setEditMode] = useState(null);
  const [newContent, setNewContent] = useState("");
  const [likedTweets, setLikedTweets] = useState({});

  useEffect(() => {
    const initialLikes = tweets.reduce((acc, tweet) => {
      acc[tweet.id] = false; // Initialize all tweets as not liked
      return acc;
    }, {});
    setLikedTweets(initialLikes);
  }, [tweets]);

  const handleEdit = (tweetId, content, author) => {
    if (author === account) {
      setEditMode(tweetId);
      setNewContent(content);
    }
  };

  const handleSaveEdit = (tweetId, author) => {
    if (author === account) {
      editTweet(tweetId, newContent);
      setEditMode(null);
      setNewContent("");
    }
  };

  const handleLikeToggle = async (author, tweetId) => {
    const isLiked = likedTweets[tweetId];
    try {
      if (isLiked) {
        await unlikeTweet(author, tweetId);
      } else {
        await likeTweet(author, tweetId);
      }
      setLikedTweets((prev) => ({
        ...prev,
        [tweetId]: !isLiked,
      }));
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const renderEditButtons = (tweet) => {
    if (editMode === tweet.id) {
      return null; // Don't render edit and delete buttons during editing
    } else {
      return (
        <div className="tweet-actions">
          <button onClick={() => handleEdit(tweet.id, tweet.content, tweet.author)}>
            <img src={editLogo} alt="Edit" />
          </button>
          <button onClick={() => deleteTweet(tweet.id)}>
            <img src={deleteLogo} alt="Delete" />
          </button>
        </div>
      );
    }
  };

  return (
    <div id="tweetsContainer">
      {tweets.map((tweet) => (
        <div key={tweet.id} className="tweet">
          <img
            className="user-icon"
            src={`https://api.multiavatar.com/${tweet.author}.svg`}
            alt="User Icon"
          />
          <div className="tweet-inner">
            <div className="author">{tweet.displayName}</div>
            {(editMode === tweet.id && tweet.author === account) ? (
              <div className="editArea">
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(tweet.id, tweet.author)}>
                  <img src={saveLogo} alt="Save" />
                </button>
                <button onClick={() => setEditMode(null)}>
                  <img src={cancelLogo} alt="Cancel" />
                </button>
              </div>
            ) : (
              <>
                <div className="content">{tweet.content}</div>
                <div className="like-section">
                  <button
                    className={`like-button ${likedTweets[tweet.id] ? 'liked' : ''}`}
                    onClick={() => handleLikeToggle(tweet.author, tweet.id)}
                  >
                    {/* <img src={editLogo}></img> */}
                    <i className={`fa-heart ${likedTweets[tweet.id] ? 'fas' : 'far'}`}></i>
                    <span className="likes-count">{(tweet.likes).toLocaleString()}</span>
                  </button>
                </div>
                <div className="date">{new moment(Number(tweet.timestamp) * 1000).toLocaleString().split(' GMT')[0]}</div>
              </>
            )}
          </div>
          {account === tweet.author && renderEditButtons(tweet)}

        </div>
      ))}
    </div>
  );
};

export default Tweets;

