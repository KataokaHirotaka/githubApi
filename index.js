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
      const total_count = data.total_count;
      const muscleCondition = searchId.match(/きんにく|なかやま|筋肉|きんに/g)
      if (total_count > 0) {
        this.createTableHeader();
        for (let i = 0; i < 20; i++) {
          this.createView(data.items[i], i);
        }
      } else if (muscleCondition) {
        this.createMuscleView();
      } else {
        this.createNoDataView();
      }
    } catch(e) {
      console.error(e);
    }
  }

  createView(data, index) {
    // 結果を載せた見た目を作成
    const url = data.html_url;
    const star = data.stargazers_count;
    const rank = index + 1;
    const name = data.name;
    const table = document.querySelector('#result table');

    const node = document.createElement('tr');
    const tableEl = this.escapeHTML`
      <td>${rank}</td>
      <td>
        <a href="${url}" target="blank">${name}</a>
      </td>
      <td>${star}</td>
    `;
    node.innerHTML += tableEl;
    table.append(node);
  }

  createTableHeader() {
    // ランキングを表示するテーブルのヘッダーを作成
    const table = this.escapeHTML`
      <table>
        <thead>
          <tr>
            <th>順位</th>
            <th>リポジトリ</th>
            <th>スター数</th>
          </tr>
        </thead>
      </table>
    `
    this.result.innerHTML += table;
  }

  createNoDataView() {
    const node = this.escapeHTML`
      <div class="no_result">
        <p>
          データを取得できませんでした。ﾟ(ﾟ´Д｀ﾟ)ﾟ。 [悲]<br>
          正しい言語を入力してね─=≡Σ((( つ•̀ω•́)つ
        </p>
      </div>
    `
    this.result.innerHTML += node;
  }

  createMuscleView() {
    const node = this.escapeHTML`
      <div>
        <img src="./img/nakayama-kinnikun.jpg">
      </div>
    `
    this.result.innerHTML += node;
  }

  escapeHTML(strings, ...values) {
    return strings.reduce((result, str, i) => {
      console.log(i);
      const val = values[i - 1];
      if (typeof value === 'string') {
        console.log(result + this.escapeSpecialChars(val) + str);
        return result + this.escapeSpecialChars(val) + str;
      } else {
        return result + String(val) + str;
      }
    })
  }

  escapeSpecialChars(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot')
      .replace(/'/g, '&#039;')
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