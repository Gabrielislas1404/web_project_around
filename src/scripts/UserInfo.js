export default class userInfo {
  constructor({ userNameSelector, occupationSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userOccupation = document.querySelector(occupationSelector);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userOccupation: this._userOccupation.textContent,
    };
  }

  setUserInfo({ name, about }) {
    this._userName.textContent = name;
    this._userOccupation.textContent = about;
  }
}

/* setUserInfo({ userName, userOccupation }) {
    this._userName.textContent = userName;
    this._userOccupation.textContent = userOccupation;
  }
} */
