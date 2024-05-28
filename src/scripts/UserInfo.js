export default class userInfo {
  constructor({ userNameSelector, occupationSelector }, userId) {
    this._userName = document.querySelector(userNameSelector);
    this._userOccupation = document.querySelector(occupationSelector);
    this._userId;
  }

  setUserId(id) {
    this._userId = id;
  }

  getUserId() {
    return this._userId;
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userOccupation: this._userOccupation.textContent,
    };
  }

  setUserInfo({ name, about }) {
    console.log(this.userName);
    this._userName.textContent = name;
    this._userOccupation.textContent = about;
  }
}
