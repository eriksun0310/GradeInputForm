let hero = document.querySelector(".hero")
let slider = document.querySelector(".slider")
let animation = document.querySelector("section.animation-wrapper")

const  time_line = new TimelineMax();

/*
 * 1. parameter 1 是要控制的對象
 * 2. parameter 2 是 duration :動畫的時間
 * 3. parameter 3 是要控制的對象的 原始狀態
 * 4. parameter 4 是要控制的對象的 動畫結束後的狀態
 * 5. parameter 5 是要控制的對象的 動畫提早多久開始跑
*/

//  math圖片的動畫設定
time_line
// math 圖片高度 增加 0 -> 100
.fromTo(
    hero,
    1,
    { height: "0%" },
    { height: "100%", ease: Power2.easeInOut }
)
// math 圖片寬度 增加 80 -> 100
.fromTo(
    hero,
    1.2,
    { width: "80%" },
    { width: "100%", ease: Power2.easeInOut }
)
// slider 往左 ->  右滑
.fromTo(
    slider,
    1,
    { x:"-100%"},
    { x: "0%", ease:Power2.easeInOut},
    "-=1.2" // 跟hero 寬度變寬的時間是同時的
)
//讓animation 便透明使得 畫面出現
.fromTo(
    animation,
    0.3,
    { opacity: 1 },
    { opacity: 0 }
)

//因為animation 只是變透明而已,還是蓋一層在畫面上,所以會畫面導致不能點擊,要設置pointEvents
setTimeout(()=>{
    animation.style.pointerEvents = "none"
}, 2500)

//防止 Form 按下Enter 後 交出表單
window.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
    }
});

//Form 內部的button 交出表單
let allButtons = document.querySelectorAll("button");
allButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
    });
});

let allSelects = document.querySelectorAll("select"); // 靜態NodeList
// 選擇select 內的option 之後,要改變的顏色
allSelects.forEach((select) => {
    select.addEventListener("change", (e) => {
        setGPA();
        changeColor(e.target);
    });
});

//改變credits 也要改變GPA
let credits = document.querySelectorAll(".class-credits");
credits.forEach((credit) => {
    credit.addEventListener("change", () => {
        setGPA();
    });
});

// 改變select 的顏色
function changeColor(target) {
    let value = target.value;
    if (target.value === "A" || target.value === "A-") {
        target.style.backgroundColor = "lightgreen";
        target.style.color = "black";
    } else if (
        target.value === "B" ||
        target.value === "B-" ||
        target.value === "B+"
    ) {
        target.style.backgroundColor = "yellow";
        target.style.color = "black";
    } else if (
        target.value === "C" ||
        target.value === "C-" ||
        target.value === "C+"
    ) {
        target.style.backgroundColor = "orange";
        target.style.color = "black";
    } else if (
        target.value === "D" ||
        target.value === "D-" ||
        target.value === "D+"
    ) {
        target.style.backgroundColor = "red";
        target.style.color = "black";
    } else if (target.value === "F") {
        target.style.backgroundColor = "grey";
        target.style.color = "white";
    } else {
        target.style.backgroundColor = "white";
    }
}

// 成績轉換
function convertor(grade) {
    switch (grade) {
        case "A":
        return 4.0;
        case "A-":
        return 3.7;
        case "B+":
        return 3.4;
        case "B":
        return 3.0;
        case "B-":
        return 2.7;
        case "C+":
        return 2.4;
        case "C":
        return 2.0;
        case "C-":
        return 1.7;
        case "D+":
        return 1.4;
        case "D":
        return 1.0;
        case "D-":
        return 0.7;
        case "F":
        return 0.0;
        default:
        return 0;
    }
}

const setGPA = () => {
    let formLength = document.querySelectorAll("form").length;
    let credits = document.querySelectorAll(".class-credits");
    let select = document.querySelectorAll("select");
    let sum = 0; // 給分子用的
    let creditsSum = 0; //給分母用的
    for (let i = 0; i < credits.length; i++) {
        if (!isNaN(credits[i].valueAsNumber)) {
        creditsSum += credits[i].valueAsNumber;
        }
    }
    for (let i = 0; i < formLength; i++) {
        if (!isNaN(credits[i].valueAsNumber)) {
        sum += credits[i].valueAsNumber * convertor(select[i].value);
        }
    }

    let result;
    if (creditsSum === 0) {
        result = (0.0).toFixed(2);
    } else {
        result = (sum / creditsSum).toFixed(2);
    }
    document.getElementById("result-gpa").innerText = result;
};

//按下新增後的事件
let addButton = document.querySelector(".plus-btn");
addButton.addEventListener("click", () => {
    let newForm = document.createElement("form");
    let newDiv = document.createElement("div");
    newDiv.classList.add("grader"); // 加上class

    //製作五個小元素
    let newInput1 = document.createElement("input");
    newInput1.setAttribute("type", "text");
    newInput1.setAttribute("placeholder", "class category");
    newInput1.setAttribute("list", "opt");
    newInput1.classList.add("class-type");

    let newInput2 = document.createElement("input");
    newInput2.setAttribute("type", "text");
    newInput2.setAttribute("placeholder", "class number");
    newInput2.classList.add("class-number");

    let newInput3 = document.createElement("input");
    newInput3.setAttribute("type", "number");
    newInput3.setAttribute("placeholder", "credits");
    newInput3.setAttribute("max", "6");
    newInput3.setAttribute("min", "0");
    newInput3.classList.add("class-credits");
    newInput3.addEventListener("change", () => {
        setGPA();
    });

    // 製作新增的 select
    let newSelect = document.createElement("select");
    newSelect.classList.add("select");
    var opt1 = document.createElement("option");
    opt1.setAttribute("value", "");
    let textNode1 = document.createTextNode("");
    opt1.appendChild(textNode1);
    var opt2 = document.createElement("option");
    opt2.setAttribute("value", "A");
    let textNode2 = document.createTextNode("A");
    opt2.appendChild(textNode2);
    var opt3 = document.createElement("option");
    opt3.setAttribute("value", "A-");
    let textNode3 = document.createTextNode("A-");
    opt3.appendChild(textNode3);
    var opt4 = document.createElement("option");
    opt4.setAttribute("value", "B+");
    let textNode4 = document.createTextNode("B+");
    opt4.appendChild(textNode4);
    var opt5 = document.createElement("option");
    opt5.setAttribute("value", "B");
    let textNode5 = document.createTextNode("B");
    opt5.appendChild(textNode5);
    var opt6 = document.createElement("option");
    opt6.setAttribute("value", "B-");
    let textNode6 = document.createTextNode("B-");
    opt6.appendChild(textNode6);
    var opt7 = document.createElement("option");
    opt7.setAttribute("value", "C+");
    let textNode7 = document.createTextNode("C+");
    opt7.appendChild(textNode7);
    var opt8 = document.createElement("option");
    opt8.setAttribute("value", "C");
    let textNode8 = document.createTextNode("C");
    opt8.appendChild(textNode8);
    var opt9 = document.createElement("option");
    opt9.setAttribute("value", "C-");
    let textNode9 = document.createTextNode("C-");
    opt9.appendChild(textNode9);
    var opt10 = document.createElement("option");
    opt10.setAttribute("value", "D+");
    let textNode10 = document.createTextNode("D+");
    opt10.appendChild(textNode10);
    var opt11 = document.createElement("option");
    opt11.setAttribute("value", "D");
    let textNode11 = document.createTextNode("D");
    opt11.appendChild(textNode11);
    var opt12 = document.createElement("option");
    opt12.setAttribute("value", "D-");
    let textNode12 = document.createTextNode("D-");
    opt12.appendChild(textNode12);
    var opt13 = document.createElement("option");
    opt13.setAttribute("value", "F");
    let textNode13 = document.createTextNode("F");
    opt13.appendChild(textNode13);

    newSelect.appendChild(opt1);
    newSelect.appendChild(opt2);
    newSelect.appendChild(opt3);
    newSelect.appendChild(opt4);
    newSelect.appendChild(opt5);
    newSelect.appendChild(opt6);
    newSelect.appendChild(opt7);
    newSelect.appendChild(opt8);
    newSelect.appendChild(opt9);
    newSelect.appendChild(opt10);
    newSelect.appendChild(opt11);
    newSelect.appendChild(opt12);
    newSelect.appendChild(opt13);

    /*
    因為 allSelects 靜態NodeList,所以再新增後的select都不會有addEventListener的事件,
    所以要重新的加入事件監聽器
    */
    newSelect.addEventListener("change", (e) => {
        setGPA();
        changeColor(e.target);
    });

  //製作新增 垃圾桶
    let trashBtn = document.createElement("button");
    trashBtn.classList.add("trash-button");
    let newItag = document.createElement("i");
    newItag.classList.add("fas");
    newItag.classList.add("fa-trash");

    trashBtn.appendChild(newItag);
    trashBtn.addEventListener("click", (e) => {
        e.preventDefault();
        let from = e.target.parentElement.parentElement;
        from.style.animation = "scaleDown 0.5s ease forwards";
        //待 動畫結束後再去把 from remove()
        from.addEventListener("animationend", (e) => {
        e.target.remove();
        setGPA();
        });
    });

    newDiv.appendChild(newInput1);
    newDiv.appendChild(newInput2);
    newDiv.appendChild(newInput3);
    newDiv.appendChild(newSelect);
    newDiv.appendChild(trashBtn);
    newForm.appendChild(newDiv);

    document.querySelector(".all-inputs").appendChild(newForm);
    //設定新長出的form 的動畫
    newForm.style.animation = "scaleUp 0.5s ease forwards";
});

//按下trash btn 會做的事件(添加動畫＋刪除整個from)
let allTrash = document.querySelectorAll(".trash-button");
allTrash.forEach((trash) => {
    trash.addEventListener("click", (e) => {
        // 加上remove 動畫
        e.target.parentElement.parentElement.classList.add("remove");
    });
});
//待trash動畫結束後 才去做把 form remove()
allTrash.forEach((trash) => {
    let form = trash.parentElement.parentElement;
    form.addEventListener("transitionend", (e) => {
        e.target.remove();
        setGPA();
    });
});

//排序演算法
let descBtn = document.querySelector(".sort-descending");
let ascBtn = document.querySelector(".sort-ascending");

descBtn.addEventListener("click", () => {
  handleSorting("descending"); //由大到小
});

ascBtn.addEventListener("click", () => {
  handleSorting("ascending"); //由小到大
});

function handleSorting(direction) {
    let graders = document.querySelectorAll(".grader");
    let objectArray = [];

    for (let i = 0; i < graders.length; i++) {
        console.log(graders[i].children);
        let class_category = graders[i].children[0].value; //class_category
        let class_number = graders[i].children[1].value; //class_number
        let class_credits = graders[i].children[2].value; //class_credits
        let class_grade = graders[i].children[3].value; //class_grade =  select

        if (
        !(
            class_category === "" &&
            class_number === "" &&
            class_credits === "" &&
            class_grade === ""
        )
        ) {
        let class_object = {
            class_category,
            class_number,
            class_credits,
            class_grade,
        };
        objectArray.push(class_object);
        }
    }
  // 取得objectArray 後，就把成績string 轉換成數字
    for (let i = 0; i < objectArray.length; i++) {
        objectArray[i].class_grade_number = convertor(objectArray[i].class_grade);
    }
    objectArray = mergeSort(objectArray);
    if (direction === "descending") {
        //由大到小
        objectArray = objectArray.reverse();
    }

  //根據 objectArray的內容 來更新網頁
    let allInputs = document.querySelector(".all-inputs"); // nodeList靜態

    allInputs.innerHTML = "";

    for (let i = 0; i < objectArray.length; i++) {
        allInputs.innerHTML += `
            <form>
                <div class="grader">
                <input
                    type="text"
                    placeholder="class category"
                    class="class-type"
                    list="opt"
                    value=${objectArray[i].class_category}
                /><!--  --><input
                    type="text"
                    placeholder="class number"
                    class="class-number"
                    value=${objectArray[i].class_number}
                /><!--  --><input
                    type="number"
                    placeholder="credits"
                    class="class-credits"
                    max="6"
                    min="0"
                    value=${objectArray[i].class_credits}
                /><!--  --><select name="select" class="select">
                    <option value=""></option>
                    <option value="A">A</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="B-">B-</option>
                    <option value="C+">C+</option>
                    <option value="C">C</option>
                    <option value="C-">C-</option>
                    <option value="D+">D+</option>
                    <option value="D">D</option>
                    <option value="D-">D-</option>
                    <option value="F">F</option>
                </select><!--  --><button class="trash-button">
                    <i class="fas fa-trash"></i>
                </button>
                </div>
            </form>
            `;
    
    }

    // select 可直接用js更改
    //   allInputs 是 nodeList靜態 必須重選
    graders = document.querySelectorAll("div.grader"); 
    for(let i = 0 ; i < graders.length; i++){
        graders[i].children[3].value = objectArray[i].class_grade
    }

    //排序後的select 事件監聽
    let allSelects = document.querySelectorAll("select")
    allSelects.forEach(select =>{
        changeColor(select)
        select.addEventListener("change" , (e)=>{
            setGPA()
            changeColor(e.target)
        })
    })
    // 排序後的credits 事件監聽
    let allCredits = document.querySelectorAll(".class-credits")
    allCredits.forEach(credits =>{
        credits.addEventListener("change", ()=>{
            setGPA()
        })
    })

     // 排序後的 垃圾桶 事件監聽
    let allTrash= document.querySelectorAll(".trash-button")
    allTrash.forEach(trash=>{
        trash.addEventListener("click", (e) => {
            e.preventDefault();
            let from = e.target.parentElement.parentElement;
            from.style.animation = "scaleDown 0.5s ease forwards";
            //待 動畫結束後再去把 from remove()
            from.addEventListener("animationend", (e) => {
                e.target.remove();
                setGPA();
            });
        });
    })
    

}

function merge(a1, a2) {
    let result = [];
    let i = 0;
    let j = 0;

    while (i < a1.length && j < a2.length) {
        if (a1[i].class_grade_number > a2[j].class_grade_number) {
        result.push(a2[j]);
        j++;
        } else {
        result.push(a1[i]);
        i++;
        }
    }

    while (i < a1.length) {
        result.push(a1[i]);
        i++;
    }
    while (j < a2.length) {
        result.push(a2[j]);
        j++;
    }
    return result;
}

function mergeSort(arr) {
    if (arr.length === 0) {
        return;
    }
    if (arr.length === 1) {
        return arr;
    } else {
        //遞迴
        let middle = Math.floor(arr.length / 2);
        let left = arr.slice(0, middle);
        let right = arr.slice(middle, arr.length);
        return merge(mergeSort(left), mergeSort(right));
    }
}
