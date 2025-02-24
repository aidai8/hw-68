

const ToDoList = () => {
    return (
        <div className="container">
            <h1>To Do List</h1>
            <form>
                <input
                    type="text"
                    placeholder="Add new task"
                />
                <button type="submit">Add</button>
            </form>

            <ul>
                <li>
                    <div>
                        <input type="checkbox"/>
                        <span>Task Title</span>
                    </div>
                    <button className="delete-button">Delete</button>
                </li>
            </ul>
        </div>
    );
};

export default ToDoList;