import { Component } from "react";

class TaskItem extends Component {
    onDelete = () => {
      this.props.onDelete(this.props.task.id);
    }

    onChangeStatus = () => {
      this.props.onChangeStatus(this.props.task.id)
    }

    onUpdateTask = () => {
      this.props.onUpdateTask(this.props.task.id);
    }

  render() {
      let { task, index } = this.props;
    return (
      <tr>
        <td>{index+1}</td>
        <td>{task.name}</td>
        <td className="text-center">
          <span onClick={this.onChangeStatus}className={task.status ? "label label-success cursor" : "label label-danger"}>{task.status ? 'Kích Hoạt' : 'Ẩn'}</span>
        </td>
        <td className="text-center">
          <button type="button" className="btn btn-warning" onClick={this.onUpdateTask}>
            <span className="fa fa-pencil mr-5"></span>Sửa
          </button>
          &nbsp;
          <button type="button" className="btn btn-danger" onClick={this.onDelete}>
            <span className="fa fa-trash mr-5"></span>Xóa
          </button>
        </td>
      </tr>
    );
  }
}

export default TaskItem;
