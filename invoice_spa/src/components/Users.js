import React, { Component } from "react";

// can refactor this into a functional component implementing state hooks
export default class TodoItems extends Component {
    constructor(props) {
        super(props);
    }

    displayItemsHandler(event) {
        this.setState({
            numView: event.target.value
        });
    }

    // create a single task
    createUsers(user) {
        const style = {
            backgroundColor: "lightgray",
            borderColor: "black",
            margin: 5
        };

        return (
            <li
                className="list-group-item"
                style={style}
                key={user._id}
            >
                {user.name}
                <ul>
                    <li>Id: {user._id}</li>
                    <li>Email: {user.email}</li>
                    <li>Role: {user.role}</li>
                </ul>
            </li>
        );
    }

    render() {

        let list = null;
        if (this.props.entries.length === 0) {
            list = (<li
                className="list-group-item"
            >
               No user information

            </li>);
        } else {
            list = this.props.entries.map(this.createUsers);
        }


        return (
            <div className="w-75 d-inline-block" style={{ backgroundColor: "white" }}>
                <ul className="list=group">{list}</ul>
                {/* <input
          className="form-control"
          type="text"
          name="itemsCount"
          placeholder="How many items do you want to view?"
          onChange={this.displayItemsHandler}
        />
        <input
          style={{ margin: 5 }}
          className="btn btn-success"
          type="button"
          value="View Items"
          onClick={this.view}
        /> */}
            </div>
        );
    }
}
