$(document).ready(function() {
    const cookieName = 'ft_list';
    loadTodoList();
    $('#newBtn').click(function() {
        let todoText = prompt("Enter a new TO DO:");
        if (todoText && todoText.trim() !== "") {
            addTodoToDOM(todoText);
            saveTodoList();
        }
    });

    function addTodoToDOM(text) {

        let $div = $('<div>').text(text).click(function() {
            if (confirm("Do you want to remove this TO DO?")) {
                $(this).remove(); 
                saveTodoList();
            }
        });
        $('#ft_list').prepend($div);
    }

    function saveTodoList() {
        let todos = [];
        $('#ft_list').children().each(function() {
            todos.push($(this).text());
        });

        let jsonStr = JSON.stringify(todos);
        let date = new Date();
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
        document.cookie = `${cookieName}=${jsonStr}; expires=${date.toUTCString()}; path=/; SameSite=Strict`;
    }

    function loadTodoList() {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let c = cookies[i].trim();
            if (c.indexOf(cookieName + "=") === 0) {
                let val = c.substring((cookieName + "=").length, c.length);
                try {
                    let todos = JSON.parse(val);

                        addTodoToDOM(todos[j]);
                    }
                } catch (e) { console.log("Error parsing cookie"); }
            }
        }
    }
});
