export class Todo {
  constructor(content, id) {
    Object.assign(this, { content, id });
    this.createTodo();
  }

  /* ----------------------------------------------------
   * Todoを削除する
   * ----------------------------------------------------*/
  deleteTodo(id) {
    const todo = this.getTargetTodo(id);
    todo.remove();
  }

  /* ----------------------------------------------------
   * Todoの編集を開始する
   * ----------------------------------------------------*/
  editStart(id) {
    const todo = this.getTargetTodo(id);

    // 既に編集ボタンが押されていたら処理を終了
    if (todo.querySelector("div")) return;

    // 編集用のinputタグと完了用のbuttonタグを生成
    const editInput = document.createElement("input");
    const editBtn = document.createElement("button");
    editBtn.textContent = "編集完了";
    editBtn.addEventListener("click", () =>
      this.editComplete(editInput.value, todo)
    );

    // inputとbuttonを囲むdivを生成してtodo(liタグ)に追加
    const div = document.createElement("div");
    div.appendChild(editInput);
    div.appendChild(editBtn);
    todo.appendChild(div);
  }

  /* ----------------------------------------------------
   * Todoの編集を終了する
   * ----------------------------------------------------*/
  editComplete(content, todo) {
    // テキストが入力されていなかったら何もしない
    if (content === "") return;
    
    // spanタグに新しいテキストを入れる
    const span = todo.querySelector("span");
    span.textContent = content;

    // 編集用のHTML要素を削除する
    const div = todo.querySelector("div");
    div.remove();
  }

  /* ----------------------------------------------------
   * Todoを作成する
   * ----------------------------------------------------*/
  createTodo() {
    // テキストを入れるためのspanタグを生成
    const span = document.createElement("span");
    span.textContent = this.content;

    // 編集用のbuttonタグを生成
    const editBtn = document.createElement("button");
    editBtn.textContent = "編集";
    editBtn.addEventListener("click", () => this.editStart(this.id));

    // 削除用のbuttonタグを生成
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "削除";
    deleteBtn.addEventListener("click", () => this.deleteTodo(this.id));

    // buttonとspanを入れるためのliタグを生成
    const li = document.createElement("li");
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    li.dataset.id = this.id;
    const ul = document.getElementById("ul");
    ul.appendChild(li);

    // Todo作成後にinputタグに入力されたテキストをクリアする
    const input = document.getElementById("input");
    input.value = "";
  }

  /* ----------------------------------------------------
   * 操作対象のTodo(liタグ)を取得する
   * ----------------------------------------------------*/
  getTargetTodo(id) {
    const ul = document.getElementById("ul");
    const todos = ul.children;
    for (let todo of todos) {
      if (Number(todo.dataset.id) === id) {
        return todo;
      }
    }
  }

  /* ----------------------------------------------------
   * ファクトリーメソッド
   * ----------------------------------------------------*/
  static of(content) {
    // 現在のliタグの数をidとして使用
    const id = document.getElementById("ul").childElementCount;

    // 既存のTodoのidを取得
    const dataId = [];
    for (let data of document.getElementById("ul").children) {
      dataId.push(Number(data.dataset.id));
    }

    // 既存のTodoのidと重複した場合、一番大きなidに1足した値を
    // 重複しなかったらそのままの値をidに使用してインスタンスを生成
    if (dataId.includes(id)) {
      const newId = Math.max(...dataId) + 1;
      new Todo(content, newId);
    } else {
      new Todo(content, id);
    }
  }
}
