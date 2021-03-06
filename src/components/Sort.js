import { Component } from "react";

class Sort extends Component {
  constructor(props){
    super(props);
    this.state = {
      sort: {
        sortBy: 'name',
        sortValue: 1
      }
    }
  }

  onClick = async (sortBy, sortValue) => {
    await this.setState({
      sort: {
        sortBy,
        sortValue
      }
    })
    this.props.onSort(this.state.sort);
  }

  render() {
    const { sort } = this.state;
    return (
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            id="dropdownMenu1"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
          >
            Sắp Xếp <span className="fa fa-caret-square-o-down ml-5"></span>
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li onClick={() => this.onClick('name', 1)}>
              <a role="button" className={sort.sortBy === 'name' && sort.sortValue === 1 ? 'sort-selected' : ''} >
                <span className="fas fa-sort-alpha-down pr-5">Tên A-Z</span>
              </a>
            </li>
            <li onClick={() => this.onClick('name', -1)}>
              <a role="button" className={sort.sortBy === 'name' && sort.sortValue === -1 ? 'sort-selected' : ''}>
                <span className="fas fa-sort-alpha-down-alt pr-5">Tên Z-A</span>
              </a>
            </li>
            <li role="separator" className="divider"></li>
            <li onClick={() => this.onClick('status', 1)}>
              <a role="button" className={sort.sortBy === 'status' && sort.sortValue === 1 ? 'sort-selected' : ''}>Trạng Thái Kích Hoạt</a>
            </li>
            <li onClick={() => this.onClick('status', -1)}>
              <a role="button" className={sort.sortBy === 'status' && sort.sortValue === -1 ? 'sort-selected' : ''}>Trạng Thái Ẩn</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sort;
