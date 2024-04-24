class Api {
  constructor(baseUrl, headers) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getUserInfo() {
    fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .catch((error) => console.error("Error", error));
  }
}

export const api = new Api("https://around.nomoreparties.co/v1/web_es_12/", {
  authorization: "fa25d0a0-1783-4d33-9dd9-ca8f33a53e6d",
  "Content-Type": "application/json",
});
