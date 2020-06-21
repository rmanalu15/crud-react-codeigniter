import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col, Row } from 'react-bootstrap';

/*
 *|===========================================================================
 *|Name  : Rupinda Manalu                                                    |
 *|        Barus - Sumatera Utara                                            |
 *|===========================================================================
*/

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: '', url: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const state = this.state
        state[event.target.name] = event.target.value
        this.setState(state);
    }
    handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost/app-backend/websiterestcontroller/add_website', {
            method: 'POST',
            body: JSON.stringify({
                title: this.state.title,
                url: this.state.url
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            if (response.status === 200) {
                alert("New website saved successfully");
            }
        });
    }
    render() {
        return (
            <div id="container">
                <Form onSubmit={this.handleSubmit}>
                    <Card>
                        <Card.Header>
                            <h5>Create New Website</h5>
                            <Button variant="outline-primary" size="sm">
                                <Link to="/">Go to Websites</Link>
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">Title</Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        value={this.state.value}
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
                                        value={this.state.value}
                                        onChange={this.handleChange}
                                        placeholder="Enter url..."
                                    />
                                </Col>
                            </Form.Group>
                        </Card.Body>
                        <Card.Footer>
                            <Button type="submit" variant="primary" size="sm">Submit</Button>
                        </Card.Footer>
                    </Card>
                </Form>
            </div>
        );
    }
}

export default Create;