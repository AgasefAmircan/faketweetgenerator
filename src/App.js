import React, { useState, useEffect, createRef } from "react";
import { Profile } from "./Profile";
import { useScreenshot, createFileName } from "use-react-screenshot";
import { language } from "./Language";
import {
  ReplyIcon,
  LikeIcon,
  ShareIcon,
  RetweetIcon,
  VerifiedIcon,
} from "./icons";
import "./assets/main.css";
function App() {
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [isVerified, setIsVerified] = useState(0);
  const [avatar, setAvatar] = useState();
  const [tweet, setTweet] = useState();
  const [retweets, setRetweets] = useState(0);
  const [quoteTweets, setQuoteTweets] = useState(0);
  const [likes, setLikes] = useState(0);
  const tweetRef = createRef(null);
  const downloadRef = createRef();
  const [lang, setLang] = useState("aze");
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0
  });
  const [langText, setLangText] = useState();
  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };
  const getImage = () =>takeScreenShot(tweetRef.current).then(download);
  ;


  const formatNumber = (num) => {
    if (num < 1000) {
      return num;
    }
    num /= 1000;
    num = String(num).split(".");
    return num[0] + (num[1] > 100 ? "," + num[1].slice(0, 1) + "B" : "B");
  };
  const avatarHandle = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      setAvatar(this.result);
    });
    reader.readAsDataURL(file);
  };
  function convertImgToBase64(url, callback, outputFormat) {
    var canvas = document.createElement("CANVAS");
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL(outputFormat || "image/png");
      callback.call(this, dataURL);
      // Clean up
      canvas = null;
    };
    img.src = url;
  }

  const fetchTwitterInfo = () => {
    fetch(
      `https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search?q=${username}`
    )
      .then((res) => res.json())
      .then((data) => {
        const twitter = data[0];

        convertImgToBase64(
          twitter.profile_image_url_https,
          function (base64Image) {
            setAvatar(base64Image);
          }
        );

        setName(twitter.name);
        setUsername(twitter.screen_name);
        setTweet(twitter.status.text);
        setRetweets(twitter.status.retweet_count);
        setLikes(twitter.status.favorite_count);
      });
  };
  useEffect(() => {
    setLangText(language[lang]);
  }, [lang]);

  useEffect(() => {
    if (image) {
      downloadRef.current.click();
    }
  }, [image]);
  return (
    <>
      <div className="tweet-settings">
        <h3>{langText?.settings}</h3>
        <ul>
          <li>
            <label>{langText?.name}</label>
            <input
              type="text"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li>
            <label>{langText?.username}</label>
            <input
              type="text"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </li>
          <li>
            <label>{langText?.tweet}</label>
            <textarea
              id="textarea"
              maxLength="290"
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
            />
          </li>
          <li>
            <label>{langText?.avatar}</label>
            <input type="file" className="input" onChange={avatarHandle} />
          </li>
          <li>
            <label>{langText?.retweet}</label>
            <input
              type="number"
              className="input"
              value={retweets}
              onChange={(e) => setRetweets(e.target.value)}
            />
          </li>
          <li>
            <label>{langText?.quotetweet}</label>
            <input
              type="number"
              className="input"
              value={quoteTweets}
              onChange={(e) => setQuoteTweets(e.target.value)}
            />
          </li>
          <li>
            <label>{langText?.likes}</label>
            <input
              type="number"
              className="input"
              value={likes}
              onChange={(e) => setLikes(e.target.value)}
            />
          </li>
          <li>
            <label>{langText?.verified}</label>
            <select
              onChange={(e) => setIsVerified(e.target.value)}
              defaultValue={isVerified}
            >
              <option value="1">{langText?.yes}</option>
              <option value="0">{langText?.no}</option>
            </select>
          </li>
          <button onClick={getImage}>{langText?.create}</button>
          <div className="download-url">
            {image && (
              <a ref={downloadRef} href={image} download="tweet.png">
                {langText?.down}
              </a>
            )}
          </div>
        </ul>
      </div>
      <div className="tweet-container">
        <div className="app-language">
          <span
            onClick={() => setLang("aze")}
            className={lang === "aze" && "active"}
          >
            Aze
          </span>
          <span
            onClick={() => setLang("eng")}
            className={lang === "eng" && "active"}
          >
            Eng
          </span>
        </div>
        <div className="fetch-info">
          <input
            type="text"
            value={username}
            placeholder={langText?.ftch}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={fetchTwitterInfo}>{langText?.receive}</button>
        </div>

        <div className="tweet">
          <div className="tweet-author">
            {(avatar && <img src={avatar} />) || <Profile />}
            <div>
              <div className="name">
                <span>{name || langText?.namesur}</span>
                {isVerified == 1 && <VerifiedIcon width="19" height="19" />}
              </div>
              <div className="username">@{username || langText?.user}</div>
            </div>
          </div>
          <div className="tweet-content">
            <p
              dangerouslySetInnerHTML={{
                __html: tweet || langText?.writingtweet,
              }}
            />
          </div>
          <div className="tweet-stats">
            <span>
              <b>{formatNumber(retweets)}</b> Retweet
            </span>
            <span>
              <b>{formatNumber(quoteTweets)}</b> Quote Tweetler
            </span>
            <span>
              <b>{formatNumber(likes)}</b> {langText?.likes}
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
