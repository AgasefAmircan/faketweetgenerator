import React,{useState} from 'react'
import { ReplyIcon,LikeIcon,ShareIcon,RetweetIcon,VerifiedIcon } from './icons';
import './assets/main.css'
function App() {

  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [isVerified, setIsVerified] = useState(0);
  const [tweet, setTweet] = useState();
  const [retweets, setRetweets] = useState(0);
  const [quoteTweets, setQuoteTweets] = useState(0);
  const [likes, setLikes] = useState(0);
  return (
    <>
      <div className="tweet-settings">
        <h3>Tweet ayarları</h3>
        <ul>
          <li>
            <label>Ad Soyad</label>
            <input
              type="text"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li>
            <label>İstifadəçi adı</label>
            <input
              type="text"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </li>
          <li>
            <label>Tweet</label>
            <textarea
              class="textarea"
              maxLength="290"
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
            />
          </li>
          <li>
            <label>Profil şəkli</label>
            <input type="file" className="input" />
          </li>
          <li>
            <label>Retweet</label>
            <input
              type="number"
              className="input"
              value={retweets}
              onChange={(e) => setRetweets(e.target.value)}
            />
          </li>
          <li>
            <label>Alıntı Tweetler</label>
            <input
              type="number"
              className="input"
              value={quoteTweets}
              onChange={(e) => setQuoteTweets(e.target.value)}
            />
          </li>
          <li>
            <label>Bəyəni</label>
            <input
              type="number"
              className="input"
              value={likes}
              onChange={(e) => setLikes(e.target.value)}
            />
          </li>
          <li>
            <label>Doğrulanmış Hesab</label>
            <select
              onChange={(e) => setIsVerified(e.target.value)}
              defaultValue={isVerified}
            >
              <option value="1">Bəli</option>
              <option value="0">Xeyr</option>
            </select>
          </li>
          <button>Yarat</button>
          <div className="download-url">
                Tweeti yüklə
          </div>
        </ul>
      </div>
      <div className="tweet-container">
        <div className="app-language">
          <span>
            Aze
          </span>
          <span >
            Eng
          </span>
        </div>
        <div className="fetch-info">
          <input
            type="text"
            value={username}
            placeholder="Twitter istifadəçi adını yazın"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button>Məlamatları al</button>
        </div>

        <div className="tweet">
          <div className="tweet-author">
            <div>
              <div className="name">
                <span>{name || "Ad Soyad"}</span>
              </div>
              <div className="username">@{username || "istifadəçi adı"}</div>
            </div>
          </div>
          <div className="tweet-content">
            <p>{tweet || "Bura yazmaq istədiyiniz tweeti yazın"}</p>
          </div>
          <div className="tweet-stats">
            <span>
              <b>1</b> Retweet
            </span>
            <span>
              <b></b> Quote Tweetler
            </span>
            <span>
              <b></b> Bəyəni
            </span>
          </div>
          <div className="tweet-actions">
            <span>
              <ReplyIcon />
            </span>
            <span>
              <RetweetIcon />
            </span>
            <span>
              <LikeIcon />
            </span>
            <span>
              <ShareIcon />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
