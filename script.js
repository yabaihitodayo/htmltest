// メンバーと子供のリスト
let members = [];
let children = [];
let frameCount = 4; // 初期の枠の数

// 初期枠を生成
const resultContainer = document.getElementById("result-container");
initializeFrames();

// メンバー追加ボタンの動作
document.getElementById("add-member").addEventListener("click", function () {
    const memberName = document.getElementById("member-name").value.trim();
    if (memberName) {
        members.push(memberName);
        updateList("member-list", members, removeMember);
        document.getElementById("member-name").value = ""; // 入力欄をクリア
    } else {
        alert("メンバー名を入力してください！");
    }
});

// 子供追加ボタンの動作
document.getElementById("add-child").addEventListener("click", function () {
    const childName = document.getElementById("child-name").value.trim();
    if (childName) {
        children.push(childName);
        updateList("child-list", children, removeChild);
        document.getElementById("child-name").value = ""; // 入力欄をクリア
    } else {
        alert("子供名を入力してください！");
    }
});

// 枠を追加するボタンの動作
document.getElementById("add-frame").addEventListener("click", function () {
    frameCount++;
    addFrame(frameCount);
});

// 枠を削除するボタンの動作
document.getElementById("remove-frame").addEventListener("click", function () {
    if (frameCount > 1) {
        removeFrame(frameCount);
        frameCount--;
    } else {
        alert("これ以上枠を削除できません！");
    }
});

// 組み合わせ生成ボタンの動作
document.getElementById("generate").addEventListener("click", function () {
    if (members.length === 0 || children.length === 0) {
        alert("メンバーと子供の両方を少なくとも1つずつ追加してください！");
        return;
    }

    // シャッフル関数
    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    // メンバーと子供をシャッフル
    const shuffledMembers = shuffle([...members]);
    const shuffledChildren = shuffle([...children]);

    // 結果を生成（現在の枠の数に合わせる）
    for (let i = 0; i < frameCount; i++) {
        const member = shuffledMembers[i % shuffledMembers.length];
        const child = shuffledChildren[i % shuffledChildren.length];
        document.getElementById(`result${i + 1}`).textContent = `${member}先生と${child}さん`;
    }
});

// リストを更新する関数（削除ボタン付き）
function updateList(listId, items, removeCallback) {
    const listElement = document.getElementById(listId);
    listElement.innerHTML = ""; // 現在のリストをクリア
    items.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item;
        const removeButton = document.createElement("button");
        removeButton.textContent = "削除";
        removeButton.addEventListener("click", () => removeCallback(index));
        li.appendChild(removeButton);
        listElement.appendChild(li);
    });
}

// メンバー削除の関数
function removeMember(index) {
    members.splice(index, 1);
    updateList("member-list", members, removeMember);
}

// 子供削除の関数
function removeChild(index) {
    children.splice(index, 1);
    updateList("child-list", children, removeChild);
}

// 初期枠を生成する関数
function initializeFrames() {
    for (let i = 1; i <= frameCount; i++) {
        addFrame(i);
    }
}

// 枠を追加する関数
function addFrame(frameNumber) {
    const frame = document.createElement("div");
    frame.id = `result${frameNumber}`;
    frame.className = "result";
    frame.textContent = "---";
    resultContainer.appendChild(frame);
}

// 枠を削除する関数
function removeFrame(frameNumber) {
    const frame = document.getElementById(`result${frameNumber}`);
    if (frame) {
        resultContainer.removeChild(frame);
    }
}