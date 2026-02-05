const ft_list = document.getElementById('ft_list');
const cookieName = 'ft_list'; // ชื่อคุกกี้ที่บันทึก

window.onload = function() {
    loadTodoList();
};

function newTodo() {
    let todoText = prompt("Enter a new TO DO:");
    
    if (todoText && todoText.trim() !== "") {
        addTodoToDOM(todoText);
        saveTodoList(); // บันทึกทุกครั้งเปลี่ยนแปลง
    }
}
function addTodoToDOM(text) {
    let div = document.createElement('div');
    div.innerHTML = text; // ใส่ข้อความ

    div.addEventListener('click', function() {
        if (confirm("Do you want to remove this TO DO?")) {
            div.remove();   
            saveTodoList(); // บันทึกสถานะใหม่ลง Cookie
        }
    });
    // ใส่รายการใหม่ไปไว้ "บนสุด" 
    ft_list.prepend(div);
}

// ฟังก์ชันบันทึกข้อมูลลง Cookie
function saveTodoList() {
    let todos = [];
    let items = ft_list.children; // ดึงรายการทั้งหมดในกล่อง

    for (let i = 0; i < items.length; i++) {
        todos.push(items[i].innerHTML);
    }

    // แปลง Array เป็น JSON String เพื่อเก็บใน Cookie
    let jsonStr = JSON.stringify(todos);
    
    // ตั้งเวลาหมดอายุคุกกี้ (เช่น 7 วัน)
    let date = new Date();
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
    
    // เขียน Cookie
    document.cookie = `${cookieName}=${jsonStr}; expires=${date.toUTCString()}; path=/; SameSite=Strict`;
}

// ฟังก์ชันโหลดข้อมูลจาก Cookie
function loadTodoList() {
    let cookies = document.cookie.split(';'); // แยกคุกกี้แต่ละตัว
    
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim();
        // หาคุกกี้ชื่อ ft_list
        if (c.indexOf(cookieName + "=") === 0) {
            let val = c.substring((cookieName + "=").length, c.length);
            try {
                // แปลงกลับจาก JSON String เป็น Array
                let todos = JSON.parse(val);
                
                for (let j = todos.length - 1; j >= 0; j--) {
                    addTodoToDOM(todos[j]);
                }
            } catch (e) {
                console.log("Error parsing cookie");
            }
        }
    }
}
