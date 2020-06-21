import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

/*
 *|===========================================================================
 *|Name  : Rupinda Manalu                                                    |
 *|        Barus - Sumatera Utara                                            |
 *|===========================================================================
*/

class Update extends React.Component {
    constructor(props) {
        super(props);
        this.state = { id: '', title: '', url: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost/app-backend/websiterestcontroller/website?id=' + this.props.match.params.id)
            .then(response => {
                return response.json();
            }).then(result => {
                console.log(result);
                this.setState({
                    id: result.id,
                    title: result.title,
                    url: result.url
                });
            });
    }
    handleChange(event) {
        const state = this.state
        state[event.target.name] = event.target.value
        this.setState(state);
    }
    handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost/app-backend/websiterestcontroller/update_website', {
            method: 'PUT',
            body: JSON.stringify({
                id: this.state.id,
                title: this.state.title,
                url: this.state.url
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            if (response.status === 200) {
                alert("Website update successfully.");
            }
        });
    }

    render() {
        return (
            <div id="container">
                <Form onSubmit={this.handleSubmit}>
                    <Card>
                        <Card.Header>
                            <h5>Update Website</h5>
                            <Button variant="outline-primary" size="sm">
                                <Link to="/">Go to Websites</Link>
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">Title</Form.Label>
                                <Form.Control type="hidden" name="id" value={this.state.id} />
                                <Col sm="10">
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        value={this.state.title}
                                        onChange={this.handleChange}
                                        placeholder="Enter title..."
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2">Url</Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type="text"
                                        name="url"
                                        value={this.state.url}
                                        onChange={this.handleChange}
                                        placholder="Enter url..."
                                    />
                                </Col>
                            </Form.Group>
                        </Card.Body>
                        <Card.Footer>
                            <Button
                                type="submit"
                                variant="primary"
                                size="sm">
                                Submit
                        </Button>
                        </Card.Footer>
                    </Card>
                </Form>
            </div>
        );
    }
}

export default Update;