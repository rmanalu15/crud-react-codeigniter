import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

/*
 *|===========================================================================
 *|Name  : Rupinda Manalu                                                    |
 *|        Barus - Sumatera Utara                                            |
 *|===========================================================================
*/

class Websites extends React.Component {
    constructor(props) {
        super(props);
        this.state = { websites: [] };
        this.headers = [
            { key: 'id', label: 'Id' },
            { key: 'title', label: 'Title' },
            { key: 'url', label: 'URL' }
        ];
        this.deleteWebsite = this.deleteWebsite.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost/app-backend/')
            .then(response => {
                return response.json();
            }).then(result => {
                console.log(result);
                this.setState({
                    websites: result
                });
            });
    }

    deleteWebsite(id) {
        if (window.confirm("Are you sure want to delete?")) {
            fetch('http://localhost/app-backend/websiterestcontroller/delete_website/' + id, {
                method: 'DELETE'
            }).then(response => {
                if (response.status === 200) {
                    alert("Website deleted successfully");

                    fetch('http://localhost/app-backend/')
                        .then(response => {
                            return response.json();
                        }).then(result => {
                            console.log(result);
                            this.setState({
                                websites: result
                            });
                        });
                }
            });
        }
    }

    render() {
        return (
            <div id="container">
                <Card>
                    <Card.Header>
                        <h5>All Website List</h5>
                        <Button variant="outline-primary" size="sm">
                            <Link to="/create">Add Website</Link>
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        <Table responsive>
                            <thead>
                                <tr>
                                    {
                                        this.headers.map(function (h) {
                                            return (
                                                <th key={h.key}>{h.label}</th>
                                            );
                                        })
                                    }
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.websites.map(function (item, key) {
                                        return (
                                            <tr key={key}>
                                                <td>{item.id}</td>
                                                <td>{item.title}</td>
                                                <td>{item.url}</td>
                                                <td>
                                                    <Button variant="outline-primary" size="sm">
                                                        <Link to={`/update/${item.id}`}>Edit</Link>
                                                    </Button>
                                                </td>
                                                <td>
                                                    <Button
                                                        variant="outline-danger"
                                                        size="sm"
                                                        onClick={this.deleteWebsite.bind(this, item.id)}>
                                                        Delete
                                                </Button>
                                                </td>
                                            </tr>
                                        )
                                    }.bind(this))
                                }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div >
        )
    }
}

export default Websites;