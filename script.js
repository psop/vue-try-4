import {createApp, ref, computed, onMounted} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.1/vue.esm-browser.min.js'

const app = createApp({
    setup() {
        const todo = ref('')
        const todoList = ref([])
        const visibility = ref('all')

        function add() {
            todoList.value.push({
                id: todoList.value.length + 1,
                text: todo.value,
                completed: false, 
            })
            todo.value = ''
            updateLS()
        }

        function remove(todo) {
            const index = todoList.value.findIndex(obj => obj.id === todo.id)
            todoList.value.splice(index, 1)
            updateLS()
        }
        
        function clear() {
            if(window.confirm('確定要全部刪除？')) {
                todoList.value = []
            }
            updateLS()
        }

        function updateLS() {
            localStorage.setItem("todos", JSON.stringify(todoList.value))
        }

        onMounted(() => todoList.value = JSON.parse(localStorage.getItem("todos")) || []) 

        const filterTodos = computed(() => {
            switch (visibility.value) {
                case 'active':
                    return todoList.filter(todo => !todo.completed)
                case 'complete':
                    return todoList.filter(todo => todo.completed)
                default:
                    return todoList
            }
        })
        
        return {
            todo,
            todoList,
            status,
            add,
            remove,
            filterTodos,
            clear,
        }
    }
}).mount('#app')