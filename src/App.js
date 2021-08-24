import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";
import { Component } from "react";
import "./App.css";
import {v4 as uuidv4} from 'uuid';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: null,
      filter: {
        name: '',
        status: -1
      },
      searchText: '',
      sort: ''
    };
  }

  componentDidMount(){
      if(localStorage && localStorage.getItem('tasks')){
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        this.setState({tasks: tasks})
      }       
  }

  onGenerateData = () => {
    const newTaskList = [
      { id: this.generateID(), name: "Học lập trình ReactJS", status: true },
      { id: this.generateID(), name: "Đi bơi", status: true },
      { id: this.generateID(), name: "Học lập trình Redux", status: false },
    ];
      
    this.setState({
      tasks: newTaskList,
    });

    localStorage.setItem('tasks', JSON.stringify(newTaskList));    
  };

  onToggleForm = () => {
    if(this.state.isDisplayForm && this.state.taskEditing){
      this.setState({
        taskEditing: null
      })
    }else{
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditing: null
      })  
    }
  }
    
  onCloseForm = () => {
      this.setState({
          isDisplayForm: false,
          taskEditing: null
      })
  }

  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    })
  }

  generateID(){
      return uuidv4();
  }

  onSubmit = (data) => {
    let { tasks } = this.state;
    if(data.id === ''){
      data.id = this.generateID();
      tasks.push(data);
    }else{
      let index = this.findIndex(data.id);
      tasks[index] = data;
    }
       
    this.setState({
      tasks: tasks,
      taskEditing: null
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  onDelete = (id) => {
    let { tasks } = this.state;
    let newTasks = tasks.filter((item) => item.id !== id)

    this.setState({
      tasks: newTasks
    })

    localStorage.setItem('tasks', JSON.stringify(newTasks));
    this.onCloseForm();
  }

  onChangeStatus = (id) => {
    let {tasks} = this.state;
    let index = this.findIndex(id);

    tasks[index].status = !tasks[index].status;

    this.setState({
      tasks: tasks
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onUpdateTask = (id) => {
    // id send from TaskItem component
    let {tasks} = this.state;
    let taskEditing = tasks.find(task => task.id === id)
    this.setState({
      taskEditing: taskEditing
    })
    this.onShowForm();
  }

  findIndex = (id) => {
    let {tasks} = this.state;
    let result = -1;
    tasks.forEach((task, index) => {
      if(task.id === id){
        return result = index;
      }
    })
    return result;
  }

  onChange = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10)
    this.setState({
      filter: {
        name:  filterName.toLowerCase(),
        status: filterStatus
      }
    })
  }

  onSearch = (searchText) => {
      this.setState({
        searchText
      })
  }

  onSort = (sort) => {
    this.setState({
      sort
    })
  }

  render() {
    let { tasks, isDisplayForm, taskEditing, filter, searchText, sort } = this.state;
    const { sortBy, sortValue} = sort;
    let elmTaskForm = isDisplayForm ? <TaskForm task={taskEditing} onCloseForm={this.onCloseForm} onSubmit={this.onSubmit}/> : '';
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1;
        })
      }
      tasks = tasks.filter((task) => {
        if (filter.status === -1) {
          return task;
        } else {
          return task.status === (filter.status === 1 ? true : false);
        }
      })
    }

    if (searchText) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
      })
    }

    if(sort.sortBy === 'name'){
      tasks.sort((a,b) => {
        if(a.name > b.name) return sortValue;
        else if(a.name < b.name) return -sortValue;
        else return 0;
      })
    }

    if(sort.sortBy === 'status'){
      tasks.sort((a,b) => {
        if(a.status > b.status) return -sortValue;
        else if(a.status < b.status) return sortValue;
        else return 0;
      }) 
    }

    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ''}>
            {/*Task Form */}
            {elmTaskForm}
          </div>
          <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
              <span className="fa fa-plus mr-5"></span>Thêm Công Việc
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.onGenerateData}
            >
              <span className="fa fa-plus mr-5"></span>Generate Task
            </button>
            {/* Search and Sort */}
            <Control onSearch={this.onSearch} onSort={this.onSort}/>
            {/* Task List */}
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList tasks={tasks} onDelete={this.onDelete}  onUpdateTask={this.onUpdateTask} onChangeStatus={this.onChangeStatus} onChange={this.onChange}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
