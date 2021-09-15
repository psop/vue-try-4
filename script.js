import {createApp, ref, computed} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.1/vue.esm-browser.min.js'

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
        }

        function remove(todo) {
            const index = todoList.value.findIndex(obj => obj.id === todo.id)
            todoList.value.splice(index, 1)
        }

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

        function clear() {
            if(window.confirm('確定要全部刪除？')) {
                todoList.value = []
            }
        }
        
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