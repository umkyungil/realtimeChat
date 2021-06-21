let socket = io.connect("http://localhost:4000");

var message = document.getElementById("message");
var button = document.getElementById("send");
var username = document.getElementById("username");

// 서버에서 돌아오는 브로드 케스팅 메세지를 보여줄곳
var output = document.getElementById("output");

// 버튼이 클릭 되었을때 이름과 메세지를 전송한다
button.addEventListener("click", function () {
  socket.emit("sendingMessage", {
    message: message.value,
    username: username.value,
  });
});

// 서버에서 화면으로 돌아오는 브로드케스트 메세지
// 브로드 케스트 메세지를 받을때 마다 이벤트가 발생한다
socket.on("broadcastMessage", function (data) {
  // 메세지를 추가 한다  
  output.innerHTML +=
    "<p><strong>" + data.username + ": </strong>" + data.message + "</p>";
});