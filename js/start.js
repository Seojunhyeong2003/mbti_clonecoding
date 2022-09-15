const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result")
const endPoint = 12;
//입력값을 저장할 배열 선언
const select = [];

function calResult(){

    var pointArray = [
        {name:'mouse', value:0,key:0},
        {name:'cow',value:0,key:1},
        {name: 'tiger', value:0,key:2},
        {name: 'rabbit', value:0,key:3},
        {name: 'dragon', value:0,key:4},
        {name: 'snake',value:0,key:5},
        {name: 'hourse', value:0,key:6},
        {name: 'sheep', value:0,key:7},
        {name: 'monkey', value:0,key:8},
        {name: 'chick', value:0,key:9},
        {name: 'dog', value:0,key:10},
        {name: 'pig', value:0,key:11},
    ]
    for(let i = 0; i < endPoint; i++){
        // 
        var target = qnaList[i].a[select[i]];

        for(let j = 0; j < target.type.length; j++){
            for(let k = 0; k < pointArray.length; k++){
                if(target.type[j] === pointArray[k].name){
                    pointArray[k].value += 1;
                }
            }
        }

    }

    var resultArray = pointArray.sort(function (a,b){
        if(a.value > b.value){
            return -1;
        }
        if(a.value < b.value){
            return 1;
        }
        return 0;
    });

    //7console.log(resultArray);
    let resultword = resultArray[0].key;
    return resultword;
}

function goResult(){
    //qna섹션을 끄고 result섹션을 열어야함
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    setTimeout(() =>{
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block";
        }, 450)})

        //console.log(select);
        calResult();
}

function addAnswer(answerText, qIdx, idx){
    var a = document.querySelector('.answerBox');
    //지정한 태그네임의 html요소를 반환
    var answer = document.createElement('button');
    answer.classList.add('answerList');
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');

    //answer라는 버튼이 a에 소속될 수 있도록.
    a.appendChild(answer);
    answer.innerHTML=answerText;

    answer.addEventListener("click", function(){
        var children = document.querySelectorAll('.answerList');
        for(let i = 0; i < children.length; i++){
            children[i].disabled = true;
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
            
        }
        setTimeout(() => {
            //사용자가 몇번째 질문에 대한 대답인지
            select[qIdx] = idx;
            for(let i = 0; i < children.length; i++){
                children[i].style.display = 'none';
            }
            goNext(++qIdx);
        }, 450)   
    }, false);
}

function goNext(qIdx){
    if(qIdx === endPoint){
        goResult();
        return;
    }
    
    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;

    //qnalist의 idx인덱스의 a개수만큼 반복
    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }
    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint)*(qIdx+1)+'%';
}

function begin(){
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    setTimeout(() =>{
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";
        }, 450)
        let qIdx = 0;
        goNext(qIdx);
    }, 450);

}