import { useState } from "react";
import "../stylesheet/style.css";
import deleteLogo from '../images/delete.png';
import editLogo from '../images/edit.png';
import saveLogo from '../images/save.png';
import cancelLogo from '../images/cancel.png';

const Tweets = ({ tweets, shortAddress, account, deleteTweet, editTweet }) => {
  const [editMode, setEditMode] = useState(null);
  const [newContent, setNewContent] = useState("");

  const handleEdit = (tweetId, content) => {
    setEditMode(tweetId);
    setNewContent(content);
  };

  const handleSaveEdit = (tweetId) => {
    editTweet(tweetId, newContent);
    setEditMode(null);
    setNewContent("");
  };

  const renderEditButtons = (tweet) => {
    if (editMode === tweet.id) {
      return null; // Don't render edit and delete buttons during editing
    } else {
      return (
        <div className="tweet-actions">
          <button onClick={() => handleEdit(tweet.id, tweet.content)}>
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
      {tweets.map((tweet, index) => (
        <div key={index} className="tweet">
          <img
            className="user-icon"
            src={`https://api.multiavatar.com/${tweet.author}.svg`}
            alt="User Icon"
          />
          <div className="tweet-inner">
            <div className="author">{tweet.displayName}</div>
            {editMode === tweet.id ? (
              <div className="editArea">
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(tweet.id)}>
                <img src={saveLogo} alt="Save" />
                </button>
                <button onClick={() => setEditMode(null)}>
                <img src={cancelLogo} alt="Cancel" />
                </button>
              </div>
            ) : (
              <div className="content">{tweet.content}</div>
            )}
          </div>
          {account === tweet.author && renderEditButtons(tweet)}
        </div>
      ))}
    </div>
  );
};

export default Tweets;
