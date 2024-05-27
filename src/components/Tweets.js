import { useState } from "react";
import moment from 'moment';
moment().utcOffset(330).format()
import "../stylesheet/style.css";
import deleteLogo from '../images/delete.png';
import editLogo from '../images/edit.png';
import saveLogo from '../images/save.png';
import cancelLogo from '../images/cancel.png';
import '../stylesheet/tweets.css'

const Tweets = ({ tweets, shortAddress, account, deleteTweet, editTweet }) => {
  const [editMode, setEditMode] = useState(null);
  const [newContent, setNewContent] = useState("");

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


            {(editMode === tweet.id && tweet.author == account) ? (



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
            )


              : (


                <>
                  <div className="content">{tweet.content}</div>
                  <div className="date">{new moment(Number(tweet.timestamp) * 1000).toLocaleString().split(' GMT')[0]}</div>
                </>
              )}
          </div>
          {account === tweet.author && renderEditButtons(tweet)}
          {console.log(tweet)}
        </div>
      ))}
    </div>
  );
};

export default Tweets;
