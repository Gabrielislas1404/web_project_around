export default class userInfo {
  constructor({ userName, userOccupation }) {
    this._userName = document.querySelector(userName);
    this._userOccupation = document.querySelector(userOccupation);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userOccupation: this._userOccupation.textContent,
    };
  }

  setUserInfo({ userName, userOccupation }) {
    this._userName.textContent = userName;
    this._userOccupation.textContent = userOccupation;
  }
}
