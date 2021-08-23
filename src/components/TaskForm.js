import { Component } from "react";

class TaskForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: '',
            status: true,
        }
    }

  componentDidMount = () => {
    let {task} = this.props;
    if(task !== null){
      this.setState({
        id: task.id,
        name: task.name,
        status: task.status
      })
    }
  }

  componentDidUpdate = (prevProps) => {
    let {task} = this.props;
    if(prevProps.task !== task){
      if(task === null){
        this.setState({
          id: "",
          name: "",
          status: true
        })
      }else{
        this.setState({
          id: task.id,
          name: task.name,
          status: task.status
        })
      }
    }
  }

  onCloseButton = () => {
    this.props.onCloseForm();
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({
      name: '',
      status: true
    })
    this.onClear()
    this.props.onCloseForm();  
  }

  onChange = (e) => {
      let target = e.target;
      let value = target.value;
      let name = target.name;
      if(name === 'status'){
        value = (target.value === 'true') ? true : false;
      }
      
      this.setState({
          [name]: value
      })
  }

  onClear = () => {
    this.setState({
      name: '',
      status: true,
    })
  }

    render() {
    return (
      <div>
        <div className="panel panel-warning">
          <div className="panel-heading">
            <h3 className="panel-title">
              {this.state.id !== "" ? "Cập Nhật Công Việc" : "Thêm Công Việc"}
              <span className="fa fa-times-circle text-right" onClick={this.onCloseButton}></span>
            </h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Tên :</label>
                <input type="text" className="form-control" value={this.state.name}name="name" onChange={this.onChange}/>
              </div>
              <label>Trạng Thái :</label>
              <select className="form-control" required="required" value={this.state.status} name="status" onChange={this.onChange}>
                <option value={true}>Kích Hoạt</option>
                <option value={false}>Ẩn</option>
              </select>
              <br />
              <div className="text-center">
                <button type="submit" className="btn btn-warning">
                  Lưu lại
                </button>
                &nbsp;
                <button type="button" className="btn btn-danger" onClick={this.onClear}>
                  Hủy Bỏ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskForm;
