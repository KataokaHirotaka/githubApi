class GitHubApi {
  constructor() {
    this.textInput = document.getElementById('searchId');
    this.searchBtn = document.getElementById('searchBtn');
    this.result = document.getElementById('result');
  }


  init() {
    this.clickEvents();
  }
  clickEvents() {
    this.searchBtn.addEventListener('click', () => {
      this.main();
    });
  }

  async main() {
    try {
      while(this.result.firstChild) this.result.removeChild(result.firstChild);
      const searchId = this.getSearchId();
      const data = await this.fetchSearchData(searchId);
      // for (let i = 0; i < 10; i++) {
      //   this.createView(data)
      // }
      console.log(data);
      // console.log(data.url);
    } catch {
      throw new Error('エラーだよ');
    }
  }

  createView(data) {
    console.log(data);
    const node = document.createElement('div');
    node.setAttribute('class', 'column');
    const txt = `

    `
  }

  fetchSearchData(searchId) {
    return fetch(
      `https://api.github.com/search/repositories?q=${searchId}+in:name&sort=stars&order=desc`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        else throw new Error(`${res.status}: ${res.statusText}`)
      })
      .catch(error => {
        throw new Error(error);
      });
  }
  getSearchId() {
    const val = this.textInput.value;
    return val;
  }
}

const gitHubApi = new GitHubApi();
gitHubApi.init();