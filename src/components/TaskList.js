import { Component } from "react";
import TaskItem from './TaskItem';

class TaskList extends Component{
    constructor(props){
        super(props);
        this.state = {
            tasks: props.tasks,
            filterName: '',
            filterStatus: -1 //all -1, active: 1, deactive: 0
        }
    }

    onChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.props.onChange(
            name === 'filterName' ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus
        )
        this.setState({
            [name] : value
        })
    }

    render(){
        let { tasks } = this.props;
        const elmTask = tasks.map((task, index) => {
            return <TaskItem task={task} index={index} key={task.id} onDelete={this.props.onDelete} onChangeStatus={this.props.onChangeStatus} onUpdateTask={this.props.onUpdateTask}/>
        })
        return (
            <table className="table table-bordered table-hover mt-15">
                            <thead>
                                <tr>
                                    <th className="text-center">STT</th>
                                    <th className="text-center">Tên</th>
                                    <th className="text-center">Trạng Thái</th>
                                    <th className="text-center">Hành Động</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td>
                                        <input type="text" className="form-control"
                                        name='filterName'
                                        value={this.state.filterName}
                                        onChange={this.onChange}
                                        />
                                    </td>
                                    <td>
                                        <select className="form-control"
                                        name='filterStatus'
                                        value={this.state.filterStatus}
                                        onChange={this.onChange}
                                        >
                                            <option value="-1">Tất Cả</option>
                                            <option value="0">Ẩn</option>
                                            <option value="1">Kích Hoạt</option>
                                        </select>
                                    </td>
                                    <td></td>
                                </tr>
                                {/* Task Item */}
                                {elmTask}
                            </tbody>
                        </table>
        )
    }
}

export default TaskList;